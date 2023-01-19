import { AppProps } from 'next/app';
import Head from 'next/head';
import 'antd/dist/reset.css';

import ar from 'antd/lib/locale/ar_EG';
import { NextComponentType } from 'next';
import { ReactElement, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider, notification, Spin } from 'antd';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CreateEmotionCache from '../config/CreateEmotionCache';
import theme from '../config/Theme';

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
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    notification.config({
      placement: 'topRight',
      duration: 4,
      rtl: true,
    });
    /*     ConfigProvider.config({
      theme,
    }); */
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <ConfigProvider locale={ar} direction='rtl' theme={theme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </CacheProvider>
  );
}
