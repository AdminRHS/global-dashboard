/**
 * Generic API Hook
 * Provides loading, error, and data states for async operations
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic hook for API calls
 * @param {Function} apiFunc - Async function that returns data
 * @param {Array} dependencies - Dependencies array (like useEffect)
 * @param {Object} options - Configuration options
 * @returns {Object} { data, loading, error, refetch }
 */
export function useAPI(apiFunc, dependencies = [], options = {}) {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(options.lazy ? false : true);
  const [error, setError] = useState(null);

  // Use refs to store callbacks to avoid dependency issues
  const onSuccessRef = useRef(options.onSuccess);
  const onErrorRef = useRef(options.onError);

  // Update refs when callbacks change
  useEffect(() => {
    onSuccessRef.current = options.onSuccess;
    onErrorRef.current = options.onError;
  }, [options.onSuccess, options.onError]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunc();
      setData(result);

      if (onSuccessRef.current) {
        onSuccessRef.current(result);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');

      if (onErrorRef.current) {
        onErrorRef.current(err);
      }
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  useEffect(() => {
    if (!options.lazy) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook for periodic data fetching (polling)
 * @param {Function} apiFunc - Async function that returns data
 * @param {number} interval - Poll interval in milliseconds
 * @param {Object} options - Configuration options
 * @returns {Object} { data, loading, error, refetch }
 */
export function usePolling(apiFunc, interval = 30000, options = {}) {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use refs to store callbacks
  const onSuccessRef = useRef(options.onSuccess);
  const onErrorRef = useRef(options.onError);

  useEffect(() => {
    onSuccessRef.current = options.onSuccess;
    onErrorRef.current = options.onError;
  }, [options.onSuccess, options.onError]);

  const fetchData = useCallback(async () => {
    try {
      const result = await apiFunc();
      setData(result);
      setError(null);

      if (onSuccessRef.current) {
        onSuccessRef.current(result);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');

      if (onErrorRef.current) {
        onErrorRef.current(err);
      }
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Setup polling
    const intervalId = setInterval(fetchData, interval);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [fetchData, interval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook for mutations (POST, PUT, DELETE)
 * @param {Function} mutationFunc - Async function that performs mutation
 * @param {Object} options - Configuration options
 * @returns {Object} { mutate, loading, error, data }
 */
export function useMutation(mutationFunc, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use refs to store callbacks
  const onSuccessRef = useRef(options.onSuccess);
  const onErrorRef = useRef(options.onError);

  useEffect(() => {
    onSuccessRef.current = options.onSuccess;
    onErrorRef.current = options.onError;
  }, [options.onSuccess, options.onError]);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await mutationFunc(...args);
      setData(result);

      if (onSuccessRef.current) {
        onSuccessRef.current(result);
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || 'Mutation failed';
      setError(errorMessage);

      if (onErrorRef.current) {
        onErrorRef.current(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFunc]);

  return {
    mutate,
    loading,
    error,
    data,
  };
}
