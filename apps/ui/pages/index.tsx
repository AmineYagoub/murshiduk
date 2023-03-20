import {
  baseUrl,
  baseS3Url,
  getTitleMeta,
  extractTwitterUserName,
} from '../utils';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import HomeLayout from '@/layout/HomeLayout';
import { App, ServiceType } from '@/utils/types';
import { withAuth } from '@/components/auth/withAuth';
import OurTravels from '@/components/home/OurTravels';
import HeroSection from '@/components/home/HeroSection';
import OurServices from '@/components/home/OurServices';
import WhyUsSection from '@/components/home/WhyUsSection';
import { fetchApp, useApp } from '@/hooks/app/query.hook';
import { fetchServices } from '@/hooks/ourService/query.hook';
import AboutUsSection from '@/components/home/AboutUsSection';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import LatestBlogsSection from '@/components/home/LatestBlogsSection';

const TestimonialsSlider = dynamic(
  () => import('@/components/home/TestimonialsSlider'),
  { ssr: false }
);

const getPaginationParams = (type: ServiceType) => {
  return {
    take: 20,
    skip: 0,
    where: { type },
  };
};

const itemJsonLd = (data: App) => {
  return {
    __html: `
    {
      "@context": "https://schema.org/",
      "@type": "TravelAgency",
      "name": "${data.title}",
      "image": "${data.carousel}",
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

      <AboutUsSection bio={data.bio} />
      <WhyUsSection content={data.whyUsContent} />
      <OurServices />
      <OurTravels />
      <LatestBlogsSection />
      <TestimonialsSlider images={carouselImages} />
    </>
  );
};

Home.getLayout = (page: EmotionJSX.Element) => <HomeLayout>{page}</HomeLayout>;

export default withAuth(Home, true);

export async function getServerSideProps() {
  const serviceType: ServiceType = 'SERVICE';
  const travelType: ServiceType = 'TRAVEL';
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['getApp'],
      queryFn: () => fetchApp(),
    });
    await queryClient.prefetchQuery({
      queryKey: [serviceType, getPaginationParams(serviceType)],
      queryFn: () => fetchServices(getPaginationParams(serviceType)),
    });
    await queryClient.prefetchQuery({
      queryKey: [travelType, getPaginationParams(travelType)],
      queryFn: () => fetchServices(getPaginationParams(travelType)),
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
