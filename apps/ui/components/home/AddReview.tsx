import { useState } from 'react';
import { Button, Form, Input, Rate, message, Row, Col } from 'antd';
import { useCreateReview } from '@/hooks/review/mutation.hook';
import { ReviewCreateInput } from '@/utils/types';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { AppRoutes, mq } from '@/utils/index';
import Link from 'next/link';
import { SaveOutlined } from '@ant-design/icons';
import isMobile from 'is-mobile';

export const StyledRow = styled(Row)(
  mq({
    backgroundImage: 'linear-gradient(to top, #122639, #004953)',
    color: '#fff',
    position: 'relative',
    width: '100%',

    padding: '3em',
    margin: '0 auto',

    h3: {
      fontSize: 'clamp(1.5rem, 5vw, 3rem)',
      lineHeight: 1.6,
      fontWeight: 'bold',
      color: '#f3b91d',
    },
    label: {
      color: '#f3b91d !important',
    },
  })
);

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

const AddReview = ({ isHomePage = false }: { isHomePage?: boolean }) => {
  const [rate, setRate] = useState(0);
  const [form] = Form.useForm();
  const { mutateAsync } = useCreateReview();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

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
        messageApi.open({
          key,
          type: 'success',
          content: 'تم الحفظ شكرا لك!',
          duration: 2,
        });
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
    } finally {
      queryClient.invalidateQueries();
    }
  };

  return (
    <StyledRow gutter={8} justify="center" align="middle">
      {isHomePage && (
        <Col
          xs={24}
          sm={24}
          md={10}
          style={{ textAlign: 'center' }}
          id="add-review"
        >
          <h3>كيف كان أداؤنا؟</h3>
        </Col>
      )}
      <Col xs={24} sm={24} md={10}>
        <Form
          {...layout}
          name="review"
          form={form}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          onFinish={onFinish}
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

          <Form.Item wrapperCol={isMobile() ? {} : { offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<SaveOutlined />}
              style={{ marginLeft: 5 }}
            >
              أرسل
            </Button>
            {isHomePage && (
              <Link
                href={AppRoutes.Reviews}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button type="primary" size="large" ghost>
                  قراءة كل الآراء
                </Button>
              </Link>
            )}
            {contextHolder}
          </Form.Item>
        </Form>
      </Col>
    </StyledRow>
  );
};

export default AddReview;
