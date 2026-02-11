/**
 * Dashboard-Specific Data Hooks
 * Provides data fetching for dashboard components
 */

import { useCallback } from 'react';
import { useAPI, usePolling, useMutation } from './useAPI.js';
import yellowCardAPI from '../api/yellowCard.js';
import attendanceAPI from '../api/attendance.js';
import { dashboards } from '../config/dashboards.js';

/**
 * Get all dashboard configurations
 * @returns {Array} Array of dashboard objects
 */
export function useDashboards() {
  return {
    data: dashboards,
    loading: false,
    error: null,
  };
}

/**
 * Get Yellow Card employees with stats
 * @param {Object} options - Configuration options
 * @returns {Object} { data, loading, error, refetch }
 */
export function useYellowCardData(options = {}) {
  // Create stable API function reference
  const apiFunc = useCallback(() => {
    return yellowCardAPI.getEmployeesWithStats();
  }, []);

  return useAPI(apiFunc, [], options);
}

/**
 * Get Yellow Card data with polling (auto-refresh)
 * @param {number} interval - Poll interval in milliseconds (default: 30s)
 * @returns {Object} { data, loading, error, refetch }
 */
export function useYellowCardPolling(interval = 30000) {
  // Create stable API function reference
  const apiFunc = useCallback(() => {
    return yellowCardAPI.getEmployeesWithStats();
  }, []);

  return usePolling(apiFunc, interval);
}

/**
 * Add violation mutation
 * @returns {Object} { mutate, loading, error, data }
 */
export function useAddViolation() {
  const mutationFunc = useCallback((violationData) => {
    return yellowCardAPI.addViolation(violationData);
  }, []);

  return useMutation(mutationFunc);
}

/**
 * Add green card mutation
 * @returns {Object} { mutate, loading, error, data }
 */
export function useAddGreenCard() {
  const mutationFunc = useCallback((greenCardData) => {
    return yellowCardAPI.addGreenCard(greenCardData);
  }, []);

  return useMutation(mutationFunc);
}

/**
 * Delete violation mutation
 * @returns {Object} { mutate, loading, error, data }
 */
export function useDeleteViolation() {
  const mutationFunc = useCallback((violationId) => {
    return yellowCardAPI.deleteViolation(violationId);
  }, []);

  return useMutation(mutationFunc);
}

/**
 * Delete green card mutation
 * @returns {Object} { mutate, loading, error, data }
 */
export function useDeleteGreenCard() {
  const mutationFunc = useCallback((greenCardId) => {
    return yellowCardAPI.deleteGreenCard(greenCardId);
  }, []);

  return useMutation(mutationFunc);
}

/**
 * Get HR Attendance data with stats
 * @param {Object} options - Configuration options
 * @returns {Object} { data, loading, error, refetch }
 */
export function useAttendanceData(options = {}) {
  // Create stable API function reference
  const apiFunc = useCallback(() => {
    return attendanceAPI.getAttendanceWithStats();
  }, []);

  return useAPI(apiFunc, [], options);
}
