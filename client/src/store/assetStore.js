import { create } from 'zustand';

export const useAssetStore = create((set) => ({
  assets: [],
  activeAsset: null,
  filters: { category: '', status: '', search: '' },

  setAssets: (assets) => set({ assets }),
  setActiveAsset: (activeAsset) => set({ activeAsset }),
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));
