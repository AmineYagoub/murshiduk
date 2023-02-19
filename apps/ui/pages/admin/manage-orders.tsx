import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import type { ColumnsType } from 'antd/es/table';
import { useContacts } from '@/hooks/contact/query.hook';
import { Contact } from '@/utils/types';
import { Space, Table, Tag } from 'antd';
import { formatDate, getTitleMeta } from '@/utils/index';
import {
  contactStatusMappedColors,
  contactStatusMappedTypes,
  getMapperLabel,
} from '@/utils/Mapper';
import PreviewContact from '@/components/contact/PreviewContact';
import DeleteContact from '@/components/contact/DeleteContact';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchApp } from '@/hooks/app/query.hook';
import Head from 'next/head';

const AdminManageOrders = () => {
  const { methods, data, isLoading } = useContacts();
  const columns: ColumnsType<Contact> = [
    {
      title: 'الإسم',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'رقم الهاتف',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, { phone, phoneCode }) => (
        <span dir="ltr">
          +{phoneCode} {phone}
        </span>
      ),
    },
    {
      title: 'البلد',
      key: 'country',
      dataIndex: 'country',
    },
    {
      title: 'تاريخ التواصل',
      dataIndex: 'created',
      key: 'created',
      render: (date) => <span>{formatDate(date, true)}</span>,
    },
    {
      title: 'تاريخ بداية الرحلة',
      dataIndex: 'flightTimeStart',
      key: 'flightTimeStart',
      render: (date) => (
        <span>{date ? formatDate(date) : 'لم يحدد التاريخ'}</span>
      ),
    },
    {
      title: 'تاريخ نهاية الرحلة',
      dataIndex: 'flightTimeEnd',
      key: 'flightTimeEnd',
      render: (date) => (
        <span>{date ? formatDate(date) : 'لم يحدد التاريخ'}</span>
      ),
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag
          color={contactStatusMappedColors[text]}
          style={{ padding: '5px 15px', fontWeight: 'bold' }}
        >
          {getMapperLabel(contactStatusMappedTypes, text)}
        </Tag>
      ),
    },
    {
      title: 'الإجراءات',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <PreviewContact id={record.id} />
          <DeleteContact id={record.id} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'إدارة العملاء')}</title>
      </Head>
      <Table
        columns={columns}
        dataSource={data}
        size="large"
        pagination={methods.handlePagination}
        loading={isLoading}
      />
    </>
  );
};

AdminManageOrders.getLayout = (page: EmotionJSX.Element) => (
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

export default withAuth(AdminManageOrders);
