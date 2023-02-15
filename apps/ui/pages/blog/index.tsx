import { Input } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, List } from 'antd';
import styled from '@emotion/styled';
import BlogLayout from '@/layout/BlogLayout';
import { withAuth } from '@/components/auth/withAuth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchBlogs, useBlogs } from '@/hooks/blog/query.hook';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
  formatDate,
  getFirstImageFromContent,
  getProfileName,
  getTitleMeta,
  mq,
} from '@/utils/index';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import Head from 'next/head';

const limit = 10;
const { Search } = Input;

export const StyledSection = styled('section')(
  mq({
    textAlign: 'center',
    padding: [0, 0, '2em'],
    color: '#374151 !important',
    h1: {
      fontSize: ['1.1rem', '1.2rem', '1.5rem'],
      fontWeight: 'bold',
      lineHeight: 1.25,
    },
    '.ant-input-search': {
      maxWidth: ['100%', '100%', '45%'],
    },
    '.ant-list': {
      textAlign: 'left',
      marginTop: '3em',
      img: {
        display: ['none', 'none', 'block'],
      },
      h3: {
        fontSize: ['0.9rem', '0.9rem', '1.3rem'],
        fontWeight: 'bold',
      },
      li: {
        padding: ['16px 0', '16px 0', '16px 24px'],
      },
      '.ant-pagination-item': {
        padding: 'unset',
      },
    },
  })
);

const BlogPages = () => {
  const { data, methods, isLoading, defaultSearchValue } = useBlogs();
  const { data: appData } = useApp();

  return (
    <>
      <Head>
        <title>{getTitleMeta(appData.title, 'المدونة')}</title>
        <meta name="description" content={appData.description} />
      </Head>
      <StyledSection>
        <h1>
          مدونة السياحة في تركيا
          <Image
            src="/icons/idea.svg"
            width={95}
            height={95}
            alt="مدونة السياحة في تركيا"
          />
        </h1>
        <Search
          placeholder="البحث في المدونة"
          onSearch={methods.onSearch}
          enterButton
          size="large"
          defaultValue={defaultSearchValue}
        />
        <List
          itemLayout="vertical"
          size="large"
          loading={isLoading}
          pagination={methods.handlePagination}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <Image
                  width={200}
                  height={200}
                  alt={item.title}
                  src={
                    getFirstImageFromContent(item.content) ||
                    '/img/no-image.svg'
                  }
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.author.profile?.avatar} />}
                title={
                  <Link href={`/blog/${item.slug}`}>
                    <h3>{item.title}</h3>
                  </Link>
                }
                description={`${getProfileName(item.author)} - ${formatDate(
                  item.created
                )}`}
              />
              {item.descriptionMeta}
            </List.Item>
          )}
        />
      </StyledSection>
    </>
  );
};

export async function getServerSideProps({ req, query }) {
  const page = Number(query?.page || 1);
  const pageSize = Number(query?.pageSize || limit);
  const search = String(query?.search || '');

  try {
    // FETCH APP CONFIG
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
      [
        'blogs',
        {
          take: pageSize,
          skip: (page - 1) * pageSize,
          where: { search },
        },
      ],
      () =>
        fetchBlogs({
          take: pageSize,
          skip: (page - 1) * pageSize,
          where: { search },
        })
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

BlogPages.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);
export default withAuth(BlogPages, true);
