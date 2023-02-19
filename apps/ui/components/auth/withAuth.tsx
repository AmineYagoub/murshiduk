import { notification, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HomeLayout from '@/layout/HomeLayout';
import { NextPageWithLayout } from '@/utils/types';
import { useAuthState } from '@/hooks/auth/mutation.hook';
import config from '@/config/App';
import { AppRoutes } from '@/utils/AppRoutes';
import { useAuthUser } from '@/hooks/auth/query.hook';

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  cookies.forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
};

export function withAuth<P>(
  WrappedComponent: NextPageWithLayout,
  isPublic = false
) {
  const ComponentWithPermissions = (props: P) => {
    const router = useRouter();
    const { refetch, isFetching } = useAuthUser();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useAuthState(null);
    const getLayout = WrappedComponent.getLayout;

    useEffect(() => {
      setLoading(true);
      if (!config.JWT_TOKEN && !isPublic) {
        deleteAllCookies();
        notification.error({
          message: 'لا يمكنك الوصول لهذه الصفحة!',
          description: 'يرجى تسجيل دخولك لتتمكن من الوصول لخدمات الموقع.',
        });

        router.push(AppRoutes.SignIn);
        return;
      }

      if (router.asPath === AppRoutes.SignIn && config.JWT_TOKEN) {
        if (user) {
          router.push(AppRoutes.AdminManageDashboard);
        } else {
          refetch().then(({ isError, data }) => {
            if (isError) {
              localStorage.clear();
              deleteAllCookies();
            }
            if (data) {
              setUser(data);
              router.push(AppRoutes.AdminManageDashboard);
            }
          });
        }
      }

      if (isPublic || user) {
        setLoading(false);
        return;
      }

      if (!user) {
        refetch().then(({ isError, data }) => {
          if (isError) {
            localStorage.clear();
            deleteAllCookies();
            router.push(AppRoutes.SignIn);
          }
          if (data) {
            setUser(data);
          }
          setLoading(false);
        });
      }
    }, []);
    return loading || isFetching ? (
      <HomeLayout>
        <Spin style={{ display: 'block', margin: '5em auto' }} size="large" />
      </HomeLayout>
    ) : (
      getLayout(<WrappedComponent {...props} />)
    );
  };
  return ComponentWithPermissions;
}
