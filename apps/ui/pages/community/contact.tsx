import Head from 'next/head';
import styled from '@emotion/styled';
import { getTitleMeta, mq } from '@/utils/index';
import BlogLayout from '@/layout/BlogLayout';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import dynamic from 'next/dynamic';
import { Col, Row, List } from 'antd';
import {
  WhatsAppOutlined,
  MailOutlined,
  BankOutlined,
} from '@ant-design/icons';
const ContactForm = dynamic(() => import('@/components/home/ContactForm'), {
  ssr: false,
});

const StyledSection = styled(Row)(
  mq({
    maxWidth: 1200,
    border: '5px solid #1cafbf',
    borderRadius: 15,
    margin: '1em auto',

    address: {
      borderRadius: 15,
      backgroundColor: '#fff',
      backgroundImage: "url('/img/contact-us.jpeg')",
      backgroundSize: '75%',
      height: '100%',
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
      minHeight: 630,
    },
    ul: {
      padding: '1em !important',
      '.anticon': {
        color: '#1cafbf',
        fontSize: '1.5em',
      },
      li: {
        flexDirection: 'column',
        alignItems: 'normal !important',
      },
    },
    strong: {
      color: '#122639',
    },
    b: {
      color: '#1cafbf',
      fontSize: '1em',
      marginLeft: 40,
      marginTop: 10,
      display: 'inline-block',
    },
    '.ant-result-title': {
      color: '#222 !important',
    },
    '.ant-result-subtitle': {
      color: '#222 !important',
    },
  })
);

export function ContactUsPage() {
  const { data } = useApp();
  const list = [
    {
      title: 'ارسل لنا رسالة',
      description: 'فريقنا الودود هنا للمساعدة',
      icon: <MailOutlined />,
      data: data.contactEmail,
    },
    {
      title: 'تحدث معنا',
      description: 'كل أيام الأسبوع',
      icon: <WhatsAppOutlined />,
      data: data.whatsApp,
    },
    {
      title: 'قم بزيارتنا',
      description: 'تعال قل مرحبا في مكتبنا',
      icon: <BankOutlined />,
      data: (
        <>
          <div>{data.address.streetAddress}</div>
          <div>
            {data.address.postalCode} {data.address.addressLocality}
          </div>
          <div>{data.address.addressRegion}</div>
        </>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title, 'تواصل معنا')}</title>
        <meta name="description" content={data?.description} />
      </Head>
      <StyledSection>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <address>
            <List
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={<strong>{item.title}</strong>}
                    description={item.description}
                  />
                  <b dir="ltr">{item.data}</b>
                </List.Item>
              )}
            />
          </address>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <ContactForm withAnimation={false} />
        </Col>
      </StyledSection>
    </>
  );
}

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

ContactUsPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);

export default withAuth(ContactUsPage, true);
