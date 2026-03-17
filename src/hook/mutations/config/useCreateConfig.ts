import { queryKeys } from "@/hook/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { configService } from "@/services";
import type { CreateEntityPayload } from "@/lib/types/config.types";

// Mutation pour créer une configuration
export const useCreateConfig = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateEntityPayload) => configService.createConfig(data),
    onSuccess: () => {
      // Invalider la liste des configs pour recharger
      queryClient.invalidateQueries({ queryKey: queryKeys.config.all });
    },
  });
};