import { useEffect } from 'react';
import { api } from '@/utils/index';
import { App } from '@/utils/types';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const fetchApp = async (field?: string): Promise<App> => {
  const uri = field ? `config?field=${field}` : 'config';
  return await api.get(uri).json();
};

const useApp = (field?: string) => {
  const router = useRouter();
  const { data, isError, isLoading } = useQuery({
    queryKey: ['getApp', field],
    queryFn: () => fetchApp(field),
  });
  useEffect(() => {
    if (isError) {
      router.push('/505');
    }
  }, [isError, router]);
  return { data, isLoading };
};

export { useApp, fetchApp };
