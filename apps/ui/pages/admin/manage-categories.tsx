import { Space, Table, Tag } from 'antd';
import { Category } from '@/utils/types';
import { ColumnsType } from 'antd/es/table';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import NewCategory from '@/components/category/NewCategory';
import EditCategory from '@/components/category/EditCategory';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import DeleteCategory from '@/components/category/DeleteCategory';
import { useCategories } from '@/hooks/category/query.hook';
import { formatDate } from '@/utils/index';

const AdminManageCategories = () => {
  const { methods, data, isLoading, filteredInfo, sortedInfo } =
    useCategories();

  const columns: ColumnsType<Category> = [
    {
      title: 'إسم القسم',
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
      title: 'عدد التدوينات',
      dataIndex: 'blogs',
      key: 'blogs',
      render: (blogs) => (
        <Tag
          color="cyan-inverse"
          style={{ padding: '0 1em', fontWeight: 'bold' }}
        >
          {blogs.length}
        </Tag>
      ),
    },
    {
      title: 'الإجراءات',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditCategory record={record} />
          <DeleteCategory record={record} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <NewCategory />
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

AdminManageCategories.getLayout = (page: EmotionJSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default withAuth(AdminManageCategories, null, true);
