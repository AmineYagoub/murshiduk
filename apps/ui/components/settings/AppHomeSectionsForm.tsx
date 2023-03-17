import { App } from '@/utils/types';
import { Logger } from '@/utils/Logger';
import Loading from '../common/Loading';
import { FormEvent, useEffect } from 'react';
import { useApp } from '@/hooks/app/query.hook';
import {
  Form,
  Input,
  Button,
  notification,
  InputNumber,
  Divider,
  Row,
  Col,
  Space,
} from 'antd';
import { useUpdateApp } from '@/hooks/app/mutation.hook';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { baseS3Url } from '@/utils/index';
import UrlInput from '../common/UrlInput';

const StyledH2 = styled('h2')({
  padding: '1em',
  textDecoration: 'underline',
});

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
      const { ok } = await mutateAsync({
        ...inputs,
        bio: Object.values(inputs.bio),
      });
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
  return isLoading ? (
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
      <Form.Item
        label="النص الخاص بقسم لماذا تختارنا"
        name={['bio', '1', 'content']}
      >
        <TextArea rows={10} />
      </Form.Item>

      <StyledH2>خدماتنا</StyledH2>
      <Form.List name="services">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} align="center">
                <Form.Item
                  {...restField}
                  name={[name, 'image']}
                  rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
                >
                  <UrlInput
                    placeholder="رابط الصورة"
                    style={{ minWidth: 500 }}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'title']}
                  rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}
                >
                  <Input placeholder="إسم الخدمة" style={{ minWidth: 300 }} />
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => remove(name)}
                  style={{ marginTop: 13, color: 'red' }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                أضف خدمة
              </Button>
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
  );
};

export default AppHomeSectionsForm;
