import { Form, Button, notification } from 'antd';
import Loading from '@/components/common/Loading';
import { FormEvent, useState } from 'react';
import Editor from '../common/Editor';
import { useApp } from '@/hooks/app/query.hook';
import { useUpdateApp } from '@/hooks/app/mutation.hook';
import { Logger } from '@/utils/Logger';

const AppPrivacyForm = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<string>('');
  const { data, isLoading } = useApp();
  const { mutateAsync, isLoading: updating } = useUpdateApp();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onFinish = async () => {
    try {
      const { ok } = await mutateAsync({
        privacy: content,
      });
      if (ok) {
        notification.success({
          message: `تم الحفظ بنجاح`,
          description: `تم تحديث المحتوى بنجاح`,
        });
      }
    } catch (error) {
      Logger.log(error);
      notification.error({
        message: `حدث خطأ`,
        description: `حدث خطأ غير متوقع يرجى إعادة المحاولة`,
      });
    }
  };

  return (
    <>
      <h2 style={{ padding: '1em' }}>تعديل محتوى صفحة الشروط و الأحكام</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          wrapperCol={{ span: 18 }}
          form={form}
          size="large"
          layout="vertical"
          scrollToFirstError
          onFinish={onFinish}
          onSubmitCapture={onSubmit}
        >
          <Editor setContent={setContent} value={data?.privacy} />

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '150px' }}
            loading={updating}
          >
            حفظ
          </Button>
        </Form>
      )}
    </>
  );
};

export default AppPrivacyForm;
