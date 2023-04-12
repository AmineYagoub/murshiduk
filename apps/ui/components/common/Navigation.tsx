import Logo from './Logo';
import Link from 'next/link';
import isMobile from 'is-mobile';
import { useRouter } from 'next/router';
import { AppRoutes } from '@/utils/AppRoutes';
import { Button, Menu, MenuProps } from 'antd';
import { ServiceType, User } from '@/utils/types';
import { StyledHeader } from '@/layout/DashboardLayout';
import { useAuthState } from '@/hooks/auth/mutation.hook';

const scrollToSection = (e) => {
  const el = document?.querySelector(e.target.hash) as HTMLDivElement;
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
      <Link
        href={`#our-${ServiceType.SERVICE}`}
        onClick={scrollToSection}
        scroll={false}
      >
        خدماتنا
      </Link>
    ),
  },
  {
    key: AppRoutes.Travels,
    label: (
      <Link
        href={`#our-${ServiceType.TRAVEL}`}
        onClick={scrollToSection}
        scroll={false}
      >
        رحلاتنا
      </Link>
    ),
  },
  {
    key: AppRoutes.Programs,
    label: (
      <Link
        href={`#our-${ServiceType.PROGRAM}`}
        onClick={scrollToSection}
        scroll={false}
      >
        برامجنا
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
  const [user] = useAuthState<User>();

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
        zIndex: 100,
        display: 'flex',
        width: '100%',
        justifyContent: isMobile() ? 'center' : 'normal',
        position: 'fixed',
        top: 0,
      }}
    >
      <Logo />
      {!isMobile() && (
        <Menu
          style={{
            marginRight: 10,
            backgroundColor: 'transparent',
            color: '#fff',
            width: '100%',
          }}
          mode={mode}
          defaultSelectedKeys={[AppRoutes.Home]}
          selectedKeys={[router.pathname]}
          items={items}
        />
      )}
      {!isMobile() && user && (
        <Button
          type="primary"
          ghost
          href={AppRoutes.AdminManageDashboard}
          style={{
            position: 'absolute',
            left: 100,
            top: 15,
            color: '#fff',
          }}
        >
          لوحة التحكم
        </Button>
      )}
    </StyledHeader>
  );
};

export default Navigation;
