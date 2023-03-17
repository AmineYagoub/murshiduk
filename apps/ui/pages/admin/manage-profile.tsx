import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchApp } from '@/hooks/app/query.hook';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/index';
import UserDetails from '@/components/auth/UserDetails';

const AdminManageProfile = () => {
  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'البيانات الشخصية')}</title>
      </Head>
      <UserDetails />
    </>
  );
};

AdminManageProfile.getLayout = (page: EmotionJSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

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

export default withAuth(AdminManageProfile);
