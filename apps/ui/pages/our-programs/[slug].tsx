import {
  baseUrl,
  baseS3Url,
  getTitleMeta,
  getProfileName,
  extractTwitterUserName,
} from '@/utils/index';
import Head from 'next/head';
import { Service } from '@/utils/types';
import BlogLayout from '@/layout/BlogLayout';
import Loading from '@/components/common/Loading';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { fetchService, useService } from '@/hooks/ourService/query.hook';
import { StyledArticle } from '../our-services/[slug]';

const itemJsonLd = (data: Service, siteTitle: string) => {
  return {
    __html: `
    {
      "@context": "https://schema.org/",
      "@type": "Service",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${baseUrl}/our-programs/${data.slug}"
      },
      "headline": "${data.title}",
      "description": "${data.description}",
      "image": {
        "@type": "ImageObject",
        "url": "${data.image}",
        "width": "500",
        "height": "500"
      },
      "author": {
        "@type": "Person",
        "name": "${getProfileName(data.author)}",
        "url": "${baseUrl}/community/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "${siteTitle}",
        "logo": {
          "@type": "ImageObject",
          "url": "${baseS3Url}/carousel/logo.svg",
          "width": "150",
          "height": "60"
        }
      },
      "datePublished": "${data.created}",
      "dateModified": "${data.updated}"
    }
    `,
  };
};

const ProgramPage = () => {
  const { data } = useService();
  const { data: appData } = useApp();
  return appData && data ? (
    <>
      <Head>
        <title>{getTitleMeta(appData.title, data.title)}</title>
        <meta name="description" content={data.description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content={appData.title} />
        <meta name="twitter:description" content={appData.description} />
        <meta name="twitter:domain" content={baseUrl} />

        <meta
          name="twitter:creator"
          content={extractTwitterUserName(appData.twitterUrl)}
        />
        <meta
          name="twitter:site"
          content={extractTwitterUserName(appData.twitterUrl)}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:title" content={appData.title} />
        <meta property="og:description" content={appData.description} />
        <meta property="og:site_name" content={appData.title} />
        <meta property="og:url" content={baseUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={itemJsonLd(data, appData.title)}
          key="jsonld"
        />
      </Head>

      <StyledArticle>
        <section
          className="travel__blog"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </StyledArticle>
    </>
  ) : (
    <Loading />
  );
};

export async function getServerSideProps({ req, query }) {
  const serviceSlug = String(query?.slug);
  if (!serviceSlug) {
    return {
      notFound: true,
    };
  }
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getProgram', serviceSlug], () =>
      fetchService(serviceSlug)
    );
    await queryClient.prefetchQuery({
      queryKey: ['getApp'],
      queryFn: () => fetchApp(),
    });
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

ProgramPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);
export default withAuth(ProgramPage, true);
