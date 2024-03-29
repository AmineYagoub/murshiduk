import { useState } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CategoryForm from './CategoryForm';
import type { Category } from '@/utils/types';

const EditCategory = ({ record }: { record: Category }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        shape="circle"
        icon={<EditOutlined />}
        type="primary"
        ghost
        onClick={() => setOpen(true)}
      />

      <CategoryForm
        record={record}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default EditCategory;
