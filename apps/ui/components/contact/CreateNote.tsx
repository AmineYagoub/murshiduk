import { useState } from 'react';
import { User } from '@/utils/types';
import { Button, Form, Input, Modal } from 'antd';
import { useCreateContactNote } from '@/hooks/contact/mutation.hook';
import { useAuthState } from '@/hooks/auth/mutation.hook';

const CreateNote = ({
  id,
  addNoteToList,
}: {
  id: string;
  addNoteToList: () => Promise<void>;
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [user] = useAuthState<User>();
  const { mutateAsync, isLoading } = useCreateContactNote();
  const onCreate = async () => {
    const values = await form.validateFields();
    const { ok } = await mutateAsync({
      authorId: user.id,
      contactId: id,
      ...values,
    });
    if (ok) {
      form.resetFields();
      setOpen(false);
      await addNoteToList();
    }
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        أضف ملاحظة
      </Button>

      <Modal
        open={open}
        title="أضف ملاحظة"
        onCancel={() => {
          setOpen(false);
        }}
        okText="أضف"
        onOk={onCreate}
        okButtonProps={{ loading: isLoading }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="content"
            label="محتوى الملاحظة"
            rules={[
              {
                required: true,
                message: 'يرجى كتابة المحتوى!',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNote;
