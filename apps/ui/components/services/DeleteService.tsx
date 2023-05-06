import { Logger } from '@/utils/Logger';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { Service } from '@/utils/types';
import { useDeleteService } from '@/hooks/ourService/mutation.hook';

const DeleteService = ({ record }: { record: Service }) => {
  const { mutateAsync, isLoading } = useDeleteService(record.type);
  const confirmDelete = async () => {
    try {
      await mutateAsync(record.id);
    } catch (error) {
      Logger.log(error);
    }
  };
  return (
    <Popconfirm
      title="سيتم حذف العنصر و جميع المدخلات المرتبطة بها"
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

export default DeleteService;
