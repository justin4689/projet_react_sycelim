import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { userService } from '@/services';
import type { PaginatedResponse } from '@/lib/types';
import { queryKeys } from './keys';

// Query simple
export const useUsers = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: queryKeys.users.list(filters),
    queryFn: () => userService.getUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Query détail
export const useUser = <TUser = unknown>(userId: string | undefined, options = {}) => {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userService.getUserById(userId) as Promise<TUser>,
    enabled: !!userId, // Ne s'exécute que si userId existe
    ...options, 
  });
};

// Infinite query pour pagination/scroll infini
export const useUsersInfinite = (filters = {}, options = {}) => {
  return useInfiniteQuery({
    queryKey: queryKeys.users.list(filters),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      userService.getUsersPaginated({ page: pageParam as number, ...filters }),
    getNextPageParam: (lastPage: any, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    ...options,
  });
};

export type UsersSortOrder = 'asc' | 'desc';

export type UsersPaginatedParams = {
  page: number;
  limit: number;
  q?: string;
  sortBy?: string;
  sortOrder?: UsersSortOrder;
  user_active?: boolean;
  user_genre?: string;
};

export const useUsersPaginated = <TUser = unknown>(
  params: UsersPaginatedParams,
  options: Record<string, unknown> = {},
) => {
  return useQuery({
    queryKey: queryKeys.users.paginated(params),
    queryFn: () => userService.getUsersPaginated(params) as Promise<PaginatedResponse<TUser>>,
    placeholderData: keepPreviousData,
    ...options,
  });
};