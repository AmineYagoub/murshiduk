import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import DashboardLayout from '@/layout/DashboardLayout';
import styled from '@emotion/styled';
import { Col, Row, Statistic } from 'antd';
import Image from 'next/image';
import { withAuth } from '@/components/auth/withAuth';
import Head from 'next/head';
import { getTitleMeta } from '@/utils/index';
import dynamic from 'next/dynamic';
import Loading from '@/components/common/Loading';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchApp, useDashboard } from '@/hooks/app/query.hook';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CustomerCountriesChart = dynamic(
  () => import('@/components/partials/CustomerCountriesChart'),
  { ssr: false, loading: () => <Loading /> }
);
const CustomersChart = dynamic(
  () => import('@/components/partials/CustomersChart'),
  { ssr: false, loading: () => <Loading /> }
);

const StyledCard = styled(Statistic)({
  height: 150,
  padding: 35,
  boxShadow:
    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
  img: {
    objectFit: 'cover',
    margin: '0 10px',
  },
  '.ant-statistic-content-suffix': {
    fontSize: 14,
    color: '#666',
  },
});

const AdminDashboard = () => {
  const { data, isLoading } = useDashboard();
  const router = useRouter();

  useEffect(() => {
    if (router.query?.from === 'login') {
      router.push(
        {
          query: {},
        },
        undefined,
        { shallow: true }
      );
      router.reload();
    }
  }, []);

  const items = [
    {
      title: 'عدد العملاء',
      value: data?.users,
      suffix: 'عميل',
      icon: '/icons/dashboard/customer-loyalty.png',
    },
    {
      title: 'عدد التدوينات',
      value: data?.blogs,
      suffix: 'تدوينة',
      icon: '/icons/dashboard/blog.png',
    },
    {
      title: 'عدد الأقسام',
      value: data?.tags,
      suffix: 'قسم',
      icon: '/icons/dashboard/application.png',
    },
    {
      title: 'عدد التعليقات',
      value: data?.comments,
      suffix: 'تعليق',
      icon: '/icons/dashboard/chat.png',
    },
  ];
  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم')}</title>
      </Head>
      <Row gutter={12} justify="space-between">
        {items.map((item) => (
          <Col span={6} key={item.title}>
            <StyledCard
              title={item.title}
              precision={0}
              value={item.value}
              suffix={item.suffix}
              loading={isLoading}
              prefix={
                <Image src={item.icon} width="60" height="60" alt="money" />
              }
            />
          </Col>
        ))}
      </Row>
      <Row align="top" gutter={2} style={{ margin: '1em 0' }}>
        <Col span={15}>
          <CustomersChart />
        </Col>
        <Col span={9}>
          <CustomerCountriesChart data={data?.countries} loading={isLoading} />
        </Col>
      </Row>
    </>
  );
};

AdminDashboard.getLayout = (page: EmotionJSX.Element) => (
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

export default withAuth(AdminDashboard);
