import {
  baseUrl,
  baseS3Url,
  getTitleMeta,
  getProfileName,
  extractTwitterUserName,
} from '@/utils/index';
import Head from 'next/head';
import { Card } from 'antd';
import styled from '@emotion/styled';
import { Service } from '@/utils/types';
import BlogLayout from '@/layout/BlogLayout';
import Loading from '@/components/common/Loading';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { fetchService, useService } from '@/hooks/ourService/query.hook';

const itemJsonLd = (data: Service, siteTitle: string) => {
  return {
    __html: `
    {
      "@context": "https://schema.org/",
      "@type": "Service",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${baseUrl}/our-service/${data.slug}"
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

export const StyledArticle = styled('article')({
  color: '#374151 !important',
  maxWidth: 850,
  padding: '0 2em',
  h1: {
    fontSize: 'clamp(1.2rem, 5vw, 2.5rem)',
    fontWeight: 'bold',
    lineHeight: 1.25,
  },
  h2: {
    fontSize: 'clamp(1rem, 4vw, 2rem)',
    marginTop: '1.5em',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 'clamp(0.8rem, 3vw, 1.8rem)',
    marginTop: '1.5em',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 'clamp(0.6rem, 3vw, 1.4rem)',
    marginTop: '1.5em',
    fontWeight: 'bold',
  },
  '.travel__blog': {
    margin: '3em auto',
    overflow: 'hidden',
    lineHeight: 1.8,
    wordBreak: 'break-word',
    p: {
      fontSize: 'clamp(0.9rem, 4vw, 1.2rem)',
      lineHeight: 1.8,
    },
  },
  '.travel__blog-card': {
    backgroundColor: 'rgba(31,41,55) !important',
  },
});

export const StyledCard = styled(Card)({
  background: 'linear-gradient(#2b2346, #232135)',
  position: 'sticky',
  top: 65,
  div: {
    color: '#fff !important',
  },
  h5: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '2em auto',
  },
  '.ant-card-meta-description': {
    fontSize: 12,
  },
});

const ServicePage = () => {
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
    await queryClient.prefetchQuery(['getService', serviceSlug], () =>
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

ServicePage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);
export default withAuth(ServicePage, true);
