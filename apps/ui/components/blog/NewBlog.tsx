import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TableCreateBtn } from '../common/CreateBtn';
import BlogForm from './BlogForm';

const NewBlog = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <TableCreateBtn
        icon={<PlusOutlined />}
        type="primary"
        size="middle"
        onClick={showDrawer}
        ghost
      >
        إضافة تدوينة
      </TableCreateBtn>

      <BlogForm onClose={onClose} open={visible} />
    </>
  );
};

export default NewBlog;
