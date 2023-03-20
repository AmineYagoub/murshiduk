import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Divider,
  InputNumber,
  notification,
} from 'antd';
import { App } from '@/utils/types';
import { Logger } from '@/utils/Logger';
import { baseS3Url } from '@/utils/index';
import { FormEvent, useEffect } from 'react';
import { useApp } from '@/hooks/app/query.hook';
import Loading from '@/components/common/Loading';
import { useUpdateApp } from '@/hooks/app/mutation.hook';

const { TextArea } = Input;

const AppAboutUsForm = () => {
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

  return (
    <>
      <h2 style={{ padding: '1em' }}>تعديل محتوى صفحة من نحن</h2>
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
          <Row gutter={10}>
            <Col>
              <Form.Item label="السنة" name={['bio', '0', 'year']}>
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item label="صورة شخصية" name={['bio', '0', 'image']}>
                <Input
                  addonAfter={`/${baseS3Url}`}
                  style={{
                    textAlign: 'left',
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="وصف قصير" name={['bio', '0', 'content']}>
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={10}>
            <Col>
              <Form.Item label="السنة" name={['bio', '1', 'year']}>
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item label="صورة شخصية" name={['bio', '1', 'image']}>
                <Input
                  addonAfter={`/${baseS3Url}`}
                  style={{
                    textAlign: 'left',
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="وصف قصير" name={['bio', '1', 'content']}>
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={10}>
            <Col>
              <Form.Item label="السنة" name={['bio', '2', 'year']}>
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item label="صورة شخصية" name={['bio', '2', 'image']}>
                <Input
                  addonAfter={`/${baseS3Url}`}
                  style={{
                    textAlign: 'left',
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="وصف قصير" name={['bio', '2', 'content']}>
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

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

export default AppAboutUsForm;
