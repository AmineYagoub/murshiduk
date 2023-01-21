import { notification, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/utils';
import HomeLayout from '@/layout/HomeLayout';

const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  cookies.forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
};

export function withAuth<P>(
  WrappedComponent: NextPageWithLayout,
  permissions?: string[],
  isPublic = false
) {
  const ComponentWithPermissions = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    /*     const [GetAuthUserQuery] = useGetAuthUserLazyQuery();
    const user = useSnapshot(AuthState).user as User;

    useEffect(() => {
      const logout = () => {
        localStorage.clear();
        deleteAllCookies();
        AuthActions.setUser(null);
        router.push(AppRoutes.SignIn);
      };
      const jwt = localStorage.getItem(config.jwtName);
      if (!jwt && !isPublic) {
        notification.error({
          message: 'لا يمكنك الوصول لهذه الصفحة!',
          description: 'يرجى تسجيل دخولك لتتمكن من الوصول لخدمات الموقع.',
        });
        router.push(AppRoutes.SignIn);
        return;
      }

      if (jwt && !user) {
        GetAuthUserQuery()
          .then(({ data }) => {
            if (!data?.getAuthUser) {
              logout();
              return;
            }
            const u = data.getAuthUser as User;
            AuthActions.setUser(u);
          })
          .catch((error) => {
            logout();
            Logger.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        if (
          permissions &&
          !user.role.permissions.some((el) => permissions.includes(el.title))
        ) {
          router.push('/');
          notification.warning({
            message: 'لا يمكنك الوصول لهذه الصفحة!',
            description: 'لا تمتلك الصلاحيات الكافية للوصول لهذه الصفحة.',
          });
          return;
        }
        setLoading(false);
      }
    }, [GetAuthUserQuery, router, user]); */

    const getLayout = WrappedComponent.getLayout;
    return loading ? (
      <HomeLayout>
        <Spin style={{ display: 'block', margin: '5em auto' }} size="large" />
      </HomeLayout>
    ) : (
      getLayout(<WrappedComponent {...props} />)
    );
  };
  return ComponentWithPermissions;
}
