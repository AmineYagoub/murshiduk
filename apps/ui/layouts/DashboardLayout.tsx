import {
  SettingFilled,
  LogoutOutlined,
  AppstoreFilled,
  MenuFoldOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppRoutes } from '../utils/index';
import Logo from '@/components/common/Logo';
import { createElement, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { mq } from '../utils';
const { Header, Footer, Sider, Content } = Layout;

export const StyledContent = styled(Content)(
  mq({
    width: '95% !important',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    minHeight: '80vh !important',
    padding: ['2em 0', '2em 0', '2em'],
  })
);

export const StyledHeader = styled(Header)({
  boxShadow:
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
  backgroundImage: 'linear-gradient(to right, #29323c, #122639, #29323c)',
  '.trigger': {
    margin: '0 10px',
    color: '#ccc',
  },
});

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem(
    <Link href={AppRoutes.AdminManageDashboard}>لوحة التحكم</Link>,
    AppRoutes.AdminManageDashboard,
    <DashboardOutlined className="blue" />,
    [
      getItem(
        <Link href={AppRoutes.AdminManageOrders}>العملاء</Link>,
        AppRoutes.AdminManageOrders
      ),
      getItem(
        <Link href={AppRoutes.AdminManageServices}>الخدمات</Link>,
        AppRoutes.AdminManageServices
      ),
      getItem(
        <Link href={AppRoutes.AdminManageTravels}>الرحلات</Link>,
        AppRoutes.AdminManageTravels
      ),
    ]
  ),
  getItem(
    <Link href={AppRoutes.AdminManageCategories}>الأقسام</Link>,
    AppRoutes.AdminManageCategories,
    <AppstoreFilled className="blue" />,
    [
      getItem(
        <Link href={AppRoutes.AdminManageBlogs}>التدوينات</Link>,
        AppRoutes.AdminManageBlogs
      ),
      getItem(
        <Link href={AppRoutes.AdminManageComments}>التعليقات</Link>,
        AppRoutes.AdminManageComments
      ),
    ]
  ),
  getItem(
    <Link href={AppRoutes.AdminManageSettings}>الإعدادات</Link>,
    AppRoutes.AdminManageSettings,
    <SettingFilled className="blue" />,
    [
      getItem(
        <Link href={AppRoutes.AdminManagePages}>صفحات الموقع</Link>,
        AppRoutes.AdminManagePages
      ),
      getItem(
        <Link href={AppRoutes.AdminManageProfile}>البيانات الشخصية</Link>,
        AppRoutes.AdminManageProfile
      ),
    ]
  ),
  getItem(
    <Link href={AppRoutes.SignOut}>تسجيل الخروج</Link>,
    AppRoutes.SignOut,
    <LogoutOutlined className="blue" />
  ),
];

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  return (
    <Layout>
      <StyledHeader>
        <Logo />
        {createElement(collapsed ? MenuFoldOutlined : MenuUnfoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </StyledHeader>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[router.pathname]}
            openKeys={[
              AppRoutes.AdminManageDashboard,
              AppRoutes.AdminManageCategories,
              AppRoutes.AdminManageSettings,
            ]}
            items={items}
          />
        </Sider>
        <StyledContent>{children}</StyledContent>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default DashboardLayout;
