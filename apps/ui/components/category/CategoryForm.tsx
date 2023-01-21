import React, { useState } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
import SelectCategory from './SelectCategory';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
const CategoryForm: React.FC<CreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new collection"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="إسم القسم"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <SelectCategory isContest isTeacher />
      </Form>
    </Modal>
  );
};

export default CategoryForm;
