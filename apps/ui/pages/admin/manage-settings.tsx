import { Tabs } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchApp } from '@/hooks/app/query.hook';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { AppRoutes, getTitleMeta } from '@/utils/index';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import AppSettingsForm from '@/components/settings/AppSettingsForm';
import AppHomeSectionsForm from '@/components/settings/AppHomeSectionsForm';

export enum AppTabs {
  APP_CONFIG = 'app-config',
  HOME_SECTIONS = 'home-sections',
  AGREEMENT = 'agreement',
  PRIVACY = 'privacy',
  ABOUT_US = 'about-us',
}

const items = [
  {
    label: 'إعدادات عامة',
    key: AppTabs.APP_CONFIG,
    children: <AppSettingsForm />,
  },
  {
    label: 'أقسام الصفحة الرئيسية',
    key: AppTabs.HOME_SECTIONS,
    children: <AppHomeSectionsForm />,
  },
];

const AdminManageSettings = () => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>(AppTabs.APP_CONFIG);

  useEffect(() => {
    const tab = String(router.query?.tab);
    const active = Object.values(AppTabs).includes(tab as AppTabs)
      ? tab
      : AppTabs.APP_CONFIG;
    setActiveKey(active);
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{getTitleMeta('لوحة التحكم', 'الإعدادت')}</title>
      </Head>

      <Tabs
        type="card"
        defaultActiveKey={AppTabs.APP_CONFIG}
        activeKey={activeKey}
        onTabClick={(key, _) => {
          router.push(
            {
              pathname: AppRoutes.AdminManageSettings,
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

AdminManageSettings.getLayout = (page: EmotionJSX.Element) => (
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

export default withAuth(AdminManageSettings);
