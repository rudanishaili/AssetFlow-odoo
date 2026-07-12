import { create } from 'zustand';

const initialAssets = [
  { id: '1', name: 'MacBook Pro 16', assetTag: 'AF-0001', serialNumber: 'SN-MAC-714', acquisitionDate: '2026-01-10', acquisitionCost: '2400', condition: 'NEW', location: 'Office Room A', isSharedBookable: false, status: 'ALLOCATED' },
  { id: '2', name: 'Conference Room Projector', assetTag: 'AF-0002', serialNumber: 'SN-PROJ-909', acquisitionDate: '2026-02-15', acquisitionCost: '850', condition: 'GOOD', location: 'Meeting Hall B', isSharedBookable: true, status: 'AVAILABLE' },
  { id: '3', name: 'Tesla Model 3 Pool Car', assetTag: 'AF-0003', serialNumber: 'SN-TES-890', acquisitionDate: '2025-11-20', acquisitionCost: '45000', condition: 'GOOD', location: 'Basement Parking', isSharedBookable: true, status: 'AVAILABLE' },
  { id: '4', name: 'Office Ergonomic Chair', assetTag: 'AF-0004', serialNumber: 'SN-CHAIR-11', acquisitionDate: '2026-03-01', acquisitionCost: '350', condition: 'NEW', location: 'Office Room A', isSharedBookable: false, status: 'AVAILABLE' }
];

const initialDepartments = [
  { id: 'd1', name: 'IT Infrastructure', headId: 'u1', parentId: null, status: 'ACTIVE' },
  { id: 'd2', name: 'Marketing & Sales', headId: 'u2', parentId: null, status: 'ACTIVE' }
];

const initialCategories = [
  { id: 'c1', name: 'Electronics', description: 'Computing gear, screens, and printers', customFieldSpecs: [{ name: 'ram_gb', type: 'number' }, { name: 'storage_gb', type: 'number' }] },
  { id: 'c2', name: 'Furniture', description: 'Desks, chairs, whiteboards', customFieldSpecs: [{ name: 'material', type: 'string' }] },
  { id: 'c3', name: 'Vehicles', description: 'Company cars and bikes', customFieldSpecs: [{ name: 'fuel_type', type: 'string' }] }
];

const initialEmployees = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@assetflow.com', role: 'MANAGER', status: 'ACTIVE', departmentId: 'd1' },
  { id: 'u2', name: 'Raj Patel', email: 'raj@assetflow.com', role: 'EMPLOYEE', status: 'ACTIVE', departmentId: 'd2' },
  { id: 'u3', name: 'Ananya Rao', email: 'ananya@assetflow.com', role: 'ADMIN', status: 'ACTIVE', departmentId: 'd1' }
];

const initialAssignments = [
  { id: 'a1', assetId: '1', employeeId: 'u1', assignedDate: '2026-06-01', expectedReturnDate: '2026-07-10', status: 'ACTIVE' }
];

const initialRequests = [];
const initialBookings = [
  { id: 'b1', assetId: '3', bookerId: 'u2', startTime: '2026-07-12T09:00:00.000Z', endTime: '2026-07-12T11:00:00.000Z', status: 'COMPLETED' }
];

const initialMaintenance = [];
const initialAuditCycles = [];
const initialNotifications = [
  { id: 'n1', title: 'Asset Assigned', message: 'MacBook Pro 16 (AF-0001) has been assigned to Priya Sharma', isRead: false, type: 'ALLOCATION', createdAt: new Date() }
];

const initialLogs = [
  { id: 'l1', action: 'SYSTEM_BOOT', details: { message: 'AssetFlow initialized' }, createdAt: new Date() }
];

export const useAssetStore = create((set, get) => ({
  assets: initialAssets,
  departments: initialDepartments,
  categories: initialCategories,
  employees: initialEmployees,
  assignments: initialAssignments,
  requests: initialRequests,
  bookings: initialBookings,
  maintenance: initialMaintenance,
  auditCycles: initialAuditCycles,
  notifications: initialNotifications,
  logs: initialLogs,

  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, { ...asset, id: String(state.assets.length + 1), assetTag: 'AF-' + String(state.assets.length + 1).padStart(4, '0'), status: 'AVAILABLE' }],
    logs: [{ id: String(state.logs.length + 1), action: 'REGISTER_ASSET', details: { assetName: asset.name }, createdAt: new Date() }, ...state.logs]
  })),

  addDepartment: (dept) => set((state) => ({
    departments: [...state.departments, { ...dept, id: 'd' + (state.departments.length + 1) }],
    logs: [{ id: String(state.logs.length + 1), action: 'CREATE_DEPARTMENT', details: { deptName: dept.name }, createdAt: new Date() }, ...state.logs]
  })),

  updateDepartment: (id, name, parentId, headId, status) => set((state) => ({
    departments: state.departments.map(d => d.id === id ? { ...d, name, parentId, headId, status } : d),
    logs: [{ id: String(state.logs.length + 1), action: 'UPDATE_DEPARTMENT', details: { id }, createdAt: new Date() }, ...state.logs]
  })),

  addCategory: (cat) => set((state) => ({
    categories: [...state.categories, { ...cat, id: 'c' + (state.categories.length + 1) }],
    logs: [{ id: String(state.logs.length + 1), action: 'CREATE_CATEGORY', details: { catName: cat.name }, createdAt: new Date() }, ...state.logs]
  })),

  promoteUser: (id, role, departmentId) => set((state) => ({
    employees: state.employees.map(e => e.id === id ? { ...e, role, departmentId } : e),
    logs: [{ id: String(state.logs.length + 1), action: 'PROMOTE_USER', details: { id, role }, createdAt: new Date() }, ...state.logs]
  })),

  allocateAsset: (assetId, employeeId, departmentId, expectedReturnDate) => {
    const state = get();
    const asset = state.assets.find(a => a.id === assetId);
    if (asset.status !== 'AVAILABLE') {
      const active = state.assignments.find(a => a.assetId === assetId && a.status === 'ACTIVE');
      const holder = state.employees.find(e => e.id === active?.employeeId);
      throw new Error(`Asset already held by ${holder?.name || 'department'}.`);
    }

    set((state) => ({
      assignments: [...state.assignments, {
        id: 'a' + (state.assignments.length + 1),
        assetId,
        employeeId,
        departmentId,
        assignedDate: new Date().toISOString().split('T')[0],
        expectedReturnDate,
        status: 'ACTIVE'
      }],
      assets: state.assets.map(a => a.id === assetId ? { ...a, status: 'ALLOCATED' } : a),
      logs: [{ id: String(state.logs.length + 1), action: 'ALLOCATE_ASSET', details: { assetId, employeeId }, createdAt: new Date() }, ...state.logs]
    }));
  },

  returnAsset: (assetId, notes) => set((state) => ({
    assignments: state.assignments.map(a => (a.assetId === assetId && a.status === 'ACTIVE') ? { ...a, status: 'RETURNED', returnedDate: new Date().toISOString().split('T')[0], conditionCheckInNotes: notes } : a),
    assets: state.assets.map(a => a.id === assetId ? { ...a, status: 'AVAILABLE' } : a),
    logs: [{ id: String(state.logs.length + 1), action: 'RETURN_ASSET', details: { assetId }, createdAt: new Date() }, ...state.logs]
  })),

  requestTransfer: (assetId, targetEmployeeId, notes) => set((state) => {
    const reqId = 'req' + (state.requests.length + 1);
    return {
      requests: [...state.requests, {
        id: reqId,
        assetId,
        requesterId: 'u2',
        targetEmployeeId,
        requestType: 'TRANSFER',
        status: 'PENDING',
        notes
      }],
      logs: [{ id: String(state.logs.length + 1), action: 'REQUEST_TRANSFER', details: { assetId, targetEmployeeId }, createdAt: new Date() }, ...state.logs]
    };
  }),

  processTransfer: (requestId, approved) => set((state) => {
    const request = state.requests.find(r => r.id === requestId);
    const updatedRequests = state.requests.map(r => r.id === requestId ? { ...r, status: approved ? 'APPROVED' : 'REJECTED' } : r);
    if (!approved) return { requests: updatedRequests };

    return {
      requests: updatedRequests,
      assignments: state.assignments.map(a => (a.assetId === request.assetId && a.status === 'ACTIVE') ? { ...a, status: 'RETURNED', returnedDate: new Date().toISOString().split('T')[0] } : a).concat({
        id: 'a' + (state.assignments.length + 1),
        assetId: request.assetId,
        employeeId: request.targetEmployeeId,
        assignedDate: new Date().toISOString().split('T')[0],
        status: 'ACTIVE'
      }),
      assets: state.assets.map(a => a.id === request.assetId ? { ...a, status: 'ALLOCATED' } : a),
      logs: [{ id: String(state.logs.length + 1), action: 'PROCESS_TRANSFER', details: { requestId, approved }, createdAt: new Date() }, ...state.logs]
    };
  }),

  bookResource: (assetId, bookerId, startTime, endTime) => set((state) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const conflict = state.bookings.find(b => b.assetId === assetId && b.status === 'UPCOMING' && (
      (new Date(b.startTime) < end && new Date(b.endTime) > start)
    ));
    if (conflict) throw new Error('Time slot overlaps with an existing booking');

    return {
      bookings: [...state.bookings, {
        id: 'b' + (state.bookings.length + 1),
        assetId,
        bookerId,
        startTime,
        endTime,
        status: 'UPCOMING'
      }],
      logs: [{ id: String(state.logs.length + 1), action: 'CREATE_BOOKING', details: { assetId, startTime }, createdAt: new Date() }, ...state.logs]
    };
  }),

  raiseMaintenance: (assetId, desc, priority) => set((state) => ({
    maintenance: [...state.maintenance, {
      id: 'm' + (state.maintenance.length + 1),
      assetId,
      issueDescription: desc,
      priority,
      status: 'PENDING',
      raisedById: 'u2',
      createdAt: new Date()
    }],
    logs: [{ id: String(state.logs.length + 1), action: 'RAISE_MAINTENANCE', details: { assetId }, createdAt: new Date() }, ...state.logs]
  })),

  updateMaintenance: (id, status, notes, tech, cost, nextDate) => set((state) => {
    const request = state.maintenance.find(m => m.id === id);
    const updatedM = state.maintenance.map(m => m.id === id ? { ...m, status, notes, technicianName: tech, cost, nextMaintenanceDate: nextDate } : m);
    
    let assetUpdate = {};
    if (status === 'APPROVED') {
      assetUpdate = { status: 'UNDER_MAINTENANCE' };
    } else if (status === 'RESOLVED') {
      assetUpdate = { status: 'AVAILABLE' };
    }

    return {
      maintenance: updatedM,
      assets: state.assets.map(a => a.id === request.assetId ? { ...a, ...assetUpdate } : a),
      logs: [{ id: String(state.logs.length + 1), action: 'UPDATE_MAINTENANCE', details: { id, status }, createdAt: new Date() }, ...state.logs]
    };
  }),

  createAuditCycle: (name, loc, deptId, start, end) => set((state) => ({
    auditCycles: [...state.auditCycles, {
      id: 'ac' + (state.auditCycles.length + 1),
      name,
      scopeLocation: loc,
      scopeDepartmentId: deptId,
      startDate: start,
      endDate: end,
      status: 'ACTIVE',
      items: []
    }],
    logs: [{ id: String(state.logs.length + 1), action: 'CREATE_AUDIT_CYCLE', details: { name }, createdAt: new Date() }, ...state.logs]
  })),

  closeAuditCycle: (id) => set((state) => {
    return {
      auditCycles: state.auditCycles.map(c => c.id === id ? { ...c, status: 'COMPLETED' } : c),
      logs: [{ id: String(state.logs.length + 1), action: 'CLOSE_AUDIT_CYCLE', details: { id }, createdAt: new Date() }, ...state.logs]
    };
  }),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
  }))
}));