import { App } from '@/utils/types';
import styled from '@emotion/styled';
import { Logger } from '@/utils/Logger';
import Loading from '../common/Loading';
import { baseS3Url } from '@/utils/index';
import { FormEvent, useEffect } from 'react';
import { useApp } from '@/hooks/app/query.hook';
import { useUpdateApp } from '@/hooks/app/mutation.hook';
import { Form, Input, Button, notification, Space } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';

const StyledH2 = styled('h2')({
  padding: '1em',
  textDecoration: 'underline',
});

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
      <StyledH2>الإعدادات العامة</StyledH2>
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

          <StyledH2>بيانات التواصل</StyledH2>

          <Space size={15}>
            <Form.Item label="رقم الواتس آب" name="whatsApp">
              <Input
                style={{ direction: 'ltr', textAlign: 'right', minWidth: 230 }}
              />
            </Form.Item>
            <Form.Item label="معرف صفحة الفايسبوك" name="messengerId">
              <Input style={{ minWidth: 230 }} />
            </Form.Item>
            <Form.Item
              label="البريد الإلكتروني المستخدم في صفحة تواصل معنا"
              name="contactEmail"
            >
              <Input type="email" style={{ minWidth: 230 }} />
            </Form.Item>
          </Space>

          <Form.Item label="عنوان الشارع" name={['address', 'streetAddress']}>
            <Input style={{ maxWidth: 730 }} />
          </Form.Item>
          <Space size={15}>
            <Form.Item label="البلدية" name={['address', 'addressLocality']}>
              <Input style={{ minWidth: 230 }} />
            </Form.Item>
            <Form.Item label="المحافظة" name={['address', 'addressRegion']}>
              <Input style={{ minWidth: 230 }} />
            </Form.Item>
            <Form.Item label="رمز بريدي" name={['address', 'postalCode']}>
              <Input style={{ minWidth: 230 }} />
            </Form.Item>
          </Space>

          <Space size={15}>
            <Form.Item label="خط العرض" name={['address', 'latitude']}>
              <Input style={{ minWidth: 230 }} placeholder="latitude" />
            </Form.Item>
            <Form.Item label="خط الطول" name={['address', 'longitude']}>
              <Input style={{ minWidth: 230 }} placeholder="longitude" />
            </Form.Item>
          </Space>

          <StyledH2>صفحات التواصل الإجتماعي</StyledH2>
          <Form.Item label="رابط صفحة الموقع على تويتر" name="twitterUrl">
            <Input placeholder="https://twitter.com/username" type="url" />
          </Form.Item>

          <Form.Item label="رابط صفحة الموقع على أنستغرام" name="instagramUrl">
            <Input placeholder="https://instagram.com/username" type="url" />
          </Form.Item>

          <Form.Item label="رابط قناة الموقع على يوتيوب" name="youtubeUrl">
            <Input
              placeholder="https://youtube.com/channel/username"
              type="url"
            />
          </Form.Item>
          <Form.Item label="رابط صفحة الموقع على فايسبوك" name="facebookUrl">
            <Input
              placeholder="https://www.facebook.com/add/username"
              type="url"
            />
          </Form.Item>

          <StyledH2>صور السلايدر الرئيسي</StyledH2>
          <Form.List
            name="carousel"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(
                      new Error('يرجى إضافة صورتين على الأقل')
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'يرجى إضافة رابط الصورة أو حذف هذا الحقل.',
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        addonAfter={`/${baseS3Url}`}
                        style={{
                          width: '80%',
                          marginLeft: 5,
                          textAlign: 'left',
                        }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <Button
                        icon={<CloseCircleOutlined />}
                        onClick={() => remove(field.name)}
                        type="primary"
                        shape="circle"
                        ghost
                        danger
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    أضف رابط صورة
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

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
