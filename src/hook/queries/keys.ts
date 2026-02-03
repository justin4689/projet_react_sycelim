export const queryKeys = {
  users: {
    all: ['users'],
    lists: () => [...queryKeys.users.all, 'list'],
    list: (filters: Record<string, unknown> = {}) => [...queryKeys.users.lists(), { filters }],
    paginated: (params: Record<string, unknown> = {}) => [...queryKeys.users.all, 'paginated', params],
    details: () => [...queryKeys.users.all, 'detail'],
    detail: (id: string | undefined) => [...queryKeys.users.details(), id],
    infinite: (filters: Record<string, unknown> = {}) => [...queryKeys.users.all, 'infinite', filters],
  },

};