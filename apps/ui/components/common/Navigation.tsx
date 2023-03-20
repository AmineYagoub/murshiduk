import Logo from './Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppRoutes } from '@/utils/AppRoutes';
import { Menu, MenuProps, theme } from 'antd';
import { StyledHeader } from '@/layout/DashboardLayout';
import isMobile from 'is-mobile';

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
      <Link href={AppRoutes.About} onClick={scrollToSection} scroll={false}>
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
  onSelect,
}: {
  mode?: 'horizontal' | 'inline' | 'vertical';
  items: MenuProps['items'];
  onSelect?: () => void;
}) => {
  const router = useRouter();

  return mode === 'vertical' ? (
    <Menu
      style={{ marginRight: 10, backgroundColor: 'transparent' }}
      mode={mode}
      defaultSelectedKeys={[AppRoutes.Home]}
      selectedKeys={[router.pathname]}
      items={items}
      onSelect={onSelect}
    />
  ) : (
    <StyledHeader
      style={{
        backgroundImage: 'linear-gradient(to right, #29323c, #122639, #29323c)',
        zIndex: 100,
        display: 'flex',
        justifyContent: isMobile() ? 'center' : 'normal',
      }}
    >
      <Logo />
      {!isMobile() && (
        <Menu
          style={{
            marginRight: 10,
            backgroundColor: 'transparent',
            color: '#fff',
          }}
          mode={mode}
          defaultSelectedKeys={[AppRoutes.Home]}
          selectedKeys={[router.pathname]}
          items={items}
        />
      )}
    </StyledHeader>
  );
};

export default Navigation;
