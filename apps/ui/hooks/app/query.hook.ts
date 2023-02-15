import { useEffect } from 'react';
import { api } from '@/utils/index';
import { App, Dashboard } from '@/utils/types';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useAppState } from './mutation.hook';

const fetchApp = async (field?: string): Promise<App> => {
  const uri = field ? `config?field=${field}` : 'config';
  return await api.get(uri).json();
};

const fetchDashboard = async (): Promise<Dashboard> => {
  return await api.get('config/dashboard').json();
};

const useApp = (field?: string) => {
  const [, setData] = useAppState<App>();
  const { data, isLoading } = useQuery({
    queryKey: field ? ['getApp', field] : ['getApp'],
    queryFn: () => fetchApp(field),
  });
  if (data) {
    setData(data);
  }
  return { data, isLoading };
};

const useDashboard = () => {
  return useQuery({
    queryKey: ['fetchDashboard'],
    queryFn: () => fetchDashboard(),
  });
};

export { useApp, fetchApp, useDashboard };
