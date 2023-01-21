import styled from '@emotion/styled';
import { Layout, Menu, theme } from 'antd';
import { createElement, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingFilled,
  HomeFilled,
  AppstoreFilled,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { AppRoutes } from '../utils';
import Link from 'next/link';

const { Header, Footer, Sider, Content } = Layout;

const StyledContent = styled(Content)({
  width: '95% !important',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  minHeight: '90vh !important',
  padding: '2em',
  '.page': {
    backgroundColor: '#fff',
    minHeight: '80vh !important',
    padding: '2em',
  },
});

const Logo = styled('div')({
  height: 32,
  margin: 16,
  background: 'rgba(255, 255, 255, 0.3)',
  maxWidth: 200,
});

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorPrimaryBg },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{ padding: 0, background: colorPrimaryBg, display: 'flex' }}
      >
        <Logo />
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[AppRoutes.AdminManageDashboard]}
            selectedKeys={[router.pathname]}
            items={[
              {
                key: AppRoutes.AdminManageDashboard,
                icon: <HomeFilled className="blue" />,
                label: (
                  <Link href={AppRoutes.AdminManageDashboard}>لوحة التحكم</Link>
                ),
              },
              {
                key: AppRoutes.AdminManageOrders,
                icon: <AppstoreFilled className="hide" />,
                label: <Link href={AppRoutes.AdminManageOrders}>الطلبات</Link>,
              },
              {
                key: AppRoutes.AdminManageCategories,
                icon: <AppstoreFilled className="blue" />,
                label: (
                  <Link href={AppRoutes.AdminManageCategories}>الأقسام</Link>
                ),
              },
              {
                key: AppRoutes.AdminManageBlogs,
                icon: <AppstoreFilled className="hide" />,
                label: <Link href={AppRoutes.AdminManageBlogs}>التدوينات</Link>,
              },
              {
                key: AppRoutes.AdminManageComments,
                icon: <AppstoreFilled className="hide" />,
                label: (
                  <Link href={AppRoutes.AdminManageComments}>التعليقات</Link>
                ),
              },
              {
                key: AppRoutes.AdminManageSettings,
                icon: <SettingFilled className="blue" />,
                label: (
                  <Link href={AppRoutes.AdminManageSettings}>الإعدادات</Link>
                ),
              },
            ]}
          />
        </Sider>
        <StyledContent>{children}</StyledContent>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default DashboardLayout;
