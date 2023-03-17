import { api } from '@/utils/index';
import type { ServiceCreateInput } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateService = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: ServiceCreateInput) => {
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
    onSuccess: () => client.invalidateQueries(['services']),
  });
};
const useDeleteService = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`our-services/${id}`);
    },
    onSuccess: () => client.invalidateQueries(['services']),
  });
};

export { useCreateService, useDeleteService };
