import { Space, Table, Tag } from 'antd';
import { Blog, Category } from '@/utils/types';
import NewBlog from '@/components/blog/NewBlog';
import type { ColumnsType } from 'antd/es/table';
import EditBlog from '@/components/blog/EditBlog';
import { fetchApp } from '@/hooks/app/query.hook';
import { useBlogs } from '@/hooks/blog/query.hook';
import DeleteBlog from '@/components/blog/DeleteBlog';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import PreviewBlog from '@/components/blog/PreviewBlog';
import { formatDate, getProfileName, getTitleMeta } from '@/utils/index';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { getMapperLabel, rolesMappedTypes } from '@/utils/Mapper';
import Head from 'next/head';

const AdminManageBlogs = () => {
  const { methods, data, isLoading } = useBlogs();
  const columns: ColumnsType<Blog> = [
    {
      title: 'العنوان',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'الكاتب',
      dataIndex: 'author',
      key: 'author',
      render: (_, { author }) => (
        <>
          <div>{getProfileName(author)}</div>
          <Tag color="blue">
            {getMapperLabel(rolesMappedTypes, author.role.title)}
          </Tag>
        </>
      ),
    },
    {
      title: 'الأقسام',
      key: 'categories',
      dataIndex: 'categories',
      render: (categories: Category[]) => (
        <>
          {categories.map((tag) => {
            const color = tag.title.length < 20 ? 'gold' : 'green';
            return (
              <Tag color={color} key={tag.title}>
                {tag.title}
              </Tag>
            );
          })}
        </>
      ),
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
          <EditBlog record={record} />
          <DeleteBlog record={record} />
          <PreviewBlog record={record} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'إدارة التدوينات')}</title>
      </Head>
      <NewBlog />
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

AdminManageBlogs.getLayout = (page: EmotionJSX.Element) => (
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

export default withAuth(AdminManageBlogs);
