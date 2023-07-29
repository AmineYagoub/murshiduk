import React, { useState } from 'react';
import { Button, Modal, Form, Input, Rate, message } from 'antd';
import { useCreateReview } from '@/hooks/review/mutation.hook';
import { ReviewCreateInput } from '@/utils/types';
import { useQueryClient } from '@tanstack/react-query';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} مطلوب!',
  types: {
    email: '${label} غير صحيح!',
    number: '${label} غير صحيح!',
  },
};

const desc = ['فظيع', 'سيئ', 'عادي', 'جيد', 'رائع'];
const key = 'updatable';

const AddReview = () => {
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const [form] = Form.useForm();
  const { mutateAsync, isLoading } = useCreateReview();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async ({ user }: { user: ReviewCreateInput }) => {
    try {
      messageApi.open({
        key,
        type: 'loading',
        content: 'جاري الحفظ...',
      });
      const res = await mutateAsync({
        email: user.email,
        name: user.name,
        rate: String(user.rate),
        country: '',
        details: user.details,
      });
      if (res.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      messageApi.open({
        key,
        type: 'success',
        content: 'تم الحفظ شكرا لك!',
        duration: 2,
      });
      queryClient.invalidateQueries();
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        أضف تعليقك
      </Button>
      {contextHolder}
      <Modal
        title="أضف تعليقك"
        okText="حفظ"
        open={open}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onFinish(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          {...layout}
          name="review"
          form={form}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['user', 'name']}
            label="الإسم الكامل"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="البريد الإلكتروني"
            rules={[{ type: 'email', required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'rate']}
            label="التقييم"
            rules={[{ type: 'number', min: 0, max: 5, required: true }]}
          >
            <Rate tooltips={desc} onChange={setRate} value={rate} />
          </Form.Item>

          <Form.Item name={['user', 'details']} label="التعليق">
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddReview;
