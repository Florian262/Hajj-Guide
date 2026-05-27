import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

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
        }
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
      }),
    }),
    {
      name: 'hajj-way-storage',
      partialize: (state) => ({
        currentStageIndex: state.currentStageIndex,
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
