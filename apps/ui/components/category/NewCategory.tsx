import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TableCreateBtn } from '../common/CreateBtn';
import CategoryForm from './CategoryForm';

const NewCategory = ({ onSuccess }: { onSuccess: () => void }) => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <>
      <TableCreateBtn
        icon={<PlusOutlined />}
        type="primary"
        size="middle"
        onClick={() => setOpen(true)}
        ghost
      >
        إضافة قسم
      </TableCreateBtn>
      <CategoryForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default NewCategory;
