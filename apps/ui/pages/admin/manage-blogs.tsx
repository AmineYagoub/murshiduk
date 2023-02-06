import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DeleteBlog from '@/components/blog/DeleteBlog';
import PreviewBlog from '@/components/blog/PreviewBlog';
import { Blog, useBlogs } from '@/hooks/blog/query.hook';
import { formatDate } from '@/utils/index';
import { getMapperLabel, rolesMappedTypes } from '@/utils/Mapper';
import { Category } from '@/hooks/category/query.hook';
import EditBlog from '@/components/blog/EditBlog';
import NewBlog from '@/components/blog/NewBlog';

const AdminManageBlogs = () => {
  const { methods, data, isLoading, filteredInfo, sortedInfo } = useBlogs();
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
          <div>
            {author.profile.firstName} {author.profile.lastName}
          </div>
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
export default withAuth(AdminManageBlogs, null, true);
