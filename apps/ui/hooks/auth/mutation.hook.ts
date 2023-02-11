import { api } from '@/utils/index';
import { AuthResponse, SigningInput } from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuthState = (data) => {
  const key = 'user';
  const client = useQueryClient();
  return [
    useQuery([key], () => data, { enabled: false, initialData: data }).data,
    (value) => client.setQueryData([key], value),
  ];
};

export const useLogin = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: SigningInput): Promise<AuthResponse> => {
      return api
        .post('auth/signing', {
          body: JSON.stringify({ email, password }),
        })
        .json();
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['user'] }),
  });
};
