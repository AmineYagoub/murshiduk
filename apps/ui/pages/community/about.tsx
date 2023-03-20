import Head from 'next/head';
import BlogLayout from '@/layout/BlogLayout';
import { getTitleMeta } from '@/utils/index';
import Loading from '@/components/common/Loading';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import TimeLineSection from '@/components/home/TimeLineSection';

const field = 'aboutUs';

export function AboutUsPage() {
  const { data, isLoading } = useApp();
  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title, 'من نحن')}</title>
        <meta name="description" content={data?.description} />
      </Head>
      {isLoading ? <Loading /> : <TimeLineSection bio={data.bio} />}
    </>
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
