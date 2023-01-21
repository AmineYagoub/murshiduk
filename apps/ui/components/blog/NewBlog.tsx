import { Alert, Button, Drawer, Space } from 'antd';
import { SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TableCreateBtn } from '../common/CreateBtn';
import dynamic from 'next/dynamic';
import Loading from '../common/Loading';
const BlogForm = dynamic(() => import('./BlogForm'), {
  loading: () => <Loading />,
  ssr: false,
});

const NewBlog = ({ onSuccess }: { onSuccess: () => void }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const error = false;
  const loading = false;
  const onFinish = () => {
    console.log('first');
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
      <Drawer
        title="إنشاء تدوينة جديدة"
        placement="right"
        closable={false}
        onClose={onClose}
        open={visible}
        width="80vw"
        extra={
          <Space>
            <Button onClick={onClose} htmlType="reset">
              تراجع
            </Button>
            <Button
              onClick={onFinish}
              type="primary"
              icon={<SaveOutlined />}
              htmlType="submit"
              form="create-contest"
              loading={loading}
            >
              حفظ
            </Button>
          </Space>
        }
      >
        <BlogForm />
        {error && (
          <Alert
            message="خطأ"
            description="حدث خطأ أثناء حفظ التدوينة ، يرجى المحاولة مرة أخرى"
            banner
            closable
            type="error"
            showIcon
          />
        )}
      </Drawer>
    </>
  );
};

export default NewBlog;
