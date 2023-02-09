import { Logger } from '@/utils/Logger';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { Category } from '@/utils/types';
import { useDeleteCategory } from '@/hooks/category/mutation.hook';

const DeleteCategory = ({ record }: { record: Category }) => {
  const { mutateAsync, isLoading } = useDeleteCategory();
  const confirmDelete = async () => {
    try {
      await mutateAsync(record.id);
    } catch (error) {
      Logger.log(error);
    }
  };
  return (
    <Popconfirm
      title="سيتم حذف القسم و جميع المدخلات المرتبطة به"
      onConfirm={confirmDelete}
    >
      <Button
        shape="circle"
        icon={<DeleteOutlined />}
        danger
        loading={isLoading}
      />
    </Popconfirm>
  );
};

export default DeleteCategory;
