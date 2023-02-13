import { gsap } from 'gsap';
import HomeLayout from '@/layout/HomeLayout';
import { fetchApp } from '@/hooks/app/query.hook';
import { withAuth } from '@/components/auth/withAuth';
import HeroSection from '@/components/home/HeroSection';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WhyUsSection from '@/components/home/WhyUsSection';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import TimeLineSection from '@/components/home/TimeLineSection';
import ContactUsSection from '@/components/home/ContactUsSection';
import LatestBlogsSection from '@/components/home/LatestBlogsSection';

gsap.registerPlugin(ScrollTrigger);

/* const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  loading: () => <span>Loading...</span>,
  ssr: false,
});
const WhyUsSection = dynamic(() => import('@/components/home/WhyUsSection'), {
  loading: () => <span>Loading...</span>,
  ssr: false,
}); */

const Home = () => {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <TimeLineSection />
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
