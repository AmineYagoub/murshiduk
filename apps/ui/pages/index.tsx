import { gsap } from 'gsap';
import Head from 'next/head';
import HomeLayout from '@/layout/HomeLayout';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { withAuth } from '@/components/auth/withAuth';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import TimeLineSection from '@/components/home/TimeLineSection';
import ContactUsSection from '@/components/home/ContactUsSection';
import LatestBlogsSection from '@/components/home/LatestBlogsSection';
import { baseUrl, getTitleMeta } from '../utils';
import HeroSection from '@/components/home/HeroSection';
import dynamic from 'next/dynamic';
import { StyledSection } from '@/components/home/WhyUsSection';
import { App } from '@/utils/types';
import { fetchBlogs, useBlogs } from '@/hooks/blog/query.hook';
gsap.registerPlugin(ScrollTrigger);
const WhyUsSection = dynamic(() => import('@/components/home/WhyUsSection'), {
  loading: () => <StyledSection />,
  ssr: false,
});

const itemJsonLd = (data: App) => {
  return {
    __html: `
    {
      "@context": "https://schema.org/",
      "@type": "TravelAgency",
      "name": "${data.title}",
      "image": ${data.carousel},
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

const images = [
  '/img/istanbul.webp',
  '/img/cappadocia.webp',
  '/img/trabzon.webp',
  '/img/antalya.webp',
  '/img/amasya.webp',
];

const Home = () => {
  const { data } = useApp();
  return (
    <>
      <Head>
        <title>{getTitleMeta(data.title)}</title>
        <meta name="description" content={data.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={itemJsonLd(data)}
          key="jsonld"
        />
      </Head>
      {/* <HeroSection images={images} /> */}
      <WhyUsSection />
      <TimeLineSection bio={data.bio} />
      <ContactUsSection />
      <LatestBlogsSection />
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
