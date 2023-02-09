import Head from 'next/head';
import styled from '@emotion/styled';
import HomeLayout from '@/layout/HomeLayout';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { getTitleMeta } from '@/utils/index';
import { App } from '@/utils/types';
import { withAuth } from '@/components/auth/withAuth';

const StyledSection = styled('section')({
  backgroundColor: '#f8f8f8 !important',
  padding: '1em 5em',
  p: {
    whiteSpace: 'normal',
    fontSize: '1.1rem',
  },
});

export function ContactUsPage({ data }: { data: App }) {
  return (
    <StyledSection>
      <Head>
        <title>{getTitleMeta(data?.title, 'تواصل معي')}</title>
        <meta name="description" content={data?.description} />
      </Head>
      <article dangerouslySetInnerHTML={{ __html: data.aboutUs }} />
    </StyledSection>
  );
}

export async function getServerSideProps({ req, query }) {
  try {
    console.log('');
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

ContactUsPage.getLayout = (page: EmotionJSX.Element) => (
  <HomeLayout>{page}</HomeLayout>
);

export default withAuth(ContactUsPage, null, true);
