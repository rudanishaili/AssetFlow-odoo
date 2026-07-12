import { create } from 'zustand';

export const useUiStore = create((set) => ({
  sidebarOpen: true,
  theme: localStorage.getItem('theme') || 'dark',

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },
}));
