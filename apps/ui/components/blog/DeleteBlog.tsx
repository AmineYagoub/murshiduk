import { Logger } from '@/utils/Logger';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteBlog = ({
  record,
  onSuccess,
}: {
  record: unknown;
  onSuccess: () => void;
}) => {
  const loading = false;
  const confirmDelete = async () => {
    try {
      const data = null;
      if (data) {
        onSuccess();
      }
    } catch (error) {
      Logger.log(error);
    }
  };
  return (
    <Popconfirm
      title="سيتم حذف التدوينة و جميع المدخلات المرتبطة بها"
      onConfirm={confirmDelete}
    >
      <Button
        shape="circle"
        icon={<DeleteOutlined />}
        danger
        loading={loading}
      />
    </Popconfirm>
  );
};

export default DeleteBlog;
