import { httpClient } from '@/api/httpClient';
import { endpoints } from '@/api/endpoints';

export const configService = {
  getConfig: async (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return httpClient.get(`${endpoints.config}${queryString ? `?${queryString}` : ''}`);
  },

  getConfigById: async (id: string | undefined) => {
    if (!id) throw new Error('Config ID is required');
    return httpClient.get(`${endpoints.config}/${id}`);
  },

  
  updateConfig: async ({ id, data }: { id: string; data: unknown }) => {
    return httpClient.put(`${endpoints.config}/${id}`, data);
  },

  patchConfig: async ({ id, data }: { id: string; data: unknown }) => {
    return httpClient.patch(`${endpoints.config}/${id}`, data);
  },

  deleteConfig: async (id: string) => {
    return httpClient.delete(`${endpoints.config}/${id}`);
  },

  
};