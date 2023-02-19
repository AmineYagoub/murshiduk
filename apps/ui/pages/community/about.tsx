import Head from 'next/head';
import BlogLayout from '@/layout/BlogLayout';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { getTitleMeta } from '@/utils/index';
import { withAuth } from '@/components/auth/withAuth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import Loading from '@/components/common/Loading';
import { StyledArticle } from './terms';

const field = 'aboutUs';

export function AboutUsPage() {
  const { data, isLoading } = useApp(field);
  return (
    <StyledArticle>
      <Head>
        <title>{getTitleMeta(data?.title, 'حول الموقع')}</title>
        <meta name="description" content={data?.description} />
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: data.aboutUs }} />
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

AboutUsPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);

export default withAuth(AboutUsPage, true);
