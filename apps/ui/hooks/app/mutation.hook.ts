import { api } from '@/utils/index';
import type { App } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateApp = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: App) => {
      return api.put('config', {
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => client.invalidateQueries(['getApp']),
  });
};

export { useUpdateApp };
