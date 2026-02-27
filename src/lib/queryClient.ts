import { QueryClient } from '@tanstack/react-query';
import type { ApiError } from './types';

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Ne pas retry sur 404, 401, 403
        const status = isApiError(error) ? error.status : undefined;
        if (status && [404, 401, 403].includes(status)) {
          return false;
        }
        return failureCount < 2;
      },
     
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
        staleTime: 0,
  refetchInterval: 5000,
  refetchIntervalInBackground: true
    },
    mutations: {
      retry: false,
    },
  },
});