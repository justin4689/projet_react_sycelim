import { httpClient } from '@/api/httpClient';
import { endpoints } from '@/api/endpoints';
import type { CreateEntityPayload } from '@/lib/types/config.types';

export const configService = {
  getConfig: async (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return httpClient.get(`${endpoints.config}${queryString ? `?${queryString}` : ''}`);
  },

  getConfigById: async (id: string | undefined) => {
    if (!id) throw new Error('Config ID is required');
    return httpClient.get(`${endpoints.config}/${id}`);
  },


  createConfig: async (data: CreateEntityPayload) => {
    return httpClient.post(`${endpoints.config}`, data);
  },


    getConfigByName: async (name: string | undefined) => {
    if (!name) throw new Error('Config name is required');
    return httpClient.get(`${endpoints.config}/name/${name}`);
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