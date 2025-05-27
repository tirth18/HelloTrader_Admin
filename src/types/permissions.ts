export interface Permission {
  id: number;
  name: string;
  code: string;
  module: string;
  description: string;
}

export interface ModulePermission {
  module: string;
  permissions: Permission[];
}

export const MODULE_NAMES = {
  DASHBOARD: 'Dashboard',
  USERS: 'Users',
  ROLES: 'Roles',
  BROKERS: 'Brokers',
  TRADING: 'Trading',
  MARKET_WATCH: 'Market Watch',
  REPORTS: 'Reports',
  BANKING: 'Banking',
  SETTINGS: 'Settings',
  SECURITY: 'Security',
  NOTIFICATIONS: 'Notifications',
} as const;

export const PERMISSION_TYPES = {
  VIEW: 'view',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage',
  APPROVE: 'approve',
} as const;

// Define all available permissions
export const ALL_PERMISSIONS: ModulePermission[] = [
  {
    module: MODULE_NAMES.DASHBOARD,
    permissions: [
      { id: 1, name: 'View Dashboard', code: 'dashboard.view', module: MODULE_NAMES.DASHBOARD, description: 'Can view dashboard' },
      { id: 2, name: 'Manage Dashboard', code: 'dashboard.manage', module: MODULE_NAMES.DASHBOARD, description: 'Can manage dashboard settings' },
    ]
  },
  {
    module: MODULE_NAMES.USERS,
    permissions: [
      { id: 3, name: 'View Users', code: 'users.view', module: MODULE_NAMES.USERS, description: 'Can view users' },
      { id: 4, name: 'Create Users', code: 'users.create', module: MODULE_NAMES.USERS, description: 'Can create users' },
      { id: 5, name: 'Update Users', code: 'users.update', module: MODULE_NAMES.USERS, description: 'Can update users' },
      { id: 6, name: 'Delete Users', code: 'users.delete', module: MODULE_NAMES.USERS, description: 'Can delete users' },
    ]
  },
  {
    module: MODULE_NAMES.ROLES,
    permissions: [
      { id: 7, name: 'View Roles', code: 'roles.view', module: MODULE_NAMES.ROLES, description: 'Can view roles' },
      { id: 8, name: 'Create Roles', code: 'roles.create', module: MODULE_NAMES.ROLES, description: 'Can create roles' },
      { id: 9, name: 'Update Roles', code: 'roles.update', module: MODULE_NAMES.ROLES, description: 'Can update roles' },
      { id: 10, name: 'Delete Roles', code: 'roles.delete', module: MODULE_NAMES.ROLES, description: 'Can delete roles' },
    ]
  },
  {
    module: MODULE_NAMES.BROKERS,
    permissions: [
      { id: 11, name: 'View Brokers', code: 'brokers.view', module: MODULE_NAMES.BROKERS, description: 'Can view brokers' },
      { id: 12, name: 'Create Brokers', code: 'brokers.create', module: MODULE_NAMES.BROKERS, description: 'Can create brokers' },
      { id: 13, name: 'Update Brokers', code: 'brokers.update', module: MODULE_NAMES.BROKERS, description: 'Can update brokers' },
      { id: 14, name: 'Delete Brokers', code: 'brokers.delete', module: MODULE_NAMES.BROKERS, description: 'Can delete brokers' },
    ]
  },
  {
    module: MODULE_NAMES.TRADING,
    permissions: [
      { id: 15, name: 'View Trades', code: 'trading.view', module: MODULE_NAMES.TRADING, description: 'Can view trades' },
      { id: 16, name: 'Create Trades', code: 'trading.create', module: MODULE_NAMES.TRADING, description: 'Can create trades' },
      { id: 17, name: 'Manage Trades', code: 'trading.manage', module: MODULE_NAMES.TRADING, description: 'Can manage trades' },
      { id: 18, name: 'Update Trading Settings', code: 'trading.settings', module: MODULE_NAMES.TRADING, description: 'Can update trading settings' },
    ]
  },
  {
    module: MODULE_NAMES.MARKET_WATCH,
    permissions: [
      { id: 19, name: 'View Market', code: 'market.view', module: MODULE_NAMES.MARKET_WATCH, description: 'Can view market data' },
      { id: 20, name: 'Manage Market', code: 'market.manage', module: MODULE_NAMES.MARKET_WATCH, description: 'Can manage market settings' },
    ]
  },
  {
    module: MODULE_NAMES.REPORTS,
    permissions: [
      { id: 21, name: 'View Reports', code: 'reports.view', module: MODULE_NAMES.REPORTS, description: 'Can view reports' },
      { id: 22, name: 'Generate Reports', code: 'reports.generate', module: MODULE_NAMES.REPORTS, description: 'Can generate reports' },
      { id: 23, name: 'Export Reports', code: 'reports.export', module: MODULE_NAMES.REPORTS, description: 'Can export reports' },
    ]
  },
  {
    module: MODULE_NAMES.BANKING,
    permissions: [
      { id: 24, name: 'View Banking', code: 'banking.view', module: MODULE_NAMES.BANKING, description: 'Can view banking details' },
      { id: 25, name: 'Manage Banking', code: 'banking.manage', module: MODULE_NAMES.BANKING, description: 'Can manage banking operations' },
      { id: 26, name: 'Approve Transactions', code: 'banking.approve', module: MODULE_NAMES.BANKING, description: 'Can approve banking transactions' },
    ]
  },
  {
    module: MODULE_NAMES.SECURITY,
    permissions: [
      { id: 27, name: 'View Security Settings', code: 'security.view', module: MODULE_NAMES.SECURITY, description: 'Can view security settings' },
      { id: 28, name: 'Manage Security', code: 'security.manage', module: MODULE_NAMES.SECURITY, description: 'Can manage security settings' },
      { id: 29, name: 'View Audit Logs', code: 'security.audit', module: MODULE_NAMES.SECURITY, description: 'Can view audit logs' },
    ]
  },
  {
    module: MODULE_NAMES.SETTINGS,
    permissions: [
      { id: 30, name: 'View Settings', code: 'settings.view', module: MODULE_NAMES.SETTINGS, description: 'Can view system settings' },
      { id: 31, name: 'Manage Settings', code: 'settings.manage', module: MODULE_NAMES.SETTINGS, description: 'Can manage system settings' },
    ]
  },
  {
    module: MODULE_NAMES.NOTIFICATIONS,
    permissions: [
      { id: 32, name: 'View Notifications', code: 'notifications.view', module: MODULE_NAMES.NOTIFICATIONS, description: 'Can view notifications' },
      { id: 33, name: 'Manage Notifications', code: 'notifications.manage', module: MODULE_NAMES.NOTIFICATIONS, description: 'Can manage notification settings' },
    ]
  }
]; 