import { useQuery } from '@tanstack/react-query';
import { configService} from '@/services';
import { queryKeys } from './keys';

// Query simple
export const useConfig = <TData = unknown>(filters = {}, options = {}) => {
  return useQuery({
    queryKey: queryKeys.config.list(filters),
    queryFn: () => configService.getConfig(filters) as Promise<TData>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Query détail
export const useConfigDetail = <TConfig = unknown>(configId: string | undefined, options = {}) => {
  return useQuery({
    queryKey: queryKeys.config.detail(configId),
    queryFn: () => configService.getConfigById(configId) as Promise<TConfig>,
    enabled: !!configId, // Ne s'exécute que si configId existe
    ...options, 
  });
};

// Query détail
export const useConfigByName = <TConfig = unknown>(configName: string | undefined, options = {}) => {
  return useQuery({
    queryKey: queryKeys.config.detail(configName),
    queryFn: () => configService.getConfigByName(configName) as Promise<TConfig>,
    enabled: !!configName, // Ne s'exécute que si configName existe
    ...options, 
  });
};
