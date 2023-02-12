import { api } from '@/utils/index';
import {
  AuthResponse,
  SigningInput,
  UpdateUserInput,
  User,
} from '@/utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuthState = <T>(init?: T): [T, (value: T) => void] => {
  const key = 'user';
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

export const useUpdateProfile = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateUserInput;
    }): Promise<User> => {
      return api
        .put(`auth/${id}`, {
          body: JSON.stringify(data),
        })
        .json();
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['user'] }),
  });
};
