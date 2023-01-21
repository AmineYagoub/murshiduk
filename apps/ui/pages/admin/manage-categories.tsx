import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import NewCategory from '@/components/category/NewCategory';
import EditCategory from '@/components/category/EditCategory';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import DeleteCategory from '@/components/category/DeleteCategory';

interface DataType {
  key: string;
  title: string;
  created: string;
  updated: string;
}

const data: DataType[] = [
  {
    key: '1',
    title: 'John Brown',
    created: 'today',
    updated: 'today',
  },
  {
    key: '2',
    title: 'Jim Green',
    created: 'today',
    updated: 'today',
  },
  {
    key: '3',
    title: 'Joe Black',
    created: 'today',
    updated: 'today',
  },
];

const AdminManageCategories = () => {
  const onSuccess = () => {
    console.log('first');
  };
  const columns: ColumnsType<DataType> = [
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
    },
    {
      title: 'آخر تحديث',
      dataIndex: 'updated',
      key: 'updated',
    },
    {
      title: 'الإجراءات',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditCategory onSuccess={onSuccess} record={record} />
          <DeleteCategory onSuccess={onSuccess} record={record} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <NewCategory onSuccess={onSuccess} />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

AdminManageCategories.getLayout = (page: EmotionJSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default withAuth(AdminManageCategories, null, true);
