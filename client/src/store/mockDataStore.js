import { create } from 'zustand';
import api from '../services/axios.js';

export const useMockDataStore = create((set, get) => ({
  // Active arrays representing database state
  departments: [],
  categories: [],
  employees: [],
  assets: [],
  allocations: [],
  bookings: [],
  maintenance: [],
  allocationRequests: [],
  transferRequests: [],
  activityLogs: [],
  notifications: [],

  // Action to sync all data from MySQL backend
  fetchInitialData: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const [assetsRes, allocationsRes, bookingsRes, maintenanceRes, masterDataRes, requestsRes] = await Promise.all([
        api.get('/asset'),
        api.get('/allocation'),
        api.get('/booking'),
        api.get('/maintenance'),
        api.get('/master-data'),
        api.get('/allocation/requests')
      ]);

      set({
        assets: assetsRes.data || [],
        allocations: allocationsRes.data || [],
        bookings: bookingsRes.data || [],
        maintenance: maintenanceRes.data || [],
        employees: masterDataRes.data?.employees || [],
        departments: masterDataRes.data?.departments || [],
        categories: masterDataRes.data?.categories || [],
        allocationRequests: requestsRes.data || []
      });
    } catch (e) {
      console.error("Failed to sync database state:", e);
    }
  },

  // Asset Actions
  addAsset: async (asset) => {
    try {
      const response = await api.post('/asset', {
        name: asset.name,
        category: asset.category,
        value: parseFloat(asset.value),
        serialNumber: asset.serial || null,
        location: asset.location || 'Corporate Office'
      });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to register asset:", e);
    }
  },

  updateAsset: async (id, updatedFields) => {
    try {
      const response = await api.put(`/asset/${id}`, updatedFields);
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to update asset:", e);
    }
  },

  deleteAsset: async (id) => {
    try {
      const response = await api.delete(`/asset/${id}`);
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to delete asset:", e);
    }
  },

  // Allocation Actions
  checkoutAsset: async (assetId, userId, dueDate) => {
    try {
      const response = await api.post('/allocation/checkout', {
        assetId,
        userId,
        dueDate
      });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to checkout asset:", e);
    }
  },

  returnAsset: async (allocationId) => {
    try {
      const response = await api.put(`/allocation/${allocationId}/return`);
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to return asset:", e);
    }
  },

  // Requests
  submitAllocationRequest: async (requestData) => {
    try {
      const response = await api.post('/allocation/requests', {
        assetType: requestData.assetType,
        notes: requestData.notes
      });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to submit request:", e);
    }
  },

  approveAllocationRequest: async (id) => {
    try {
      const response = await api.put(`/allocation/requests/${id}/status`, {
        status: 'APPROVED'
      });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to approve request:", e);
    }
  },

  rejectAllocationRequest: async (id) => {
    try {
      const response = await api.put(`/allocation/requests/${id}/status`, {
        status: 'REJECTED'
      });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to reject request:", e);
    }
  },

  // Handlers matching frontend actions (mocked or forwarded)
  approveReturn: async (assetId, managerId) => {
    const alloc = get().allocations.find(a => a.assetId === assetId && a.status === 'ACTIVE');
    if (alloc) {
      await get().returnAsset(alloc.id);
    }
  },

  requestReturn: async (assetId, userId) => {
    const alloc = get().allocations.find(a => a.assetId === assetId && a.status === 'ACTIVE');
    if (alloc) {
      await get().returnAsset(alloc.id);
    }
  },

  // Booking Actions
  addBooking: async (booking) => {
    try {
      const response = await api.post('/booking', {
        assetId: booking.assetId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        purpose: booking.purpose
      });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to submit reservation:", e);
    }
  },

  updateBookingStatus: async (id, status) => {
    try {
      const response = await api.put(`/booking/${id}/status`, { status });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to update booking status:", e);
    }
  },

  // Maintenance Actions
  addMaintenance: async (maintenance) => {
    try {
      const response = await api.post('/maintenance', {
        assetId: maintenance.assetId,
        description: maintenance.description,
        cost: maintenance.cost || 0,
        priority: maintenance.priority || 'MEDIUM'
      });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to submit maintenance request:", e);
    }
  },

  updateMaintenanceStatus: async (id, updateData) => {
    try {
      const response = await api.put(`/maintenance/${id}/status`, {
        status: updateData.status,
        cost: updateData.cost
      });
      if (response.success) {
        await get().fetchInitialData();
      }
    } catch (e) {
      console.error("Failed to resolve maintenance ticket:", e);
    }
  },

  // Notifications (Mocked or read from server)
  addNotification: (userId, title, message) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications]
    }));
  },

  markNotificationRead: async (id) => {
    try {
      await api.put(`/notification/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      }));
    } catch (e) {
      console.error("Failed to mark notification read:", e);
    }
  },

  addActivityLog: (userId, userName, action, details) => {
    const newLog = {
      id: `log-${Date.now()}`,
      userId,
      userName,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    set((state) => ({
      activityLogs: [newLog, ...state.activityLogs]
    }));
  }
}));

export default useMockDataStore;
