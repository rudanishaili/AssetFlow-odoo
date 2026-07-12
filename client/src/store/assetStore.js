import { create } from 'zustand';

export const useAssetStore = create((set) => ({
  selectedAsset: null,
  filters: {
    category: '',
    status: '',
    search: '',
  },
  
  setSelectedAsset: (selectedAsset) => set({ selectedAsset }),
  
  setFilters: (newFilters) => 
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    
  resetFilters: () => 
    set({ filters: { category: '', status: '', search: '' } }),
}));

export default useAssetStore;
