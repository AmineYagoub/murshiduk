import { api } from '@/utils/index';
import type { ServiceCreateInput, ServiceType } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateService = (type: ServiceType) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: ServiceCreateInput) => {
      values.type = type;
      const { id, ...rest } = values;
      if (id) {
        return api.put(`our-services/${id}`, {
          body: JSON.stringify(rest),
        });
      }
      return api
        .post('our-services', {
          body: JSON.stringify(rest),
        })
        .json();
    },
    onSuccess: () => client.invalidateQueries([type]),
  });
};
const useDeleteService = (type: ServiceType) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`our-services/${id}`);
    },
    onSuccess: () => client.invalidateQueries([type]),
  });
};

export { useCreateService, useDeleteService };
