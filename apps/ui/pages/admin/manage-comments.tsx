import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import { fetchApp } from '@/hooks/app/query.hook';
import Head from 'next/head';
import { formatDate, getTitleMeta, Logger } from '@/utils/index';
import { ColumnsType } from 'antd/es/table';
import { Review } from '@/utils/types';
import { Button, Popconfirm, Space, Switch, Table } from 'antd';
import { useReviews } from '@/hooks/review/query.hook';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteReview, useUpdateReview } from '@/hooks/review/mutation.hook';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const AdminManageComments = () => {
  const { methods, data, isLoading } = useReviews(10);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteReview, isLoading: deleteLoading } =
    useDeleteReview();
  const { mutateAsync: updateReview, isLoading: updateLoading } =
    useUpdateReview();

  const confirmDelete = async (id: string) => {
    try {
      await deleteReview(id);
    } catch (error) {
      Logger.log(error);
    } finally {
      queryClient.invalidateQueries();
    }
  };

  const onChange = async (checked: boolean, id: string) => {
    try {
      await updateReview({
        id,
        published: checked,
      });
    } catch (error) {
      Logger.log(error);
    } finally {
      queryClient.invalidateQueries();
    }
  };

  const columns: ColumnsType<Review> = [
    {
      title: 'الإسم',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'البريد الألكتروني',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'التعليق',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'تاريخ الانشاء',
      dataIndex: 'created',
      key: 'created',
      render: (date) => <span>{formatDate(date)}</span>,
    },

    {
      title: 'الإجراءات',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <>
            <Popconfirm
              title="سيتم حذف القسم و جميع المدخلات المرتبطة به"
              onConfirm={() => confirmDelete(record.id)}
            >
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                danger
                loading={deleteLoading}
              />
            </Popconfirm>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={record.published}
              onChange={(e) => onChange(e, record.id)}
              loading={updateLoading}
            />
          </>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'إدارة التغليقات')}</title>
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

AdminManageComments.getLayout = (page: EmotionJSX.Element) => (
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

export default withAuth(AdminManageComments);
