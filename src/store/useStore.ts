import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';

interface UserProfile {
  gender: 'male' | 'female' | null;
  hajjType: 'tamattu' | 'qiran' | 'ifrad' | null;
  tentCoords: { lat: number; lng: number } | null;
}

interface AppState {
  currentStageIndex: number;
  isDrawerOpen: boolean;
  completedItems: Record<string, boolean>; // key: `${stageId}-${itemIndex}`
  tawafCount: number;
  saiCount: number;
  language: 'en' | 'ar' | 'tr' | 'sq';
  theme: 'light' | 'dark';
  profile: UserProfile;
  activeGlossaryTerm: string | null;
  viewMode: 'map' | 'guide';
  setStageIndex: (index: number) => void;
  toggleDrawer: (open?: boolean) => void;
  nextStage: () => void;
  prevStage: () => void;
  toggleChecklistItem: (stageId: string, itemIndex: number) => void;
  incrementTawaf: () => void;
  resetTawaf: () => void;
  incrementSai: () => void;
  resetSai: () => void;
  setLanguage: (lang: 'en' | 'ar' | 'tr' | 'sq') => void;
  toggleTheme: () => void;
  setProfile: (profile: Omit<UserProfile, 'tentCoords'>) => void;
  saveTentLocation: (lat: number, lng: number) => void;
  clearProfile: () => void;
  setActiveGlossaryTerm: (term: string | null) => void;
  setViewMode: (mode: 'map' | 'guide') => void;
}

const baseSecret = new TextEncoder().encode("hajj-secure-enclave-key-2026");

const deriveKey = async (salt: Uint8Array): Promise<CryptoKey> => {
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    baseSecret,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as any,
      iterations: 10000,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

// Custom Secure State Storage utilizing Web Crypto AES-GCM
const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;

    try {
      const payload = JSON.parse(raw);
      if (!payload.ciphertext || !payload.iv || !payload.salt) {
        // Fallback or legacy storage handle
        return raw;
      }

      const salt = new Uint8Array(payload.salt);
      const iv = new Uint8Array(payload.iv);
      const ciphertext = new Uint8Array(payload.ciphertext);

      const key = await deriveKey(salt);

      const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
      );

      return new TextDecoder().decode(decrypted);
    } catch (e) {
      console.warn("Secure decryption failed, falling back to plaintext or reset", e);
      return null;
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      const key = await deriveKey(salt);

      const ciphertext = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        new TextEncoder().encode(value)
      );

      const payload = {
        ciphertext: Array.from(new Uint8Array(ciphertext)),
        iv: Array.from(iv),
        salt: Array.from(salt)
      };

      localStorage.setItem(name, JSON.stringify(payload));
    } catch (e) {
      console.error("Secure serialization failed", e);
    }
  },

  removeItem: async (name: string): Promise<void> => {
    localStorage.removeItem(name);
  }
};

const initialProfile: UserProfile = {
  gender: null,
  hajjType: null,
  tentCoords: null,
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentStageIndex: 0,
      isDrawerOpen: false,
      completedItems: {},
      tawafCount: 0,
      saiCount: 0,
      language: 'en',
      theme: 'light',
      profile: initialProfile,
      activeGlossaryTerm: null,
      viewMode: 'map',
      setActiveGlossaryTerm: (term) => set({ activeGlossaryTerm: term }),
      setStageIndex: (index) => set({ currentStageIndex: index }),
      toggleDrawer: (open) => set((state) => ({ 
          isDrawerOpen: open !== undefined ? open : !state.isDrawerOpen 
        })),
      nextStage: () => set((state) => ({ 
          currentStageIndex: Math.min(state.currentStageIndex + 1, 17) 
        })),
      prevStage: () => set((state) => ({ 
          currentStageIndex: Math.max(state.currentStageIndex - 1, 0) 
        })),
      toggleChecklistItem: (stageId, itemIndex) => set((state) => {
          const key = `${stageId}-${itemIndex}`;
          return {
            completedItems: {
              ...state.completedItems,
              [key]: !state.completedItems[key]
            }
          };
        }),
      incrementTawaf: () => set((state) => ({
          tawafCount: state.tawafCount < 7 ? state.tawafCount + 1 : 7
        })),
      resetTawaf: () => set({ tawafCount: 0 }),
      incrementSai: () => set((state) => ({
          saiCount: state.saiCount < 7 ? state.saiCount + 1 : 7
        })),
      resetSai: () => set({ saiCount: 0 }),
      setLanguage: (lang) => set({ language: lang }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setProfile: (newProfile) => set((state) => ({
          profile: {
            ...state.profile,
            gender: newProfile.gender,
            hajjType: newProfile.hajjType,
          },
          viewMode: 'map'
        })),
      saveTentLocation: (lat, lng) => set((state) => ({
          profile: {
            ...state.profile,
            tentCoords: { lat, lng }
          }
        })),
      clearProfile: () => set({
          profile: initialProfile,
          completedItems: {},
          tawafCount: 0,
          saiCount: 0,
          currentStageIndex: 0,
          viewMode: 'map',
        }),
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'hajj-guide-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        completedItems: state.completedItems,
        tawafCount: state.tawafCount,
        saiCount: state.saiCount,
        language: state.language,
        theme: state.theme,
        profile: state.profile,
      }),
    }
  )
);
