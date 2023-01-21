import { useState } from 'react';
import { Alert, Button, Drawer, Space } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';

const EditBlog = ({
  onSuccess,
  record,
}: {
  onSuccess: () => void;
  record: unknown;
}) => {
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
      <Button
        shape="circle"
        icon={<EditOutlined />}
        type="primary"
        ghost
        onClick={showDrawer}
      />

      <Drawer
        title="تعديل التدوينة"
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
        width={720}
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
              form="create-question"
              loading={loading}
            >
              حفظ
            </Button>
          </Space>
        }
      >
        <div>form</div>
        {error && (
          <Alert
            message="خطأ"
            description="حدث خطأ أثناء عملية حفظ التدوينة ، يرجى المحاولة مرة أخرى"
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

export default EditBlog;
