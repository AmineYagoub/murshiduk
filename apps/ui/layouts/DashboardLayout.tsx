import styled from '@emotion/styled';
import { Layout, Menu, theme } from 'antd';
import { createElement, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingFilled,
  HomeFilled,
  LogoutOutlined,
  AppstoreFilled,
  EnterOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { AppRoutes } from '../utils/index';
import Link from 'next/link';
import Logo from '@/components/common/Logo';

const { Header, Footer, Sider, Content } = Layout;

export const StyledContent = styled(Content)({
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

export const StyledHeader = styled(Header)({
  boxShadow:
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
  '.trigger': {
    margin: '0 10px',
  },
});

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorPrimaryBg },
  } = theme.useToken();
  return (
    <Layout>
      <StyledHeader style={{ background: colorPrimaryBg }}>
        <Logo />
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </StyledHeader>
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
                icon: (
                  <EnterOutlined className="blue" style={{ marginRight: 20 }} />
                ),
                label: <Link href={AppRoutes.AdminManageOrders}>العملاء</Link>,
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
                icon: (
                  <EnterOutlined className="blue" style={{ marginRight: 20 }} />
                ),
                label: <Link href={AppRoutes.AdminManageBlogs}>التدوينات</Link>,
              },
              {
                key: AppRoutes.AdminManageComments,
                icon: (
                  <EnterOutlined className="blue" style={{ marginRight: 20 }} />
                ),
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
              {
                key: AppRoutes.SignOut,
                icon: <LogoutOutlined className="blue" />,

                label: <Link href={AppRoutes.SignOut}>تسجيل الخروج</Link>,
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
