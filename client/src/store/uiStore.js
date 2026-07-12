import { create } from 'zustand';

export const useUiStore = create((set) => ({
  sidebarOpen: true,
  modalOpen: false,
  modalType: '',
  modalProps: {},

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  openModal: (type, props = {}) => set({ modalOpen: true, modalType: type, modalProps: props }),
  
  closeModal: () => set({ modalOpen: false, modalType: '', modalProps: {} }),
}));

export default useUiStore;
