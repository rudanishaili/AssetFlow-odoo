import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // Mock API trigger
      const mockUser = { name: 'Alex Carter', email, role: 'admin' };
      const mockToken = 'mock-jwt-token-12345';
      localStorage.setItem('token', mockToken);
      localStorage.setItem('role', mockUser.role);
      set({ user: mockUser, token: mockToken, isAuthenticated: true, loading: false });
      return mockUser;
    } catch (err) {
      set({ error: err.message || 'Login failed', loading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user }),
}));
