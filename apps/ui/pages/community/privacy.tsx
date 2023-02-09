import Head from 'next/head';
import { StyledArticle } from './terms';
import { getTitleMeta } from '@/utils/index';
import BlogLayout from '@/layout/BlogLayout';
import Loading from '@/components/common/Loading';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const field = 'privacy';

export function PrivacyPolicyPage() {
  const { data, isLoading } = useApp(field);
  return (
    <StyledArticle>
      <Head>
        <title>{getTitleMeta(data?.title, 'سياسة الخصوصية')}</title>
        <meta name="description" content={data?.description} />
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>سياسة الخصوصية</h1>
          <div dangerouslySetInnerHTML={{ __html: data.privacy }} />
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

PrivacyPolicyPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);

export default withAuth(PrivacyPolicyPage, null, true);
