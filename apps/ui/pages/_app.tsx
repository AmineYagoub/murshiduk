import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import 'antd/dist/reset.css';
import Head from 'next/head';
import '../public/global.css';
import theme from '@/config/Theme';
import { AppProps } from 'next/app';
import ar from 'antd/lib/locale/ar_EG';
import { NextComponentType } from 'next';
import { LoadingOutlined } from '@ant-design/icons';
import { ReactElement, useEffect, useState } from 'react';
import { ConfigProvider, notification, Spin } from 'antd';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CreateEmotionCache from '@/config/CreateEmotionCache';
import { useRouter } from 'next/router';
import { GTM_ID, pageView } from '../utils';
import Script from 'next/script';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
Spin.setDefaultIndicator(<Spin indicator={antIcon} />);
const clientSideEmotionCache = CreateEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextComponentType & {
    getLayout: (page: ReactElement) => ReactElement;
  };
}

export default function CustomApp(props: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    notification.config({
      placement: 'topRight',
      duration: 4,
      rtl: true,
    });
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', pageView);
    return () => {
      router.events.off('routeChangeComplete', pageView);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ConfigProvider locale={ar} direction="rtl" theme={theme}>
              <Component {...pageProps} />
            </ConfigProvider>
          </Hydrate>
        </QueryClientProvider>
      </CacheProvider>
    </>
  );
}
