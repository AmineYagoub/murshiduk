import Head from 'next/head';
import styled from '@emotion/styled';
import { getTitleMeta, mq } from '@/utils/index';
import BlogLayout from '@/layout/BlogLayout';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/home/ContactForm'), {
  ssr: false,
});

const StyledSection = styled('section')(
  mq({
    height: ['120vh', '120vh', '100vh'],
    form: {
      top: '15vh',
      backgroundImage: 'linear-gradient(to right, #29323c, #485563, #29323c)',
      maxWidth: 750,
      padding: ['75px 10px', '75px 20px', '75px 75px 25px'],
      borderRadius: ['35px', '35px', '25% 0'],
      textAlign: 'center',
      filter: 'drop-shadow(5px 5px 10px #666)',
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
  return (
    <StyledSection>
      <Head>
        <title>{getTitleMeta(data?.title, 'تواصل معي')}</title>
        <meta name="description" content={data?.description} />
      </Head>
      <ContactForm withAnimation={false} />
    </StyledSection>
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
