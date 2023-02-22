import { gsap } from 'gsap';
import Head from 'next/head';
import { App } from '@/utils/types';
import HomeLayout from '@/layout/HomeLayout';
import { fetchBlogs } from '@/hooks/blog/query.hook';
import { withAuth } from '@/components/auth/withAuth';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import WhyUsSection from '@/components/home/WhyUsSection';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import TimeLineSection from '@/components/home/TimeLineSection';
import ContactUsSection from '@/components/home/ContactUsSection';
import LatestBlogsSection from '@/components/home/LatestBlogsSection';
import {
  baseS3Url,
  baseUrl,
  extractTwitterUserName,
  getTitleMeta,
} from '../utils';
import HeroSection from '@/components/home/HeroSection';
import dynamic from 'next/dynamic';
const TestimonialsSlider = dynamic(
  () => import('@/components/home/TestimonialsSlider'),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

const itemJsonLd = (data: App) => {
  return {
    __html: `
    {
      "@context": "https://schema.org/",
      "@type": "TravelAgency",
      "name": "${data.title}",
      "image": "${data.carousel}",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.0082,
        "longitude": 28.9784
      },
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
       "address": {
         "@type": "PostalAddress",
         "streetAddress": "Libadiye Caddesi No: 82F",
         "addressLocality": "Üsküdar",
         "addressRegion": "İstanbul,",
         "postalCode": "34700",
         "addressCountry": "Türkiye"
       }
    }`,
  };
};

const images = ['/img/istanbul.webp', '/img/cappadocia.webp'];

const Home = () => {
  const { data } = useApp();
  const carouselImages =
    data.carousel.length > 0
      ? data.carousel.map((el) => `${baseS3Url}/${el}`)
      : images;
  return (
    <>
      <Head>
        <title>{getTitleMeta(data.title)}</title>
        <meta name="description" content={data.description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:domain" content={baseUrl} />

        <meta
          name="twitter:creator"
          content={extractTwitterUserName(data.twitterUrl)}
        />
        <meta
          name="twitter:site"
          content={extractTwitterUserName(data.twitterUrl)}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:site_name" content={data.title} />
        <meta property="og:url" content={baseUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={itemJsonLd(data)}
          key="jsonld"
        />
      </Head>
      <HeroSection images={carouselImages} />
      <WhyUsSection />
      <TimeLineSection bio={data.bio} />
      <ContactUsSection />
      <LatestBlogsSection />
      <TestimonialsSlider images={carouselImages} />
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
      queryKey: [
        'blogs',
        {
          take: 5,
          skip: 0,
        },
      ],
      queryFn: () =>
        fetchBlogs({
          take: 5,
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
