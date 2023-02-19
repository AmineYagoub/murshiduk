import Link from 'next/link';

import { AppRoutes, mq } from '../utils';
import styled from '@emotion/styled';
import { MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, Button, Drawer } from 'antd';
import { useRouter } from 'next/router';
import { useApp } from '@/hooks/app/query.hook';
import { StyledContent } from './DashboardLayout';
import BlogFooter from '@/components/partials/BlogFooter';

import Logo from '@/components/common/Logo';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import WhatsAppButton from '@/components/partials/WhatsAppButton';
import { useState } from 'react';

const { Header } = Layout;

const menu: MenuProps['items'] = [
  {
    key: AppRoutes.Home,
    label: <Link href={AppRoutes.Home}>الرئيسية</Link>,
  },
  {
    key: AppRoutes.Blog,
    label: <Link href={AppRoutes.Blog}>المدونة</Link>,
  },
  {
    key: AppRoutes.Contact,
    label: <Link href={AppRoutes.Contact}>تواصل معي</Link>,
  },
];

const sideMenu = [
  ...menu,
  {
    key: AppRoutes.About,
    label: <Link href={AppRoutes.About}>حول الموقع</Link>,
  },
  {
    key: AppRoutes.Privacy,
    label: <Link href={AppRoutes.Privacy}>سياسة الخصوصية</Link>,
  },
  {
    key: AppRoutes.Terms,
    label: <Link href={AppRoutes.Terms}>الشروط و الأحكام</Link>,
  },
];

export const StyledHeader = styled(Header)(
  mq({
    backgroundColor: 'transparent !important',
    position: 'relative',
    display: 'flex',
    justifyContent: ['center', 'center', 'normal'],
    alignItems: 'center',
    marginBottom: '2em',
    img: {
      width: ['210px', '250px', 'inherit'],
      height: ['55px', '65px', 'inherit'],
      padding: ['3px', '3px', '5px'],
    },
    nav: {
      width: '100%',
      display: ['none', 'none', 'block'],
    },
    ul: {
      backgroundColor: 'transparent !important',
      margin: '0 2em',
    },
    button: {
      background: 'linear-gradient(to right, #29323c, #485563, #29323c)',
      color: '#fff',
      position: 'absolute',
      left: 15,
      display: ['block', 'block', 'none'],
    },
  })
);
export const StyledBlogContent = styled(StyledContent)({
  backgroundColor: 'transparent',
});

const BlogLayout = ({
  children,
  showHeader = true,
}: {
  children: EmotionJSX.Element;
  showHeader?: boolean;
}) => {
  const router = useRouter();
  const { data, isLoading } = useApp();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      {showHeader && (
        <StyledHeader>
          <Button
            icon={<MenuFoldOutlined />}
            shape="circle"
            size="large"
            onClick={showDrawer}
          />
          <Logo />
          <nav>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={[AppRoutes.Home]}
              selectedKeys={[router.pathname]}
              items={menu}
            />
          </nav>
        </StyledHeader>
      )}
      <StyledBlogContent>{children}</StyledBlogContent>
      <WhatsAppButton data={data} isLoading={isLoading} />
      <BlogFooter siteData={data} />
      <Drawer
        title={<Logo />}
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
      >
        <nav>
          <Menu
            theme="light"
            mode="vertical"
            defaultSelectedKeys={[AppRoutes.Home]}
            selectedKeys={[router.pathname]}
            items={sideMenu}
          />
        </nav>
      </Drawer>
    </Layout>
  );
};

export default BlogLayout;
