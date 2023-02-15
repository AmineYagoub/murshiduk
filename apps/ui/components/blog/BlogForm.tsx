import dynamic from 'next/dynamic';
import Loading from '../common/Loading';
import { FormEvent, useState } from 'react';
import type { Blog, User } from '@/utils/types';
import { SaveOutlined } from '@ant-design/icons';
import SelectCategory from '../category/SelectCategory';
import { useAuthState } from '@/hooks/auth/mutation.hook';
import { useCreateBlog } from '@/hooks/blog/mutation.hook';
import { Alert, Button, Drawer, Space, Form, Input } from 'antd';

const Editor = dynamic(() => import('../common/Editor'), {
  loading: () => <Loading />,
  ssr: false,
});

const { TextArea } = Input;
interface CreateFormProps {
  open: boolean;
  onClose: () => void;
  record?: Blog;
}

const BlogForm: React.FC<CreateFormProps> = ({ open, onClose, record }) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<string>(record?.content);
  const { isLoading, mutateAsync, isError } = useCreateBlog();
  const [user] = useAuthState<User>();

  if (record) {
    form.setFieldsValue({
      title: record.title,
      descriptionMeta: record.descriptionMeta,
      content: record.content,
      categories: record.categories.map((el) => ({
        label: el.title,
        value: el.id,
      })),
    });
  }

  const handleOk = async () => {
    const values = await form.validateFields();
    if (content) {
      const { ok } = await mutateAsync({
        ...values,
        id: record?.id,
        authorId: user.id,
        categories: values.categories.map((el) => el.value),
        content,
      });
      if (ok) {
        onClose();
        setContent('');
        form.resetFields();
      }
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Drawer
      title={record ? 'التعديل على التدوينة' : 'إنشاء تدوينة جديدة'}
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
              message: 'يرجى كتابة عنوان للتدوينة!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <SelectCategory />
        <Form.Item
          label="وصف خاص بمحركات البحث"
          required
          name="descriptionMeta"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة الوصف للتدوينة!',
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
          description="حدث خطأ أثناء حفظ التدوينة ، يرجى المحاولة مرة أخرى"
          banner
          closable
          type="error"
          showIcon
        />
      )}
    </Drawer>
  );
};

export default BlogForm;
