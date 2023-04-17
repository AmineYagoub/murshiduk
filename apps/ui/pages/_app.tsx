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
import { GoogleAnalytics } from 'nextjs-google-analytics';

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

  useEffect(() => {
    notification.config({
      placement: 'topRight',
      duration: 4,
      rtl: true,
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ConfigProvider locale={ar} direction="rtl" theme={theme}>
              <GoogleAnalytics trackPageViews />
              <Component {...pageProps} />
            </ConfigProvider>
          </Hydrate>
        </QueryClientProvider>
      </CacheProvider>
    </>
  );
}
