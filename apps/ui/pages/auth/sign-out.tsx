import { deleteAllCookies } from '@/components/auth/withAuth';
import Loading from '@/components/common/Loading';
import { fetchApp } from '@/hooks/app/query.hook';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignOutPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    const logout = () => {
      localStorage.clear();
      deleteAllCookies();
      queryClient.resetQueries();
      router.push('/');
    };
    logout();
  }, [router, queryClient]);
  return <Loading />;
};

export async function getServerSideProps() {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getApp'], () => fetchApp());
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default SignOutPage;
