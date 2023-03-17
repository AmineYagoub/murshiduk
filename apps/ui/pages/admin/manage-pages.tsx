import { Tabs } from 'antd';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchApp } from '@/hooks/app/query.hook';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { AppRoutes, getTitleMeta } from '@/utils/index';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const AppPrivacyForm = dynamic(
  () => import('@/components/settings/AppPrivacyForm'),
  {
    ssr: false,
  }
);
const AppAboutUsForm = dynamic(
  () => import('@/components/settings/AppAboutUsForm'),
  {
    ssr: false,
  }
);
const AppAgreementForm = dynamic(
  () => import('@/components/settings/AppAgreementForm'),
  {
    ssr: false,
  }
);

export enum AppTabs {
  AGREEMENT = 'agreement',
  PRIVACY = 'privacy',
  ABOUT_US = 'about-us',
}

const items = [
  {
    label: 'من نحن',
    key: AppTabs.ABOUT_US,
    children: <AppAboutUsForm />,
  },
  {
    label: 'الشروط و الأحكام',
    key: AppTabs.AGREEMENT,
    children: <AppAgreementForm />,
  },
  {
    label: 'سياسة الخصوصية',
    key: AppTabs.PRIVACY,
    children: <AppPrivacyForm />,
  },
];

const AdminManagePages = () => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>(AppTabs.ABOUT_US);

  useEffect(() => {
    const tab = String(router.query?.tab);
    const active = Object.values(AppTabs).includes(tab as AppTabs)
      ? tab
      : AppTabs.ABOUT_US;
    setActiveKey(active);
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'صفحات الموقع')}</title>
      </Head>

      <Tabs
        type="card"
        defaultActiveKey={AppTabs.ABOUT_US}
        activeKey={activeKey}
        onTabClick={(key, _) => {
          router.push(
            {
              pathname: AppRoutes.AdminManagePages,
              query: { tab: key },
            },
            undefined,
            { shallow: true }
          );
          setActiveKey(key);
        }}
        destroyInactiveTabPane
        items={items}
      />
    </>
  );
};

AdminManagePages.getLayout = (page: EmotionJSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

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

export default withAuth(AdminManagePages);
