import Link from 'next/link';
import { Button, Result } from 'antd';

// pages/404.js
export default function Custom505() {
  return (
    <Result
      style={{ paddingBottom: 100 }}
      status="500"
      title="500"
      subTitle="المعذرة! حدث خطأ غير متوقع, يرجى إعادة المحاولة لاحقا."
      extra={
        <Link href="/">
          <Button type="primary"> العودة للرئيسية</Button>
        </Link>
      }
    />
  );
}
