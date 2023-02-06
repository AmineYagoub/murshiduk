import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import NewCategory from '@/components/category/NewCategory';
import EditCategory from '@/components/category/EditCategory';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import DeleteCategory from '@/components/category/DeleteCategory';
import { Category, useCategories } from '@/hooks/category/query.hook';

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
