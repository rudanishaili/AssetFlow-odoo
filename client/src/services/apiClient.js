import api from './axios.js';

export const apiClient = {
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getMe: () => api.get('/auth/me'),
  },
  assets: {
    getAll: (params) => api.get('/asset', { params }),
    getById: (id) => api.get(`/asset/${id}`),
    create: (data) => api.post('/asset', data),
    update: (id, data) => api.put(`/asset/${id}`, data),
    delete: (id) => api.delete(`/asset/${id}`),
  },
  allocations: {
    getAll: (params) => api.get('/allocation', { params }),
    create: (data) => api.post('/allocation', data),
    return: (id) => api.put(`/allocation/${id}/return`),
  },
  bookings: {
    getAll: (params) => api.get('/booking', { params }),
    create: (data) => api.post('/booking', data),
    updateStatus: (id, status) => api.patch(`/booking/${id}/status`, { status }),
  },
  maintenance: {
    getAll: (params) => api.get('/maintenance', { params }),
    create: (data) => api.post('/maintenance', data),
    updateStatus: (id, status) => api.patch(`/maintenance/${id}/status`, { status }),
  },
};

export default apiClient;
