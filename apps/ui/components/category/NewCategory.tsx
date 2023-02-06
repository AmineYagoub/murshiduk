import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TableCreateBtn } from '../common/CreateBtn';
import CategoryForm from './CategoryForm';

const NewCategory = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableCreateBtn
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
        ghost
      >
        إضافة قسم
      </TableCreateBtn>
      <CategoryForm
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default NewCategory;
