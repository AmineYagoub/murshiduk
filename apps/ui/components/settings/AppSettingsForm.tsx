import { App } from '@/utils/types';
import { Logger } from '@/utils/Logger';
import Loading from '../common/Loading';
import { FormEvent, useEffect } from 'react';
import { useApp } from '@/hooks/app/query.hook';
import { Form, Input, Button, notification } from 'antd';
import { useUpdateApp } from '@/hooks/app/mutation.hook';

const AppSettingsForm = () => {
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
          description: `تم تحديث الإعدادات العامة للموقع بنجاح`,
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
      <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
        الإعدادات العامة
      </h2>
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
          <Form.Item label="إسم الموقع" name="title" required>
            <Input />
          </Form.Item>

          <Form.Item label="وصف الموقع" required name="description">
            <Input.TextArea />
          </Form.Item>

          <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
            بيانات التواصل
          </h2>
          {/*           <Form.Item
            label='البريد الإلكتروني المستخدم في صفحة تواصل معنا'
            name='contactEmail'
          >
            <Input type='email' />
          </Form.Item> */}

          <Form.Item label="رقم الواتس آب" name="whatsApp">
            <Input />
          </Form.Item>
          <Form.Item
            label="معرف صفحة الفايسبوك (Facebook Page ID)"
            name="messengerId"
          >
            <Input />
          </Form.Item>

          <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
            صفحات التواصل الإجتماعي
          </h2>
          <Form.Item label="رابط صفحة الموقع على تويتر" name="twitterUrl">
            <Input placeholder="https://twitter.com/username" />
          </Form.Item>

          <Form.Item label="رابط صفحة الموقع على أنستغرام" name="instagramUrl">
            <Input placeholder="https://instagram.com/username" />
          </Form.Item>

          <Form.Item label="رابط قناة الموقع على يوتيوب" name="youtubeUrl">
            <Input placeholder="https://youtube.com/channel/username" />
          </Form.Item>
          <Form.Item label="رابط صفحة الموقع على فايسبوك" name="facebookUrl">
            <Input placeholder="https://www.facebook.com/add/username" />
          </Form.Item>

          <h2 style={{ padding: '1em', textDecoration: 'underline' }}>
            تطبيقات الهاتف
          </h2>
          <Form.Item label="رابط تطبيق الموقع على غوغل بلاي" name="playStorUrl">
            <Input placeholder="https://play.google.com/xxx" disabled />
          </Form.Item>
          <Form.Item label="رابط تطبيق الموقع على آب ستور" name="appStorUrl">
            <Input placeholder="https://apps.apple.com/xxx" disabled />
          </Form.Item>

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

export default AppSettingsForm;
