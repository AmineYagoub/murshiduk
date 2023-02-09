import Head from 'next/head';
import styled from '@emotion/styled';
import BlogLayout from '@/layout/BlogLayout';

import { getTitleMeta } from '@/utils/index';
import Loading from '@/components/common/Loading';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export const StyledArticle = styled('article')({
  padding: '1em 5em',
  h1: {
    fontSize: '3rem',
    textDecoration: 'underline',
  },
  h2: {
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  p: {
    whiteSpace: 'normal',
    fontSize: '1.1rem',
    lineHeight: 1.8,
  },
  li: {
    lineHeight: 1.8,
  },
});

const field = 'agreement';

export function TermsAndConditionsPage() {
  const { data, isLoading } = useApp(field);
  return (
    <StyledArticle>
      <Head>
        <title>{getTitleMeta(data?.title, 'إتفاقية الإستخدام')}</title>
        <meta name="description" content={data?.description} />
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>إتفاقية الإستخدام</h1>
          <div dangerouslySetInnerHTML={{ __html: data.agreement }} />
        </>
      )}
    </StyledArticle>
  );
}

export async function getServerSideProps() {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getApp', field], () => fetchApp(field));
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

TermsAndConditionsPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);

export default withAuth(TermsAndConditionsPage, null, true);
