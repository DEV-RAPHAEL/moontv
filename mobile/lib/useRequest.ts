import { useCallback, useEffect, useState } from 'react';

type Mode = 'load' | 'refresh';

export function useRequest<T>(request: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const run = useCallback(
    async (mode: Mode) => {
      if (mode === 'refresh') setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        setData(await request());
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Something went wrong');
      } finally {
        if (mode === 'refresh') setRefreshing(false);
        else setLoading(false);
      }
    },
    [request],
  );

  useEffect(() => {
    void run('load');
  }, [run]);

  return {
    data,
    error,
    loading,
    refreshing,
    refresh: useCallback(() => void run('refresh'), [run]),
    retry: useCallback(() => void run('load'), [run]),
  };
}
