import { Avatar, Card, Col, Divider, Row, Tag } from 'antd';
import BlogLayout from '@/layout/BlogLayout';
import Loading from '@/components/common/Loading';
import { withAuth } from '@/components/auth/withAuth';
import { fetchBlog, useBlog } from '@/hooks/blog/query.hook';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { TagOutlined } from '@ant-design/icons';
import Link from 'next/link';
import TwitterButton from '@/components/public/TwitterButton';
import { formatDate } from '@/utils/index';
import RelatedBlogs from '@/components/public/RelatedBlogs';
import ShareButtons from '@/components/public/ShareButtons';

export const StyledArticle = styled('article')({
  color: '#374151 !important',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    lineHeight: 1.25,
  },
  h2: {
    fontSize: '2.1rem',
    marginTop: '1.5em',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: '1.9rem',
    marginTop: '1.5em',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: '1.6rem',
    marginTop: '1.5em',
    fontWeight: 'bold',
  },
  '.travel__blog': {
    margin: '3em auto',
    overflow: 'hidden',
    wordBreak: 'break-word',
    p: {
      fontSize: '1.2rem',
      lineHeight: 1.8,
    },
  },
  '.travel__blog-card': {
    backgroundColor: 'rgba(31,41,55) !important',
  },
});

export const StyledCard = styled(Card)({
  backgroundColor: 'rgba(31,41,55) !important',
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
});

const BlogPage = () => {
  const { data } = useBlog();
  const author = data?.author;
  return data ? (
    <>
      <Row justify="space-around">
        <Col span={14}>
          <Card
            bordered={false}
            style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
          >
            <Card.Meta
              avatar={<Avatar src={author.profile.avatar} />}
              title={`${author.profile.firstName} ${author.profile.lastName}`}
              description={`آخر تحديث تم ${formatDate(data.updated)}`}
            />
          </Card>
          <StyledArticle>
            <h1>{data.title}</h1>
            {data.categories.map((cat) => (
              <Link key={cat.id} href={`/blog/categories/${cat.slug}`}>
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
        <Col span={6}>
          <StyledCard>
            <Card.Meta
              avatar={<Avatar src={author.profile.avatar} size="large" />}
              title={`${author.profile.firstName} ${author.profile.lastName}`}
              description="مرشد سياحي"
            />
            <TwitterButton />
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
            <ShareButtons />
          </StyledCard>
        </Col>
      </Row>
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
    await queryClient.prefetchQuery([['getBlog', blogSlug]], () =>
      fetchBlog(blogSlug)
    );
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
export default withAuth(BlogPage, null, true);
