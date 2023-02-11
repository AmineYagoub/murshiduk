import { gsap } from 'gsap';
import HeroSection from '@/components/home/HeroSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import TimeLineSection from '@/components/home/TimeLineSection';
import ContactUsSection from '@/components/home/ContactUsSection';
import LatestBlogsSection from '@/components/home/LatestBlogsSection';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchApp } from '@/hooks/app/query.hook';

gsap.registerPlugin(ScrollTrigger);

/* const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  loading: () => <span>Loading...</span>,
  ssr: false,
});
const WhyUsSection = dynamic(() => import('@/components/home/WhyUsSection'), {
  loading: () => <span>Loading...</span>,
  ssr: false,
}); */

export default function Home() {
  return (
    <>
      {/* <HeroSection /> */}
      <WhyUsSection />
      <TimeLineSection />
      <ContactUsSection />
      <LatestBlogsSection />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['getApp'], () => fetchApp());
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
