import { Button } from 'antd';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Blog } from '@/hooks/blog/query.hook';
import BlogForm from './BlogForm';

const EditBlog = ({ record }: { record: Blog }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        shape="circle"
        icon={<EditOutlined />}
        type="primary"
        ghost
        onClick={showDrawer}
      />
      <BlogForm onClose={onClose} open={visible} record={record} />
    </>
  );
};

export default EditBlog;
