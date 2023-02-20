import { AppRoutes } from '@/utils/AppRoutes';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const menuItems: MenuProps['items'] = [
  {
    key: AppRoutes.Home,
    label: <Link href={AppRoutes.Home}>الرئيسية</Link>,
  },
  {
    key: AppRoutes.Blog,
    label: <Link href={AppRoutes.Blog}>المدونة</Link>,
  },
  {
    key: AppRoutes.About,
    label: <Link href={AppRoutes.About}>حول الموقع</Link>,
  },
  {
    key: AppRoutes.Contact,
    label: <Link href={AppRoutes.Contact}>تواصل معي</Link>,
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
  return (
    <nav>
      <Menu
        theme="light"
        mode={mode}
        defaultSelectedKeys={[AppRoutes.Home]}
        selectedKeys={[router.pathname]}
        items={items}
      />
    </nav>
  );
};

export default Navigation;
