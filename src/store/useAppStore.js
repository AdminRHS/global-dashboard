/**
 * Global Application Store (Zustand)
 * Manages application-wide state: theme, preferences, cache
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      // ========== THEME ==========
      theme: 'light', // 'light' | 'dark' | 'auto'

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        applyTheme(newTheme);
      },

      initTheme: () => {
        const savedTheme = get().theme;
        applyTheme(savedTheme);
      },

      // ========== DASHBOARD DATA CACHE ==========
      dashboardCache: {},

      setDashboardCache: (dashboardId, data) => {
        set((state) => ({
          dashboardCache: {
            ...state.dashboardCache,
            [dashboardId]: {
              data,
              timestamp: Date.now(),
            },
          },
        }));
      },

      getDashboardCache: (dashboardId, maxAge = 5 * 60 * 1000) => {
        const cache = get().dashboardCache[dashboardId];
        if (!cache) return null;

        const age = Date.now() - cache.timestamp;
        if (age > maxAge) return null; // Cache expired

        return cache.data;
      },

      clearDashboardCache: (dashboardId) => {
        if (dashboardId) {
          set((state) => {
            const newCache = { ...state.dashboardCache };
            delete newCache[dashboardId];
            return { dashboardCache: newCache };
          });
        } else {
          // Clear all cache
          set({ dashboardCache: {} });
        }
      },

      // ========== UI PREFERENCES ==========
      sidebarCollapsed: false,
      compactMode: false,

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setCompactMode: (compact) => set({ compactMode: compact }),
      toggleCompactMode: () => set((state) => ({ compactMode: !state.compactMode })),

      // ========== RESET ==========
      resetStore: () => {
        set({
          theme: 'light',
          dashboardCache: {},
          sidebarCollapsed: false,
          compactMode: false,
        });
        applyTheme('light');
      },
    }),
    {
      name: 'global-dashboard-storage', // LocalStorage key
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        compactMode: state.compactMode,
        // Don't persist cache - it should be fresh on reload
      }),
    }
  )
);

/**
 * Apply theme to document
 * @param {string} theme - 'light' | 'dark' | 'auto'
 */
function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === 'auto') {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

export default useAppStore;
