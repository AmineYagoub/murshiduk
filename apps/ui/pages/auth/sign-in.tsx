import styled from '@emotion/styled';
import { Logger } from '@/utils/Logger';
import BlogLayout from '@/layout/BlogLayout';
import { AppRoutes } from '@/utils/AppRoutes';
import { Button, Form, Input } from 'antd';
import { withAuth } from '@/components/auth/withAuth';
import { useAuthState, useLogin } from '@/hooks/auth/mutation.hook';
import type { FormInstance, Rule } from 'antd/es/form';
import { NextPageWithLayout, SigningInput, User } from '@/utils/types';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { useRouter } from 'next/router';
import config from '@/config/App';
import { fetchAuthUser } from '@/hooks/auth/query.hook';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchApp } from '@/hooks/app/query.hook';

export const StyledForm = styled(Form)({
  maxWidth: 350,
  height: 400,
  margin: '0 auto',
  padding: '30px 50px !important',
  backgroundColor: '#fff',
  boxShadow:
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
  button: {
    marginTop: '3em',
  },
});

const emailRules: Rule[] = [
  { required: true, message: 'يرجى كتابة بريدك الإلكتروني.' },
  { type: 'email', message: 'يرجى كتابة بريدك الإلكتروني بشكل صحيح.' },
];

const passwordRules: Rule[] = [
  { required: true, message: 'يرجى كتابة كلمة السر.' },
];

const SignInPage: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const clearErrors = (field: SigningInput, form: FormInstance<unknown>) => {
    if (field.email || field.password) {
      form.setFields([
        {
          name: 'password',
          errors: [],
        },
        {
          name: 'email',
          errors: [],
        },
      ]);
    }
  };

  const { isLoading, mutateAsync } = useLogin();
  const [, setUser] = useAuthState<User>();

  const onFinish = async (values: SigningInput) => {
    try {
      const response = await mutateAsync(values);
      if (response) {
        const { accessToken, refreshToken } = response;
        localStorage.setItem(config.JWT_NAME, accessToken);
        localStorage.setItem(config.REFRESH_JWT_NAME, refreshToken);
        const data = await fetchAuthUser(accessToken);
        setUser(data);
        router.push({
          pathname: AppRoutes.AdminManageDashboard,
          query: { from: 'login' },
        });
      }
    } catch (error) {
      Logger.log(error);
      form.setFields([
        {
          name: 'email',
          errors: ['بيانات حسابك غير صحيحة.'],
        },
        {
          name: 'password',
          errors: ['بيانات حسابك غير صحيحة.'],
        },
      ]);
    }
  };

  return (
    <StyledForm
      form={form}
      name="signing"
      layout="vertical"
      onSubmitCapture={(e) => e.preventDefault()}
      onFinish={onFinish}
      onValuesChange={(field) => clearErrors(field, form)}
      autoComplete="off"
      size="large"
      colon
    >
      <Form.Item label="البريد الإلكتروني" name="email" rules={emailRules}>
        <Input type="email" />
      </Form.Item>

      <Form.Item label="كلمة السر" name="password" rules={passwordRules}>
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={isLoading}>
        تسجيل الدخول
      </Button>
    </StyledForm>
  );
};

SignInPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);

export async function getServerSideProps() {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getApp'], () => fetchApp());
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default withAuth(SignInPage, true);
