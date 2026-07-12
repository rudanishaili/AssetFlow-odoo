import { create } from 'zustand';

export const useMockDataStore = create((set, get) => ({
  // Core tables
  departments: [
    { name: 'IT Infrastructure', code: 'IT-INF' },
    { name: 'Creative Design', code: 'CR-DES' },
    { name: 'Marketing', code: 'MKT' },
    { name: 'Customer Support', code: 'SUP' },
    { name: 'Finance', code: 'FIN' }
  ],
  
  categories: [
    { name: 'Laptops', code: 'LPT' },
    { name: 'Monitors', code: 'MON' },
    { name: 'Mobile Devices', code: 'MOB' },
    { name: 'Peripherals', code: 'PER' },
    { name: 'AV Equipment', code: 'AVE' }
  ],

  employees: [
    { id: 'admin-id', email: 'admin@company.com', name: 'John Admin', role: 'ADMIN', department: 'Corporate Office' },
    { id: 'manager-id', email: 'manager@company.com', name: 'Jane Doe', role: 'MANAGER', department: 'IT Infrastructure' },
    { id: 'dept-head-id', email: 'head@company.com', name: 'Frank Miller', role: 'AUDITOR', department: 'Creative Design' }, // Mapped to DEPT_HEAD
    { id: 'employee-id', email: 'employee@company.com', name: 'Sarah Jenkins', role: 'EMPLOYEE', department: 'Creative Design' },
    { id: 'bob-id', email: 'bob@company.com', name: 'Bob Vance', role: 'EMPLOYEE', department: 'Marketing' },
    { id: 'alice-id', email: 'alice@company.com', name: 'Alice Smith', role: 'EMPLOYEE', department: 'Customer Support' }
  ],

  assets: [
    { id: '1', name: 'MacBook Pro 16" M3', serial: 'MBP-M3-9021', code: 'AST-0001', category: 'Laptops', status: 'ALLOCATED', value: 2499, location: 'San Francisco HQ', holderId: 'employee-id', holderName: 'Sarah Jenkins', purchaseDate: '2025-01-10' },
    { id: '2', name: 'Dell UltraSharp 32" Monitor', serial: 'DM-32A-0921', code: 'AST-0002', category: 'Monitors', status: 'AVAILABLE', value: 899, location: 'New York Hub', holderId: null, holderName: 'None', purchaseDate: '2025-03-15' },
    { id: '3', name: 'iPhone 15 Pro Max', serial: 'IPH15-PRO-98', code: 'AST-0003', category: 'Mobile Devices', status: 'RESERVED', value: 1199, location: 'San Francisco HQ', holderId: 'employee-id', holderName: 'Sarah Jenkins', purchaseDate: '2025-04-20' },
    { id: '4', name: 'ThinkPad T14 Gen 4', serial: 'TP-T14-092', code: 'AST-0004', category: 'Laptops', status: 'MAINTENANCE', value: 1299, location: 'London Office', holderId: null, holderName: 'None', purchaseDate: '2025-02-12' },
    { id: '5', name: 'Logitech MX Master 3S', serial: 'MX3S-891', code: 'AST-0005', category: 'Peripherals', status: 'DISPOSED', value: 99, location: 'San Francisco HQ', holderId: null, holderName: 'None', purchaseDate: '2024-06-01' }
  ],

  allocations: [
    { id: 'a1', assetId: '1', assetName: 'MacBook Pro 16" M3', userId: 'employee-id', userName: 'Sarah Jenkins', allocatedBy: 'Jane Doe', allocatedAt: '2026-06-01T10:00:00Z', returnedAt: null, status: 'ACTIVE' }
  ],

  bookings: [
    { id: 'b1', assetId: '2', assetName: 'Dell UltraSharp 32" Monitor', userId: 'employee-id', userName: 'Sarah Jenkins', startDate: '2026-07-15T09:00:00Z', endDate: '2026-07-15T17:00:00Z', status: 'APPROVED', purpose: 'Client Presentation' }
  ],

  maintenance: [
    { id: 'm1', assetId: '4', assetName: 'ThinkPad T14 Gen 4', description: 'Keyboard keys not registering', cost: 150.00, status: 'IN_PROGRESS', startDate: '2026-07-10', endDate: null }
  ],

  transferRequests: [
    { id: 'tr1', assetId: '1', assetName: 'MacBook Pro 16" M3', fromUserId: 'employee-id', fromUserName: 'Sarah Jenkins', toUserId: 'bob-id', toUserName: 'Bob Vance', fromDepartment: 'Creative Design', toDepartment: 'Marketing', status: 'PENDING', requestedAt: '2026-07-11T14:30:00Z', notes: 'Project migration allocation transfer' }
  ],

  activityLogs: [
    { id: 'log1', userId: 'admin-id', userName: 'John Admin', action: 'CREATE', details: 'Added Department: Finance', timestamp: '2026-07-12T09:00:00Z' },
    { id: 'log2', userId: 'manager-id', userName: 'Jane Doe', action: 'ALLOCATE', details: 'Allocated MacBook Pro 16" M3 to Sarah Jenkins', timestamp: '2026-07-12T10:15:00Z' }
  ],

  notifications: [
    { id: 'n1', userId: 'employee-id', title: 'Asset Allocated', message: 'MacBook Pro 16" has been successfully assigned to you.', read: false, createdAt: '2026-07-12T10:15:00Z' },
    { id: 'n2', userId: 'dept-head-id', title: 'Transfer Request', message: 'Sarah Jenkins requested transfer of MacBook Pro 16" to Bob Vance.', read: false, createdAt: '2026-07-11T14:30:00Z' }
  ],

  allocationRequests: [
    { id: 'ar1', userId: 'employee-id', userName: 'Sarah Jenkins', department: 'Creative Design', assetType: 'Graphic Drawing Tablet', status: 'PENDING', requestedAt: '2026-07-11T12:00:00Z', notes: 'Urgent need for new vector project' }
  ],

  // Actions / Reducers
  addAsset: (asset) => {
    const newAsset = {
      ...asset,
      id: asset.id || String(get().assets.length + 1),
      code: asset.code || `AST-${String(get().assets.length + 1).padStart(4, '0')}`,
      status: asset.status || 'AVAILABLE',
      holderId: asset.holderId || null,
      holderName: asset.holderName || 'None'
    };
    set((state) => ({
      assets: [...state.assets, newAsset]
    }));
    get().addActivityLog('system', 'System', 'CREATE', `Registered Asset: ${newAsset.name} (${newAsset.code})`);
  },

  updateAsset: (id, updatedFields) => {
    set((state) => ({
      assets: state.assets.map((asset) => 
        asset.id === id ? { ...asset, ...updatedFields } : asset
      )
    }));
  },

  deleteAsset: (id) => {
    const asset = get().assets.find(a => a.id === id);
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== id)
    }));
    if (asset) {
      get().addActivityLog('system', 'System', 'DELETE', `Deleted Asset: ${asset.name} (${asset.code})`);
    }
  },

  addAllocation: (allocation) => {
    const newAlloc = {
      ...allocation,
      id: `alloc-${Date.now()}`,
      allocatedAt: new Date().toISOString(),
      status: 'ACTIVE'
    };
    
    // Find asset name & user name
    const asset = get().assets.find(a => a.id === allocation.assetId);
    const employee = get().employees.find(e => e.id === allocation.userId);

    newAlloc.assetName = asset ? asset.name : 'Unknown Asset';
    newAlloc.userName = employee ? employee.name : 'Unknown User';

    set((state) => ({
      allocations: [...state.allocations, newAlloc],
      assets: state.assets.map(a => 
        a.id === allocation.assetId 
          ? { ...a, status: 'ALLOCATED', holderId: allocation.userId, holderName: employee ? employee.name : 'Unknown User' } 
          : a
      )
    }));

    get().addActivityLog(allocation.allocatedBy, 'User', 'ALLOCATE', `Allocated ${newAlloc.assetName} to ${newAlloc.userName}`);
    get().addNotification(allocation.userId, 'New Asset Assigned', `Asset ${newAlloc.assetName} has been assigned to you.`);
  },

  returnAsset: (assetId, returnerId) => {
    const asset = get().assets.find(a => a.id === assetId);
    if (!asset) return;

    // Set asset status to reserved or update allocations
    set((state) => ({
      allocations: state.allocations.map(a => 
        (a.assetId === assetId && a.status === 'ACTIVE') 
          ? { ...a, returnedAt: new Date().toISOString(), status: 'RETURNED' } 
          : a
      ),
      assets: state.assets.map(a => 
        a.id === assetId 
          ? { ...a, status: 'AVAILABLE', holderId: null, holderName: 'None' } 
          : a
      )
    }));

    get().addActivityLog(returnerId, 'User', 'RETURN', `Returned Asset: ${asset.name}`);
    // Notify manager
    get().addNotification('manager-id', 'Asset Returned', `Asset ${asset.name} was returned by user.`);
  },

  requestReturn: (assetId, userId) => {
    const asset = get().assets.find(a => a.id === assetId);
    const employee = get().employees.find(e => e.id === userId);
    if (!asset) return;

    set((state) => ({
      allocations: state.allocations.map(a => 
        (a.assetId === assetId && a.status === 'ACTIVE') 
          ? { ...a, status: 'PENDING_RETURN' } 
          : a
      )
    }));

    get().addNotification('manager-id', 'Asset Return Approval Requested', `${employee ? employee.name : 'An employee'} requested to return asset ${asset.name}.`);
    get().addActivityLog(userId, employee ? employee.name : 'Employee', 'RETURN_REQUEST', `Requested return for asset ${asset.name}`);
  },

  approveReturn: (assetId, managerId) => {
    const asset = get().assets.find(a => a.id === assetId);
    if (!asset) return;

    set((state) => ({
      allocations: state.allocations.map(a => 
        (a.assetId === assetId && a.status === 'PENDING_RETURN') 
          ? { ...a, status: 'RETURNED', returnedAt: new Date().toISOString() } 
          : a
      ),
      assets: state.assets.map(a => 
        a.id === assetId 
          ? { ...a, status: 'AVAILABLE', holderId: null, holderName: 'None' } 
          : a
      )
    }));

    get().addActivityLog(managerId, 'Asset Manager', 'RETURN_APPROVE', `Approved return for asset ${asset.name}`);
    // Find who checked it out
    const alloc = get().allocations.find(a => a.assetId === assetId && a.status === 'RETURNED');
    if (alloc) {
      get().addNotification(alloc.userId, 'Asset Return Approved', `Your return request for ${asset.name} has been approved.`);
    }
  },

  addBooking: (booking) => {
    const newBooking = {
      ...booking,
      id: `book-${Date.now()}`,
      status: booking.status || 'PENDING'
    };
    
    const asset = get().assets.find(a => a.id === booking.assetId);
    const employee = get().employees.find(e => e.id === booking.userId);
    newBooking.assetName = asset ? asset.name : 'Unknown Resource';
    newBooking.userName = employee ? employee.name : 'Unknown User';

    set((state) => ({
      bookings: [...state.bookings, newBooking]
    }));

    get().addNotification('dept-head-id', 'New Booking Request', `${newBooking.userName} requested booking for ${newBooking.assetName}.`);
  },

  updateBookingStatus: (id, status) => {
    set((state) => ({
      bookings: state.bookings.map(b => 
        b.id === id ? { ...b, status } : b
      )
    }));

    const booking = get().bookings.find(b => b.id === id);
    if (booking) {
      get().addNotification(booking.userId, 'Booking Request Update', `Your booking for ${booking.assetName} was ${status.toLowerCase()}.`);
      get().addActivityLog('dept-head-id', 'Department Head', 'BOOKING_DECISION', `${status} booking ${id} for ${booking.assetName}`);
    }
  },

  addMaintenance: (ticket) => {
    const newTicket = {
      ...ticket,
      id: `maint-${Date.now()}`,
      status: 'SCHEDULED',
      cost: ticket.cost || 0.0,
      startDate: ticket.startDate || new Date().toISOString().split('T')[0]
    };

    const asset = get().assets.find(a => a.id === ticket.assetId);
    newTicket.assetName = asset ? asset.name : 'Unknown Asset';

    set((state) => ({
      maintenance: [...state.maintenance, newTicket],
      assets: state.assets.map(a => 
        a.id === ticket.assetId 
          ? { ...a, status: 'MAINTENANCE' } 
          : a
      )
    }));

    get().addActivityLog(ticket.userId || 'system', 'User', 'MAINTENANCE_REQUEST', `Raised maintenance request for ${newTicket.assetName}`);
    get().addNotification('manager-id', 'Maintenance Ticket Raised', `New ticket for ${newTicket.assetName}: ${ticket.description}`);
  },

  updateMaintenanceStatus: (id, status, cost = 0.0, endDate = null) => {
    set((state) => ({
      maintenance: state.maintenance.map(m => 
        m.id === id ? { ...m, status, cost: cost || m.cost, endDate } : m
      )
    }));

    const ticket = get().maintenance.find(m => m.id === id);
    if (ticket) {
      if (status === 'COMPLETED') {
        // Return asset to AVAILABLE
        set((state) => ({
          assets: state.assets.map(a => 
            a.id === ticket.assetId ? { ...a, status: 'AVAILABLE' } : a
          )
        }));
      } else if (status === 'CANCELLED') {
        set((state) => ({
          assets: state.assets.map(a => 
            a.id === ticket.assetId ? { ...a, status: 'AVAILABLE' } : a
          )
        }));
      }
      get().addActivityLog('manager-id', 'Asset Manager', 'MAINTENANCE_UPDATE', `Updated ticket status for ${ticket.assetName} to ${status}`);
    }
  },

  addTransferRequest: (transfer) => {
    const newTr = {
      ...transfer,
      id: `tr-${Date.now()}`,
      status: 'PENDING',
      requestedAt: new Date().toISOString()
    };

    const asset = get().assets.find(a => a.id === transfer.assetId);
    const fromUser = get().employees.find(e => e.id === transfer.fromUserId);
    const toUser = get().employees.find(e => e.id === transfer.toUserId);

    newTr.assetName = asset ? asset.name : 'Unknown Asset';
    newTr.fromUserName = fromUser ? fromUser.name : 'Unknown';
    newTr.toUserName = toUser ? toUser.name : 'Unknown';

    set((state) => ({
      transferRequests: [...state.transferRequests, newTr]
    }));

    // Notify Department Head
    get().addNotification('dept-head-id', 'Asset Transfer Approval Required', `${newTr.fromUserName} requested to transfer ${newTr.assetName} to ${newTr.toUserName}.`);
  },

  approveTransfer: (id) => {
    const req = get().transferRequests.find(r => r.id === id);
    if (!req) return;

    set((state) => ({
      transferRequests: state.transferRequests.map(r => 
        r.id === id ? { ...r, status: 'APPROVED' } : r
      ),
      assets: state.assets.map(a => 
        a.id === req.assetId 
          ? { 
              ...a, 
              holderId: req.toUserId, 
              holderName: req.toUserName,
              location: req.toDepartment + ' Office'
            } 
          : a
      ),
      // Update allocations: return original one, create new one
      allocations: state.allocations.map(al => 
        (al.assetId === req.assetId && al.status === 'ACTIVE')
          ? { ...al, returnedAt: new Date().toISOString(), status: 'RETURNED' }
          : al
      )
    }));

    // Add new allocation
    const newAlloc = {
      id: `alloc-${Date.now()}`,
      assetId: req.assetId,
      assetName: req.assetName,
      userId: req.toUserId,
      userName: req.toUserName,
      allocatedBy: 'Department Head (Transfer)',
      allocatedAt: new Date().toISOString(),
      returnedAt: null,
      status: 'ACTIVE'
    };

    set((state) => ({
      allocations: [...state.allocations, newAlloc]
    }));

    get().addNotification(req.fromUserId, 'Transfer Request Approved', `Your transfer request for ${req.assetName} has been approved.`);
    get().addNotification(req.toUserId, 'New Asset Received', `Asset ${req.assetName} has been transferred to you.`);
    get().addActivityLog('dept-head-id', 'Department Head', 'TRANSFER_APPROVE', `Approved transfer of ${req.assetName} to ${req.toUserName}`);
  },

  rejectTransfer: (id) => {
    const req = get().transferRequests.find(r => r.id === id);
    if (!req) return;

    set((state) => ({
      transferRequests: state.transferRequests.map(r => 
        r.id === id ? { ...r, status: 'REJECTED' } : r
      )
    }));

    get().addNotification(req.fromUserId, 'Transfer Request Rejected', `Your transfer request for ${req.assetName} was rejected.`);
    get().addActivityLog('dept-head-id', 'Department Head', 'TRANSFER_REJECT', `Rejected transfer of ${req.assetName} to ${req.toUserName}`);
  },

  addDepartment: (dept) => {
    const name = dept.name || dept;
    const code = dept.code || name.substring(0, 3).toUpperCase();
    if (get().departments.some(d => d.name.toLowerCase() === name.toLowerCase())) return;

    set((state) => ({
      departments: [...state.departments, { name, code }]
    }));
    get().addActivityLog('admin-id', 'Admin', 'CREATE_DEPT', `Created department: ${name}`);
  },

  deleteDepartment: (name) => {
    set((state) => ({
      departments: state.departments.filter(d => d.name !== name)
    }));
    get().addActivityLog('admin-id', 'Admin', 'DELETE_DEPT', `Deleted department: ${name}`);
  },

  addCategory: (cat) => {
    const name = cat.name || cat;
    const code = cat.code || name.substring(0, 3).toUpperCase();
    if (get().categories.some(c => c.name.toLowerCase() === name.toLowerCase())) return;

    set((state) => ({
      categories: [...state.categories, { name, code }]
    }));
    get().addActivityLog('admin-id', 'Admin', 'CREATE_CAT', `Created category: ${name}`);
  },

  deleteCategory: (name) => {
    set((state) => ({
      categories: state.categories.filter(c => c.name !== name)
    }));
    get().addActivityLog('admin-id', 'Admin', 'DELETE_CAT', `Deleted category: ${name}`);
  },

  updateEmployee: (id, updatedFields) => {
    set((state) => ({
      employees: state.employees.map((emp) => 
        emp.id === id ? { ...emp, ...updatedFields } : emp
      )
    }));
    const employee = get().employees.find(e => e.id === id);
    if (employee) {
      get().addActivityLog('admin-id', 'Admin', 'UPDATE_EMP', `Updated employee: ${employee.name}`);
    }
  },

  addAllocationRequest: (req) => {
    const newReq = {
      ...req,
      id: `ar-${Date.now()}`,
      status: 'PENDING',
      requestedAt: new Date().toISOString()
    };
    set((state) => ({
      allocationRequests: [...state.allocationRequests, newReq]
    }));
    get().addNotification('dept-head-id', 'New Allocation Request', `${req.userName} requested a new ${req.assetType}.`);
  },

  approveAllocationRequest: (id) => {
    const request = get().allocationRequests.find(r => r.id === id);
    if (!request) return;

    set((state) => ({
      allocationRequests: state.allocationRequests.map(r => 
        r.id === id ? { ...r, status: 'APPROVED' } : r
      )
    }));

    get().addNotification(request.userId, 'Allocation Request Approved', `Your request for a ${request.assetType} has been approved.`);
    get().addActivityLog('dept-head-id', 'Department Head', 'ALLOCATION_APPROVE', `Approved request for ${request.assetType} by ${request.userName}`);
  },

  rejectAllocationRequest: (id) => {
    const request = get().allocationRequests.find(r => r.id === id);
    if (!request) return;

    set((state) => ({
      allocationRequests: state.allocationRequests.map(r => 
        r.id === id ? { ...r, status: 'REJECTED' } : r
      )
    }));

    get().addNotification(request.userId, 'Allocation Request Rejected', `Your request for a ${request.assetType} was rejected.`);
    get().addActivityLog('dept-head-id', 'Department Head', 'ALLOCATION_REJECT', `Rejected request for ${request.assetType} by ${request.userName}`);
  },

  addActivityLog: (userId, userName, action, details) => {
    const newLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      userName,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    set((state) => ({
      activityLogs: [newLog, ...state.activityLogs].slice(0, 100) // Keep last 100 logs
    }));
  },

  addNotification: (userId, title, message) => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
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

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    }));
  }
}));

export default useMockDataStore;
