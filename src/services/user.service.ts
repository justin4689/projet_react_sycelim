import { httpClient } from '@/api/httpClient';
import { endpoints } from '@/api/endpoints';

export const userService = {
  getUsers: async (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return httpClient.get(`${endpoints.users}${queryString ? `?${queryString}` : ''}`);
  },

  getUserById: async (id: string | undefined) => {
    if (!id) throw new Error('User ID is required');
    return httpClient.get(`${endpoints.users}/${id}`);
  },

  createUser: async (userData: unknown) => {
    return httpClient.post(endpoints.users, userData);
  },

  updateUser: async ({ id, data }: { id: string; data: unknown }) => {
    return httpClient.put(`${endpoints.users}/${id}`, data);
  },

  patchUser: async ({ id, data }: { id: string; data: unknown }) => {
    return httpClient.patch(`${endpoints.users}/${id}`, data);
  },

  deleteUser: async (id: string) => {
    return httpClient.delete(`${endpoints.users}/${id}`);
  },

  // Exemple avec pagination
  getUsersPaginated: async ({ page = 1, limit = 10, ...filters }: { page?: number; limit?: number } & Record<string, unknown>) => {
    return httpClient.get(endpoints.users, {
      params: { page, limit, ...filters },
    });
  },
};