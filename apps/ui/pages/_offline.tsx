import Head from 'next/head';
import { RobotOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const Fallback = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>لا يوجد إتصال</title>
      </Head>
      <Result
        icon={<RobotOutlined />}
        title="لا يوجد اتصال إنترنت!"
        extra={
          <Button type="primary" onClick={() => router.reload()}>
            إعادة التحميل
          </Button>
        }
      />
    </>
  );
};

export default Fallback;
