import { StyledHeader } from '@/layout/DashboardLayout';
import { AppRoutes } from '@/utils/AppRoutes';
import { Menu, MenuProps, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';

const scrollToSection = (e) => {
  const el = document.querySelector(e.target.hash) as HTMLDivElement;
  if (el) {
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }
};

export const menuItems: MenuProps['items'] = [
  {
    key: AppRoutes.Home,
    label: <Link href={AppRoutes.Home}>الرئيسية</Link>,
  },
  {
    key: AppRoutes.About,
    label: (
      <Link href="/#about-us" onClick={scrollToSection} scroll={false}>
        من نحن
      </Link>
    ),
  },
  {
    key: AppRoutes.Services,
    label: (
      <Link href="/#our-services" onClick={scrollToSection} scroll={false}>
        خدماتنا
      </Link>
    ),
  },
  {
    key: AppRoutes.Programs,
    label: (
      <Link href="/#our-travels" onClick={scrollToSection} scroll={false}>
        رحلاتنا
      </Link>
    ),
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

const Navigation = ({
  mode,
  items,
}: {
  mode?: 'horizontal' | 'inline' | 'vertical';
  items: MenuProps['items'];
}) => {
  const router = useRouter();
  const {
    token: { colorPrimaryBg },
  } = theme.useToken();
  return (
    <StyledHeader
      style={{ background: colorPrimaryBg, zIndex: 100, display: 'flex' }}
    >
      <Logo />
      <Menu
        style={{ marginRight: 10, backgroundColor: 'transparent' }}
        mode={mode}
        defaultSelectedKeys={[AppRoutes.Home]}
        selectedKeys={[router.pathname]}
        items={items}
      />
    </StyledHeader>
  );
};

export default Navigation;
