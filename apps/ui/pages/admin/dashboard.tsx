import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import styled from '@emotion/styled';
import { Col, Row, Statistic } from 'antd';
import Image from 'next/image';

const StyledCard = styled(Col)({
  display: 'flex',
  alignItems: 'center',
  height: 150,
  padding: 35,
  margin: '0 5px',
  boxShadow:
    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
});

const AdminDashboard = () => {
  const items = [
    {
      title: 'عدد الطلبات',
      value: 14,
      suffix: 'طلب',
    },
    {
      title: 'عدد التدوينات',
      value: 14,
      suffix: 'تدوينة',
    },
    {
      title: 'عدد الأقسام',
      value: 14,
      suffix: 'قسم',
    },
    {
      title: 'عدد التعليقات',
      value: 14,
      suffix: 'تعليق',
    },
  ];
  return (
    <Row>
      {items.map((item) => (
        <StyledCard key={item.title}>
          <Statistic
            title={item.title}
            precision={0}
            value={item.value}
            suffix={item.suffix}
            prefix={
              <Image
                src="/icons/dashboard/training.png"
                width="60"
                height="60"
                alt="money"
              />
            }
          />
        </StyledCard>
      ))}
    </Row>
  );
};

AdminDashboard.getLayout = (page: EmotionJSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default withAuth(AdminDashboard, null, true);
