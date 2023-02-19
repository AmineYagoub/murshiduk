import styled from '@emotion/styled';
import { Rule } from 'antd/es/form';
import UserAvatar from './UserAvatar';
import { Button, Form, Input, notification } from 'antd';
import { useAuthState, useUpdateProfile } from '@/hooks/auth/mutation.hook';
import { UpdateUserInput, User } from '@/utils/types';
import { Logger } from '@/utils/Logger';

const StyledForm = styled(Form)({
  maxWidth: 680,
  padding: '20px 5px !important',
  margin: '0 !important',
  h2: {
    padding: '1em',
    textDecoration: 'underline',
  },
  button: {
    marginTop: 20,
  },
});

const Space = styled('span')({
  display: 'inline-block',
  width: '24px',
  lineHeight: '32px',
  textAlign: 'center',
});
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};

const emailRules: Rule[] = [
  { type: 'email', message: 'يرجى كتابة بريدك الإلكتروني بشكل صحيح.' },
];

const passwordRules: Rule[] = [
  { min: 8, message: 'كلمة السر يجب أن تحتوي على 8 رموز أو أكثر.' },
];

const confirmPasswordRules: Rule[] = [
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('كلمتا السر غير متطابقتين!'));
    },
  }),
];

const UserDetails = () => {
  const [form] = Form.useForm();
  const [user] = useAuthState<User>();
  const { mutateAsync, isLoading } = useUpdateProfile();

  const onFinish = async (values: UpdateUserInput) => {
    delete values.confirmPassword;
    try {
      const data = await mutateAsync({ id: user.id, data: values });
      if (data) {
        notification.success({
          message: `تم الحفظ بنجاح`,
          description: `تم تحديث ملفك الشخصي بنجاح`,
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
    <StyledForm
      form={form}
      name="user-profile"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
      {...formLayout}
      initialValues={{
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        title: user.profile.title,
        email: user.email,
      }}
    >
      <Form.Item label="الصورة الشخصية">
        <UserAvatar />
      </Form.Item>

      <Form.Item label="الإسم الكامل" style={{ marginBottom: 0 }} required>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          name="firstName"
          rules={[{ required: true, message: 'يرجى كتابة إسمك الأول' }]}
        >
          <Input placeholder="الإسم الأول" />
        </Form.Item>
        <Space>-</Space>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          name="lastName"
          rules={[{ required: true, message: 'يرجى كتابة إسمك الثاني' }]}
        >
          <Input placeholder="الإسم الثاني" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="الوصف الوظيفي" name="title">
        <Input />
      </Form.Item>
      <h2>بيانات تسجيل الدخول</h2>
      <Form.Item label="البريد الإلكتروني" name="email" rules={emailRules}>
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="كلمة السر الجديدة"
        name="password"
        rules={passwordRules}
        help="أتركه فارغا إذا لم ترغب في تغيير كلمة السر"
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="إعادة كلمة السر الجديدة"
        name="confirmPassword"
        dependencies={['password']}
        rules={confirmPasswordRules}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          تحديث البيانات
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default UserDetails;
