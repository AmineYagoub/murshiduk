import { Logger } from '@/utils/Logger';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteContact } from '@/hooks/contact/mutation.hook';

const DeleteContact = ({ id }: { id: string }) => {
  const { mutateAsync, isLoading } = useDeleteContact();
  const confirmDelete = async () => {
    try {
      await mutateAsync(id);
    } catch (error) {
      Logger.log(error);
    }
  };
  return (
    <Popconfirm title="سيتم حذف المتصل بشكل نهائي" onConfirm={confirmDelete}>
      <Button
        shape="circle"
        icon={<DeleteOutlined />}
        danger
        loading={isLoading}
      />
    </Popconfirm>
  );
};

export default DeleteContact;
