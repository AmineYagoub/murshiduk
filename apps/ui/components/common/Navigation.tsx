import { AppRoutes } from '@/utils/AppRoutes';
import { Layout, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';

export const menuItems: MenuProps['items'] = [
  {
    key: AppRoutes.Home,
    label: <Link href={AppRoutes.Home}>الرئيسية</Link>,
  },
  {
    key: AppRoutes.About,
    label: <Link href={AppRoutes.About}>من نحن</Link>,
  },
  {
    key: AppRoutes.Services,
    label: <Link href={AppRoutes.Services}>خدماتنا</Link>,
  },
  {
    key: AppRoutes.Programs,
    label: <Link href={AppRoutes.Programs}>رحلاتنا</Link>,
  },
  {
    key: AppRoutes.Blog,
    label: <Link href={AppRoutes.Blog}>المدونة</Link>,
  },
  {
    key: AppRoutes.Contact,
    label: <Link href={AppRoutes.Contact}>تواصل معنا</Link>,
  },
];

export const sideMenuItems: MenuProps['items'] = [
  ...menuItems,

  {
    key: AppRoutes.Privacy,
    label: <Link href={AppRoutes.Privacy}>سياسة الخصوصية</Link>,
  },
  {
    key: AppRoutes.Terms,
    label: <Link href={AppRoutes.Terms}>الشروط و الأحكام</Link>,
  },
];

const { Header } = Layout;

const Navigation = ({
  mode,
  items,
}: {
  mode?: 'horizontal' | 'inline' | 'vertical';
  items: MenuProps['items'];
}) => {
  const router = useRouter();
  return (
    <Header style={{ zIndex: 100, display: 'flex' }}>
      <Logo />
      <Menu
        style={{ marginRight: 10 }}
        theme="dark"
        mode={mode}
        defaultSelectedKeys={[AppRoutes.Home]}
        selectedKeys={[router.pathname]}
        items={items}
      />
    </Header>
  );
};

export default Navigation;
