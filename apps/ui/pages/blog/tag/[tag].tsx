import { Input } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, List } from 'antd';
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
} from '@/utils/index';
import { StyledSection } from '..';
import { User } from '@/utils/types';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import Head from 'next/head';

const limit = 10;
const { Search } = Input;

const BlogsInCategoryPage = () => {
  const { data, methods, isLoading, defaultSearchValue, tag } = useBlogs();
  const { data: appData } = useApp();
  return (
    <>
      <Head>
        <title>{getTitleMeta(appData.title, tag)}</title>
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
                  loader={() =>
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
                description={`${getProfileName(
                  item.author as User
                )} - ${formatDate(item.created)}`}
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
  const tag = String(query?.tag || '');
  if (!tag) {
    return {
      notFound: true,
    };
  }
  const page = Number(query?.page || 1);
  const pageSize = Number(query?.pageSize || limit);
  const search = String(query?.search || '');
  const orderBy = {};

  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
      [
        'blogs',
        {
          take: pageSize,
          skip: (page - 1) * pageSize,
          where: { search, tag },
          orderBy,
        },
      ],
      () =>
        fetchBlogs({
          take: pageSize,
          skip: (page - 1) * pageSize,
          where: { search, tag },
          orderBy,
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

BlogsInCategoryPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);
export default withAuth(BlogsInCategoryPage, true);
