import {
  baseUrl,
  baseS3Url,
  getTitleMeta,
  extractTwitterUserName,
} from '../utils';
import Head from 'next/head';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import HomeLayout from '@/layout/HomeLayout';
import { register } from 'swiper/element/bundle';
import { App, ServiceType } from '@/utils/types';
import { withAuth } from '@/components/auth/withAuth';
import HeroSection from '@/components/home/HeroSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import AboutUsSection from '@/components/home/AboutUsSection';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { fetchServices, useServices } from '@/hooks/ourService/query.hook';
import { useBlogs } from '@/hooks/blog/query.hook';

const TestimonialsSlider = dynamic(
  () => import('@/components/home/TestimonialsSlider'),
  { ssr: false }
);
const GridCarousel = dynamic(
  () => import('@/components/carousel/GridCarousel'),
  {
    ssr: false,
  }
);
const LatestBlogsSection = dynamic(
  () => import('@/components/home/LatestBlogsSection'),
  {
    ssr: false,
  }
);

const itemJsonLd = (data: App) => {
  return {
    __html: data
      ? `
    {
      "@context": "https://schema.org/",
      "@type": "TravelAgency",
      "name": "${data.title}",
      "logo": "${baseS3Url}/carousel/logo.svg",
      "image": "[${data.bio
        .map((el) => baseS3Url + '/' + el.image)
        .join(',')}]",
      "url": "${baseUrl}",
      "priceRange": "$$$",
      "telephone": "${data.whatsApp}",
       "paymentAccepted": "Cash",
       "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "21:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Saturday",
            "Sunday"
          ],
          "opens": "10:00",
          "closes": "23:00"
        }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "${data.address?.latitude}",
        "longitude": "${data.address?.longitude}"
      },
      "address": {
         "@type": "PostalAddress",
         "streetAddress": "${data.address?.streetAddress}",
         "addressLocality": "${data.address?.addressLocality}",
         "addressRegion": "${data.address?.addressRegion}",
         "postalCode": "${data.address?.postalCode}",
         "addressCountry": "Türkiye"
       },
       "keywords":["اسطنبول","انطاليا","تركيا","دليل","سياحة","سياحي","طرابزون","مترجم","مرشد","مرشدة"],
       "articleSection":["المدونة"],
       "inLanguage":"ar",
       "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "3"
      },
       "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "عبد المنعم الجليح"
          },
          "datePublished": "2020-04-01",
          "reviewBody": "شركة تثق بها بكل اطمئنان.",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "5",
            "worstRating": "0"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "علي الدويسري"
          },
          "datePublished": "2020-03-25",
          "reviewBody": "شكر خاص للاستاذ مجد الصباغ على حسن التعامل.",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "4",
            "worstRating": "0"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "خالد"
          },
          "datePublished": "2020-06-05",
          "reviewBody": "أشكركم كثيرا وبالاخص اخ مجد لتعامله اللطيف",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "5",
            "worstRating": "0"
          }
        }
      ]
    }`
      : '',
  };
};

const Home = () => {
  const { data } = useApp();
  const { data: services } = useServices();
  const { data: blogs } = useBlogs();

  useEffect(() => {
    register();
  }, []);
  return (
    <>
      <Head>
        <title>{getTitleMeta(data?.title)}</title>
        <meta name="description" content={data?.description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content={data?.title} />
        <meta name="twitter:description" content={data?.description} />
        <meta name="twitter:domain" content={baseUrl} />

        <meta
          name="twitter:creator"
          content={extractTwitterUserName(data?.twitterUrl)}
        />
        <meta
          name="twitter:site"
          content={extractTwitterUserName(data?.twitterUrl)}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data?.description} />
        <meta property="og:site_name" content={data?.title} />
        <meta property="og:url" content={baseUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={itemJsonLd(data)}
          key="jsonld"
        />
      </Head>
      <HeroSection images={data?.carousel} />

      <AboutUsSection bio={data?.bio} />
      <WhyUsSection content={data?.whyUsContent} />
      <GridCarousel
        data={services.filter((el) => el.type === ServiceType.SERVICE)}
        title="خدماتنا"
        description="خدمات سياحية و مميزات متكاملة"
      />
      <GridCarousel
        data={services.filter((el) => el.type === ServiceType.TRAVEL)}
        title="رحلاتنا السياحية"
        description="رحلات سياحية بأسعار مناسبة وخدمات خمس نجوم"
      />

      <GridCarousel
        data={services.filter((el) => el.type === ServiceType.PROGRAM)}
        title="برامجنا السياحية"
        description="نتكفل بكافة الإجراءات والترتيبات الخاصة ببرنامجك السياحي"
      />

      <LatestBlogsSection data={blogs} />
      <TestimonialsSlider />
    </>
  );
};

Home.getLayout = (page: EmotionJSX.Element) => <HomeLayout>{page}</HomeLayout>;

export default withAuth(Home, true);

export async function getServerSideProps() {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['getApp'],
      queryFn: () => fetchApp(),
    });
    await queryClient.prefetchQuery({
      queryKey: ['getServices'],
      queryFn: () =>
        fetchServices({
          take: 50,
          skip: 0,
        }),
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
