import Head from 'next/head';
import { getTitleMeta } from '@/utils/index';
import BlogLayout from '@/layout/BlogLayout';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Avatar, Button, Rate } from 'antd';
import { useReviews } from '@/hooks/review/query.hook';
import { LikeOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import { useUpdateLikes } from '@/hooks/review/mutation.hook';

const field = 'privacy';

export function ReviewsPage() {
  const { data, isLoading } = useApp(field);
  const [liked, setLiked] = useState<string[]>([]);

  const { mutateAsync } = useUpdateLikes();

  const incrementLikes = async (id: string) => {
    const likes = JSON.parse(localStorage.getItem('likes')) as string[] | null;
    if (likes?.length && likes.includes(id)) {
      await mutateAsync({
        id,
        like: false,
      });
      const filtered = likes.filter((el) => el !== id);
      setLiked(filtered);
      localStorage.setItem('likes', JSON.stringify(filtered));
    } else {
      await mutateAsync({
        id,
        like: true,
      });
      likes.push(id);
      setLiked(likes);
      localStorage.setItem('likes', JSON.stringify(likes));
    }
  };

  const { data: reviewsData } = useReviews(50, { published: true });

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem('likes')) as string[] | null;
    if (likes?.length) {
      setLiked(likes);
    } else {
      localStorage.setItem('likes', JSON.stringify([]));
    }
    //localStorage.clear();
  }, []);
  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title, 'آراء العملاء')}</title>
        <meta name="description" content={data?.description} />
      </Head>
      <List
        loading={isLoading}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          hideOnSinglePage: true,
          pageSize: 50,
        }}
        dataSource={reviewsData}
        renderItem={(item) => (
          <List.Item
            key={item.email}
            actions={[
              <Space key="likes">
                <Button
                  shape="circle"
                  icon={<LikeOutlined />}
                  type={liked.includes(item.id) ? 'primary' : 'default'}
                  ghost={liked.includes(item.id)}
                  onClick={() => incrementLikes(item.id)}
                />
                <span>{item.likes}</span>
              </Space>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar>{item?.name[0]}</Avatar>}
              title={item?.name}
              description={<Rate defaultValue={Number(item?.rate)} disabled />}
            />
            {item?.details}
          </List.Item>
        )}
      />
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

ReviewsPage.getLayout = (page: EmotionJSX.Element) => (
  <BlogLayout>{page}</BlogLayout>
);

export default withAuth(ReviewsPage, true);
