import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EditBlog from '@/components/blog/EditBlog';
import DeleteBlog from '@/components/blog/DeleteBlog';
import PreviewBlog from '@/components/blog/PreviewBlog';
import NewBlog from '@/components/blog/NewBlog';

interface DataType {
  key: string;
  title: string;
  created: string;
  updated: string;
  author: string;
  published: boolean;
  categories: string[];
}

const data: DataType[] = [
  {
    key: '1',
    title: 'John Brown',
    created: 'today',
    updated: 'today',
    author: 'New York No. 1 Lake Park',
    published: true,
    categories: ['nice', 'developer'],
  },
  {
    key: '2',
    title: 'Jim Green',
    created: 'today',
    updated: 'today',
    author: 'London No. 1 Lake Park',
    published: true,
    categories: ['loser'],
  },
  {
    key: '3',
    title: 'Joe Black',
    created: 'today',
    updated: 'today',
    author: 'Sidney No. 1 Lake Park',
    published: true,
    categories: ['cool', 'teacher'],
  },
];

const AdminManageBlogs = () => {
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
      title: 'الكاتب',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'الأقسام',
      key: 'categories',
      dataIndex: 'categories',
      render: (_, { categories }) => (
        <>
          {categories.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
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
          <EditBlog onSuccess={onSuccess} record={record} />
          <DeleteBlog onSuccess={onSuccess} record={record} />
          <PreviewBlog />
        </Space>
      ),
    },
  ];
  return (
    <>
      <NewBlog onSuccess={onSuccess} />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

AdminManageBlogs.getLayout = (page: EmotionJSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default withAuth(AdminManageBlogs, null, true);
