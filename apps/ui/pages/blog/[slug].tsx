import Link from 'next/link';
import Head from 'next/head';
import styled from '@emotion/styled';
import { Blog, User } from '@/utils/types';
import BlogLayout from '@/layout/BlogLayout';
import { TagOutlined } from '@ant-design/icons';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import RelatedBlogs from '@/components/public/RelatedBlogs';
import ShareButtons from '@/components/public/ShareButtons';
import { Avatar, Card, Col, Divider, Row, Tag } from 'antd';
import { fetchBlog, useBlog } from '@/hooks/blog/query.hook';
import TwitterButton from '@/components/public/TwitterButton';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
  formatDate,
  getProfileName,
  getTitleMeta,
  mq,
  getFirstImageFromContent,
  baseUrl,
  extractTwitterUserName,
  baseS3Url,
} from '@/utils/index';
import Loading from '@/components/common/Loading';

export const StyledRow = styled(Row)(
  mq({
    maxWidth: 1300,
    margin: '0 auto',
    '.ant-card-meta-title': {
      fontSize: ['0.7rem', '0.7rem', '1rem'],
    },
    '.ant-card-meta-description': {
      fontSize: ['0.7rem', '0.7rem', '1rem'],
    },
  })
);

const itemJsonLd = (data: Blog, siteTitle: string) => {
  return {
    __html: `
    {
      "@context": "https://schema.org/",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${baseUrl}/blog/${data.slug}"
      },
      "headline": "${data.title}",
      "description": "${data.descriptionMeta}",
      "image": {
        "@type": "ImageObject",
        "url": "${getFirstImageFromContent(data.content)}",
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

const BlogPage = () => {
  const { data } = useBlog();
  const author = data?.author as User;
  const { data: appData } = useApp();
  return appData && data ? (
    <>
      <Head>
        <title>{getTitleMeta(appData.title, data.title)}</title>
        <meta name="description" content={data.descriptionMeta} />
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

      <StyledRow justify="space-around">
        <Col xs={24} sm={24} md={14}>
          <Card
            bordered={false}
            style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
          >
            <Card.Meta
              avatar={<Avatar src={author.profile?.avatar} />}
              title={getProfileName(author)}
              description={`آخر تحديث تم ${formatDate(data.updated)}`}
            />
          </Card>
          <StyledArticle>
            <h1>{data.title}</h1>
            {data.categories.map((cat) => (
              <Link key={cat.id} href={`/blog/tag/${cat.slug}`}>
                <Tag color="green" icon={<TagOutlined />}>
                  {cat.title}
                </Tag>
              </Link>
            ))}
            <section
              className="travel__blog"
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />
          </StyledArticle>
          <RelatedBlogs data={data.recommended} />
        </Col>
        <Col xs={24} sm={24} md={6}>
          <StyledCard>
            <Card.Meta
              avatar={<Avatar src={author.profile?.avatar} size="large" />}
              title={getProfileName(author)}
              description={author.profile?.title}
            />
            <TwitterButton
              twitter={extractTwitterUserName(appData.twitterUrl)}
            />
            <h5>
              هل تريد التعرف على تركيا من الداخل ومعرفة أهم المعلومات حول
              ثقافتها وأساسيات السياحة فيها ؟
            </h5>
            <p>
              أنشر بانتظام تدوينات مثل هذه ، تحتوي على أفضل الممارسات والنصائح
              التي يجب عليك معرفتها قبل زيارة أبرز الوجهات السياحية في تركيا.
            </p>
            <p>تابعني على تويتر للحصول عليها مباشرة على هاتفك</p>
            <Divider />
            <ShareButtons
              url={`${baseUrl}/blog/${encodeURIComponent(data.slug)}`}
              title={data.title}
            />
          </StyledCard>
        </Col>
      </StyledRow>
    </>
  ) : (
    <Loading />
  );
};

export async function getServerSideProps({ req, query }) {
  const blogSlug = String(query?.slug);
  if (!blogSlug) {
    return {
      notFound: true,
    };
  }
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getBlog', blogSlug], () =>
      fetchBlog(blogSlug)
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

BlogPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);
export default withAuth(BlogPage, true);
