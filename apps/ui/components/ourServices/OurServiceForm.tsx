import dynamic from 'next/dynamic';
import Loading from '../common/Loading';
import { Logger } from '@/utils/Logger';
import UrlInput from '../common/UrlInput';
import { FormEvent, useState } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import type { Service, User } from '@/utils/types';
import { useAuthState } from '@/hooks/auth/mutation.hook';
import { Alert, Button, Drawer, Space, Form, Input } from 'antd';
import { useCreateService } from '@/hooks/ourService/mutation.hook';

const Editor = dynamic(() => import('../common/Editor'), {
  loading: () => <Loading />,
  ssr: false,
});

const { TextArea } = Input;
interface CreateFormProps {
  open: boolean;
  onClose: () => void;
  record?: Service;
}

const OurServiceForm: React.FC<CreateFormProps> = ({
  open,
  onClose,
  record,
}) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<string>(record?.content);
  const { isLoading, mutateAsync, isError } = useCreateService();
  const [user] = useAuthState<User>();

  if (record) {
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      content: record.content,
      image: record.image,
    });
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (content) {
        const data = await mutateAsync({
          ...values,
          id: record?.id,
          authorId: user.id,
          content,
        });

        if (data) {
          onClose();
          setContent('');
          form.resetFields();
        }
      }
    } catch (err) {
      if (err.message.includes('Service_slug_key')) {
        form.setFields([
          {
            name: 'title',
            errors: ['هذا العنوان موجود مسبقا يرجى عدم تكرار نفس العناوين'],
          },
        ]);
      }
      if (err.message.includes('Service_description_key')) {
        form.setFields([
          {
            name: 'description',
            errors: ['هذا الوصف موجود مسبقا يرجى عدم تكرار نفس وصف الخدمات'],
          },
        ]);
      }

      Logger.log(err.message);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Drawer
      title={record ? 'التعديل على الخدمة' : 'إنشاء خدمة جديدة'}
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      width="80vw"
      extra={
        <Space>
          <Button onClick={onClose} htmlType="reset">
            تراجع
          </Button>
          <Button
            onClick={handleOk}
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
            form="create-contest"
            loading={isLoading}
          >
            حفظ
          </Button>
        </Space>
      }
    >
      <Form
        wrapperCol={{ span: 18 }}
        form={form}
        size="large"
        layout="vertical"
        scrollToFirstError
        onSubmitCapture={onSubmit}
      >
        <Form.Item
          label="العنوان"
          required
          name="title"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة عنوان للخدمة!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="الصورة الرئيسية"
          required
          name="image"
          rules={[
            {
              required: true,
              message: 'يرجى توفير الصورة الرئيسية للخدمة!',
            },
          ]}
        >
          <UrlInput />
        </Form.Item>

        <Form.Item
          label="وصف قصير"
          required
          name="description"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة الوصف للخدمة!',
            },
          ]}
        >
          <TextArea
            showCount
            maxLength={200}
            style={{ height: 120, resize: 'none' }}
          />
        </Form.Item>
        <Editor setContent={setContent} value={record?.content} />
      </Form>
      {isError && (
        <Alert
          message="خطأ"
          description="حدث خطأ أثناء حفظ الخدمة ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default OurServiceForm;
