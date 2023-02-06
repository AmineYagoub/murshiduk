import { Logger } from '@/utils/Logger';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteBlog } from '@/hooks/blog/mutation.hook';
import { Blog } from '@/hooks/blog/query.hook';

const DeleteBlog = ({ record }: { record: Blog }) => {
  const { mutateAsync, isLoading } = useDeleteBlog();
  const confirmDelete = async () => {
    try {
      await mutateAsync(record.id);
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
        loading={isLoading}
      />
    </Popconfirm>
  );
};

export default DeleteBlog;
