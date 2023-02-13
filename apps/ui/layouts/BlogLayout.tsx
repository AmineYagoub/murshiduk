import Link from 'next/link';

import { AppRoutes } from '../utils';
import styled from '@emotion/styled';
import { Layout, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { useApp } from '@/hooks/app/query.hook';
import { StyledContent } from './DashboardLayout';
import BlogFooter from '@/components/partials/BlogFooter';

import Logo from '@/components/common/Logo';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import WhatsAppButton from '@/components/partials/WhatsAppButton';

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

export const StyledHeader = styled(Header)({
  backgroundColor: 'transparent !important',
  display: 'flex',
  marginBottom: '2em',
  nav: {
    width: '100%',
  },
  ul: {
    backgroundColor: 'transparent !important',
    margin: '0 2em',
  },
});
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

  return (
    <Layout>
      {showHeader && (
        <StyledHeader>
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
    </Layout>
  );
};

export default BlogLayout;
