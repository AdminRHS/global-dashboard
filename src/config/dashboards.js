/**
 * Dashboard Registry
 * Central configuration for all dashboards in the system
 */

export const dashboards = [
  {
    id: 'yellow-card',
    name: 'Yellow Card Dashboard',
    description: 'Team performance tracking with violations and achievements',
    url: 'https://yc.anyemp.com',
    icon: '🟡',
    color: '#FFC107',
    category: 'operations',
    status: 'active',
    hasAPI: true,
    apiEndpoint: '/api/get-employees',
    requiresAuth: true,
    authType: 'pin', // PIN: HESOYAM
    features: ['violations', 'green-cards', 'employee-stats'],
    tags: ['performance', 'compliance', 'tracking'],
  },
  {
    id: 'hr-attendance',
    name: 'HR Attendance',
    description: 'Employee attendance and time management',
    url: 'https://attendance.anyemp.com',
    icon: '👥',
    color: '#2196F3',
    category: 'hr',
    status: 'active',
    hasAPI: true,
    apiEndpoint: '/api/attendance',
    requiresAuth: false, // Public API
    authType: 'none',
    features: ['punctuality-tracking', 'daily-stats', 'department-stats'],
    tags: ['hr', 'attendance', 'time'],
  },
  {
    id: 'anyemp-main',
    name: 'AnyEmp Portal',
    description: 'Main company portal and operations dashboard',
    url: 'https://anyemp.com',
    icon: '🏢',
    color: '#4CAF50',
    category: 'operations',
    status: 'active',
    hasAPI: false, // To be investigated
    requiresAuth: true,
    authType: 'unknown',
    features: ['portal', 'operations'],
    tags: ['main', 'portal', 'operations'],
  },
  {
    id: 'sync-dashboard',
    name: 'Sync Dashboard',
    description: 'Development synchronization and build tracking',
    url: 'https://sync.anyemp.com',
    icon: '🔄',
    color: '#9C27B0',
    category: 'development',
    status: 'active',
    hasAPI: false, // Python/Flask, to be investigated
    requiresAuth: true,
    authType: 'unknown',
    features: ['sync', 'builds', 'deployment'],
    tags: ['development', 'sync', 'ci-cd'],
  },
  {
    id: 'onboarding',
    name: 'Onboarding Dashboard',
    description: 'New employee onboarding process and documentation',
    url: 'https://onb.anyemp.com',
    icon: '🚀',
    color: '#FF5722',
    category: 'hr',
    status: 'active',
    hasAPI: false, // Static site (Nginx Alpine)
    requiresAuth: false,
    authType: 'none',
    features: ['onboarding', 'documentation'],
    tags: ['hr', 'onboarding', 'training'],
  },
];

/**
 * Get dashboard by ID
 */
export const getDashboardById = (id) => {
  return dashboards.find((d) => d.id === id);
};

/**
 * Get dashboards by category
 */
export const getDashboardsByCategory = (category) => {
  return dashboards.filter((d) => d.category === category);
};

/**
 * Get active dashboards only
 */
export const getActiveDashboards = () => {
  return dashboards.filter((d) => d.status === 'active');
};

/**
 * Get dashboards with API support
 */
export const getDashboardsWithAPI = () => {
  return dashboards.filter((d) => d.hasAPI);
};

/**
 * Categories for filtering
 */
export const categories = [
  { id: 'all', name: 'All Dashboards', icon: '📊' },
  { id: 'operations', name: 'Operations', icon: '⚙️' },
  { id: 'hr', name: 'Human Resources', icon: '👥' },
  { id: 'development', name: 'Development', icon: '💻' },
  { id: 'tools', name: 'Tools', icon: '🛠️' },
];
