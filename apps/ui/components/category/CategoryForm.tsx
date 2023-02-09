import { Form, Input, Modal } from 'antd';
import SelectCategory from './SelectCategory';
import { useCreateCategory } from '@/hooks/category/mutation.hook';
import { memo } from 'react';
import type { Category } from '@/utils/types';

interface CreateFormProps {
  open: boolean;
  onCancel: () => void;
  record?: Category;
}
const CategoryForm: React.FC<CreateFormProps> = ({
  open,
  onCancel,
  record,
}) => {
  const [form] = Form.useForm();
  if (record) {
    form.setFieldsValue({
      title: record.title,
      categories: {
        label: record.parent?.title,
        value: record.parent?.id,
      },
    });
  }
  const { isLoading, mutateAsync } = useCreateCategory();
  const handleOk = async () => {
    const values = await form.getFieldsValue();
    const { ok } = await mutateAsync({ ...values, id: record?.id });
    if (ok) {
      onCancel();
      form.resetFields();
    }
  };
  return (
    <Modal
      open={open}
      title={record ? 'تعديل القسم' : 'إضافة قسم جديد'}
      confirmLoading={isLoading}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="إسم القسم"
          rules={[
            {
              required: true,
              message: 'يرجى كتابة إسم القسم!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <SelectCategory isDashboard />
      </Form>
    </Modal>
  );
};

export default memo(CategoryForm);
