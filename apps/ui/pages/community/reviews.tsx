import Head from 'next/head';
import { getTitleMeta } from '@/utils/index';
import HomeLayout from '@/layout/HomeLayout';
import Loading from '@/components/common/Loading';
import { withAuth } from '@/components/auth/withAuth';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ReviewsGrid } from '@/utils/animation/Reviews';
import { Avatar, Card, Rate, Tooltip } from 'antd';
import AddReview from '@/components/review/AddReview';
import { fetchReviews, useReviews } from '@/hooks/review/query.hook';
import { Review } from '@/utils/types';

const field = 'privacy';

export function ReviewsPage() {
  const { data, isLoading } = useApp(field);
  const [review, setReview] = useState<Review | null>(null);

  const { data: reviewsData } = useReviews(14, { published: true });

  useEffect(() => {
    const anime = new ReviewsGrid();
    anime.triggerAnimation();
  }, []);
  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title, 'آراء العملاء')}</title>
        <meta name="description" content={data?.description} />
        <link rel="stylesheet" type="text/css" href="/css/review.css" />
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <div className="intro-grid intro-grid--labels">
            <span className="intro-grid__label pos-1 oh">
              <span className="oh__inner">I</span>
            </span>
            <span className="intro-grid__label pos-2 oh">
              <span className="oh__inner">II</span>
            </span>
            <span className="intro-grid__label pos-3 oh">
              <span className="oh__inner">III</span>
            </span>
            <span className="intro-grid__label pos-4 oh">
              <span className="oh__inner">IV</span>
            </span>
            <span className="intro-grid__label pos-5 oh">
              <span className="oh__inner">V</span>
            </span>
            <span className="intro-grid__label pos-6 oh">
              <span className="oh__inner">VI</span>
            </span>
            <span className="intro-grid__label pos-7 oh">
              <span className="oh__inner">VII</span>
            </span>
            <span className="intro-grid__label pos-8 oh">
              <span className="oh__inner">VIII</span>
            </span>
          </div>

          <Avatar.Group className="intro-grid intro-grid--images">
            {[11, 16, 9, 12, 17, 20, 21, 13, 3, 8, 15, 18, 22, 10].map(
              (el, i) => {
                const r = reviewsData[i];

                return (
                  <div
                    key={el}
                    className={`intro-grid__img pos-${el}`}
                    style={{ display: r ? 'block' : 'none' }}
                  >
                    <Avatar
                      onClick={() => setReview(r)}
                      size="large"
                      style={{
                        backgroundColor: '#1a2a3a',
                        color: '#f3b91d',
                        border: '2px solid #f3b91d',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    >
                      {r?.name[0]}
                    </Avatar>

                    <b style={{ fontSize: 10, color: '#f3b91d' }}>{r?.name}</b>
                    <Rate disabled defaultValue={5} />
                  </div>
                );
              }
            )}
          </Avatar.Group>

          <div className="intro-title">
            <h2 className="intro-title__main oh">
              <span className="oh__inner">ماذا يقول عنا عملاؤنا ؟</span>
            </h2>
            <span className="intro-title__sub oh">
              <span className="oh__inner">
                <AddReview />
              </span>
            </span>
          </div>
          <div className="slider-title">
            <h3 className="slider-title__main oh">
              <span className="oh__inner">{review?.name}</span>
            </h3>
            <p className="slider-title__desc">{review?.details}</p>
          </div>
          <div className="controls">
            <button className="unbutton close">X</button>
          </div>
        </main>
      )}
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
  <HomeLayout>{page}</HomeLayout>
);

export default withAuth(ReviewsPage, true);
