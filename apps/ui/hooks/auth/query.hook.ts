import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/index';
import { User } from '@/utils/types';

const fetchAuthUser = async (token?: string): Promise<User> => {
  return await api
    .get(
      'auth/user',
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    )
    .json();
};

const useAuthUser = () => {
  return useQuery({
    queryKey: ['getAuthUser'],
    queryFn: () => fetchAuthUser(),
    enabled: false,
    staleTime: Infinity,
  });
};

export { useAuthUser, fetchAuthUser };
