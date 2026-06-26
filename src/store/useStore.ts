import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { commonDuas } from '../data/commonDuas';

interface UserProfile {
  gender: 'male' | 'female' | null;
  hajjType: 'tamattu' | 'qiran' | 'ifrad' | null;
  tentCoords: { lat: number; lng: number } | null;
}

export interface PersonalDua {
  id: string;
  text: string;
  category: 'self' | 'family' | 'health' | 'general';
  completed: boolean;
  starred?: boolean;
  commonDuaId?: string;
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
  personalDuas: PersonalDua[];
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
  addPersonalDua: (text: string, category: PersonalDua['category'], starred?: boolean, commonDuaId?: string) => void;
  togglePersonalDua: (id: string) => void;
  toggleStarDua: (id: string) => void;
  deletePersonalDua: (id: string) => void;
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

const localizedTemplateDuas = {
  en: {
    init1: 'اللَّهُمَّ تَقَبَّلْ مِنِّي حَجِّي، وَاغْفِرْ لِي ذَنْبِي، وَثَبِّتْنِي عَلَى الْهُدَى. (O Allah, accept my Hajj, forgive my sins, and grant me steadfastness upon guidance.)',
    init2: 'اللَّهُمَّ بَارِكْ فِي وَالِدَيَّ، وَارْزُقْهُمَا الصِّحَّةَ وَالْعَافِيَةَ، وَأَدْخِلْهُمَا الْجَنَّةَ. (O Allah, bless my parents, grant them health and well-being, and admit them to Paradise.)',
    init3: 'اللَّهُمَّ اشْفِ مَرْضَانَا وَمَرْضَى الْمُسْلِمِينَ، وَأَذْهِبْ عَنْهُمُ الْبَأْسَ. (O Allah, cure our sick and the sick of the Muslims, and grant them a healing that leaves no ailment.)'
  },
  ar: {
    init1: 'اللَّهُمَّ تَقَبَّلْ مِنِّي حَجِّي، وَاغْفِرْ لِي ذَنْبِي، وَثَبِّتْنِي عَلَى الْهُدَى.',
    init2: 'اللَّهُمَّ بَارِكْ فِي وَالِدَيَّ، وَارْزُقْهُمَا الصِّحَّةَ وَالْعَافِيَةَ، وَأَدْخِلْهُمَا الْجَنَّةَ الْفِرْدَوْسَ.',
    init3: 'اللَّهُمَّ اشْفِ مَرْضَانَا وَمَرْضَى الْمُسْلِمِينَ، وَأَذْهِبْ عَنْهُمُ الْبَأْسَ شِفَاءً لَا يُغَادِرُ سَقَمًا.'
  },
  tr: {
    init1: 'اللَّهُمَّ تَقَبَّلْ مِنِّي حَجِّي، وَاغْفِرْ لِي ذَنْبِي، وَثَبِّتْنِي عَلَى الْهُدَى. (Allah\'ım, haccımı kabul et, günahlarımı bağışla ve beni hidayet üzere sabit kıl.)',
    init2: 'اللَّهُمَّ بَارِكْ فِي وَالِدَيَّ، وَارْزُقْهُمَا الصِّحَّةَ وَالْعَافِيَةَ، وَأَدْخِلْهُمَا الْجَنَّةَ. (Allah\'ım, anne babamı mübarek kıl, onlara sağlık ve afiyet ver, cennetine kabul et.)',
    init3: 'اللَّهُمَّ اشْفِ مَرْضَانَا وَمَرْضَى الْمُسْلِمِينَ، وَأَذْهِبْ عَنْهُمُ الْبَأْسَ. (Allah\'ım, hastalarımıza ve tüm Müslüman hastalarına şifa ver, dertlerini gider.)'
  },
  sq: {
    init1: 'اللَّهُمَّ تَقَبَّلْ مِنِّي حَجِّي، وَاغْفِرْ لِي ذَنْبِي، وَثَبِّتْنِي عَلَى الْهُدَى. (O Allah, pranoje haxhin tim, falmi mëkatet e mia dhe më përforco në udhëzim.)',
    init2: 'اللَّهُمَّ بَارِكْ فِي وَالِدَيَّ، وَارْزُقْهُمَا الصِّحَّةَ وَالْعَافِيَةَ، وَأَدْخِلْهُمَا الْجَنَّةَ. (O Allah, bekoji prindërit e mi, dhuro u shëndet e mirëqenie dhe pranoji në Xhenet.)',
    init3: 'اللَّهُمَّ اشْفِ مَرْضَانَا وَمَرْضَى الْمُسْلِمِينَ، وَأَذْهِبْ عَنْهُمُ الْبَأْسَ. (O Allah, shëroji të sëmurët tanë dhe të sëmurët e muslimanëve, dhe jepu shërim pa mundim.)'
  }
};

const getInitialPersonalDuas = (lang: 'en' | 'ar' | 'tr' | 'sq'): PersonalDua[] => [
  {
    id: 'init-1',
    text: localizedTemplateDuas[lang].init1,
    category: 'self',
    completed: false
  },
  {
    id: 'init-2',
    text: localizedTemplateDuas[lang].init2,
    category: 'family',
    completed: false
  },
  {
    id: 'init-3',
    text: localizedTemplateDuas[lang].init3,
    category: 'health',
    completed: false
  }
];

const initialPersonalDuas = getInitialPersonalDuas('en');

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
      setLanguage: (lang) => set((state) => {
        const updatedPersonalDuas = state.personalDuas.map((dua) => {
          if (dua.id === 'init-1' && !dua.completed) {
            return { ...dua, text: localizedTemplateDuas[lang].init1 };
          }
          if (dua.id === 'init-2' && !dua.completed) {
            return { ...dua, text: localizedTemplateDuas[lang].init2 };
          }
          if (dua.id === 'init-3' && !dua.completed) {
            return { ...dua, text: localizedTemplateDuas[lang].init3 };
          }
          if (dua.commonDuaId) {
            const commonDua = commonDuas.find((d) => d.id === dua.commonDuaId);
            if (commonDua) {
              return {
                ...dua,
                text: `${commonDua.arabic}\n(${commonDua.translations[lang] || commonDua.translations['en']})`
              };
            }
          }
          return dua;
        });
        return { 
          language: lang,
          personalDuas: updatedPersonalDuas
        };
      }),
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
            coords: { lat, lng }
          }
        })),
      clearProfile: () => set((state) => ({
          profile: initialProfile,
          completedItems: {},
          tawafCount: 0,
          saiCount: 0,
          currentStageIndex: 0,
          viewMode: 'map',
          personalDuas: getInitialPersonalDuas(state.language),
        })),
      setViewMode: (mode) => set({ viewMode: mode }),
      personalDuas: initialPersonalDuas,
      addPersonalDua: (text, category, starred = false, commonDuaId) => set((state) => ({
        personalDuas: [
          ...state.personalDuas,
          {
            id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
            text,
            category,
            completed: false,
            starred,
            commonDuaId
          }
        ]
      })),
      togglePersonalDua: (id) => set((state) => ({
        personalDuas: state.personalDuas.map((dua) => 
          dua.id === id ? { ...dua, completed: !dua.completed } : dua
        )
      })),
      toggleStarDua: (id) => set((state) => ({
        personalDuas: state.personalDuas.map((dua) => 
          dua.id === id ? { ...dua, starred: !dua.starred } : dua
        )
      })),
      deletePersonalDua: (id) => set((state) => ({
        personalDuas: state.personalDuas.filter((dua) => dua.id !== id)
      })),
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
        personalDuas: state.personalDuas,
      }),
    }
  )
);
