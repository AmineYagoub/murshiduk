import { AppProps } from 'next/app';
import 'antd/dist/reset.css';
import './global.css';
import theme from '@/config/Theme';
import ar from 'antd/lib/locale/ar_EG';
import { NextComponentType } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider, notification, Spin } from 'antd';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CreateEmotionCache from '@/config/CreateEmotionCache';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

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
    <CacheProvider value={emotionCache}>
      <ConfigProvider locale={ar} direction="rtl" theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ConfigProvider>
    </CacheProvider>
  );
}
