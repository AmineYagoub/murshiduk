import Head from 'next/head';
import Image from 'next/image';
import { Space, Table } from 'antd';
import { Service } from '@/utils/types';
import type { ColumnsType } from 'antd/es/table';
import { fetchApp } from '@/hooks/app/query.hook';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { useServices } from '@/hooks/ourService/query.hook';
import NewService from '@/components/ourServices/NewService';
import EditService from '@/components/ourServices/EditService';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import DeleteService from '@/components/ourServices/DeleteService';
import { baseS3Url, formatDate, getTitleMeta } from '@/utils/index';
import PreviewOurService from '@/components/ourServices/PreviewOurService';

const AdminManageTravels = () => {
  const { methods, data, isLoading } = useServices('TRAVEL');
  const columns: ColumnsType<Service> = [
    {
      title: 'الصورة',
      dataIndex: 'image',
      key: 'image',
      render: (url) => (
        <Image
          src={`${baseS3Url}/${url}`}
          alt="service"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: 'العنوان',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: 'created',
      key: 'created',
      render: (date) => <span>{formatDate(date)}</span>,
    },
    {
      title: 'آخر تحديث',
      dataIndex: 'updated',
      key: 'updated',
      render: (date) => <span>{formatDate(date)}</span>,
    },
    {
      title: 'الإجراءات',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditService record={record} />
          <DeleteService record={record} />
          <PreviewOurService record={record} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'إدارة الرحلات')}</title>
      </Head>
      <NewService type="TRAVEL" />
      <Table
        columns={columns}
        dataSource={data}
        size="large"
        onChange={methods.handleTableChange}
        pagination={methods.handlePagination}
        loading={isLoading}
      />
    </>
  );
};

AdminManageTravels.getLayout = (page: EmotionJSX.Element) => (
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

export default withAuth(AdminManageTravels);
