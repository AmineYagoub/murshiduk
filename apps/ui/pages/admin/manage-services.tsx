import Head from 'next/head';
import { Space, Table } from 'antd';
import { Service } from '@/utils/types';
import type { ColumnsType } from 'antd/es/table';
import { fetchApp } from '@/hooks/app/query.hook';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { baseS3Url, formatDate, getTitleMeta } from '@/utils/index';
import { useServices } from '@/hooks/ourService/query.hook';
import NewService from '@/components/ourServices/NewService';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import EditService from '@/components/ourServices/EditService';
import DeleteService from '@/components/ourServices/DeleteService';
import PreviewOurService from '@/components/ourServices/PreviewOurService';
import Image from 'next/image';

const AdminManageServices = () => {
  const { methods, data, isLoading } = useServices();
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
        <title>{getTitleMeta('لوحة التحكم', 'إدارة الخدمات')}</title>
      </Head>
      <NewService />
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

AdminManageServices.getLayout = (page: EmotionJSX.Element) => (
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

export default withAuth(AdminManageServices);
