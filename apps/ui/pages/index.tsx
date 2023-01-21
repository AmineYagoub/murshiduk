import dynamic from 'next/dynamic';
import Head from 'next/head';

const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  loading: () => <span>Loading...</span>,
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/hqi8tzo.css" />
      </Head>
      <HeroSection />
    </>
  );
}
