import { Tabs } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { withAuth } from '@/components/auth/withAuth';
import DashboardLayout from '@/layout/DashboardLayout';
import { AppRoutes, getTitleMeta } from '@/utils/index';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import AppSettingsForm from '@/components/settings/AppSettingsForm';

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
  APP_CONFIG = 'app-config',
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
    label: 'الشروط و الأحكام',
    key: AppTabs.AGREEMENT,
    children: <AppAgreementForm />,
  },
  {
    label: 'سياسة الخصوصية',
    key: AppTabs.PRIVACY,
    children: <AppPrivacyForm />,
  },
  {
    label: 'حول الموقع',
    key: AppTabs.ABOUT_US,
    children: <AppAboutUsForm />,
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
export default withAuth(AdminManageSettings, null, true);
