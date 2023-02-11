import { fetchApp } from '@/hooks/app/query.hook';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Button, Result } from 'antd';
import Link from 'next/link';

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
