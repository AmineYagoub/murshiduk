import { App } from '@/utils/types';
import { Logger } from '@/utils/Logger';
import Loading from '../common/Loading';
import { FormEvent, useEffect } from 'react';
import { useApp } from '@/hooks/app/query.hook';
import { Form, Input, Button, notification } from 'antd';
import { useUpdateApp } from '@/hooks/app/mutation.hook';

const { TextArea } = Input;

const AppHomeSectionsForm = () => {
  const [form] = Form.useForm();
  const { data, isLoading } = useApp();
  const { mutateAsync, isLoading: updating } = useUpdateApp();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onFinish = async (inputs: App) => {
    try {
      const { ok } = await mutateAsync(inputs);
      if (ok) {
        notification.success({
          message: `تم الحفظ بنجاح`,
          description: `تم تحديث المحتوى للموقع بنجاح`,
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
  return isLoading ? (
    <Loading />
  ) : (
    <Form
      style={{ maxWidth: 750 }}
      form={form}
      size="large"
      layout="vertical"
      scrollToFirstError
      onFinish={onFinish}
      onSubmitCapture={onSubmit}
    >
      <Form.Item label="النص الخاص بقسم لماذا تختارنا" name="whyUsContent">
        <TextArea rows={10} />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '250px', display: 'block', margin: '50px auto' }}
        loading={updating}
      >
        حفظ
      </Button>
    </Form>
  );
};

export default AppHomeSectionsForm;
