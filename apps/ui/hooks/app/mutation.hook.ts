import { api } from '@/utils/index';
import type { App } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAppState = <T>(init?: T): [T, (value: T) => void] => {
  const key = 'app';
  const client = useQueryClient();
  const { data } = useQuery([key], (): T => data, {
    enabled: false,
    initialData: init,
  });
  return [
    data,
    (val) => {
      client.setQueryData([key], val);
    },
  ];
};

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
