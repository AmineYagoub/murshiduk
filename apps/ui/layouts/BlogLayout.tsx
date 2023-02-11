import Link from 'next/link';
import mobile from 'is-mobile';
import { AppRoutes } from '../utils';
import styled from '@emotion/styled';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { useApp } from '@/hooks/app/query.hook';
import { StyledContent } from './DashboardLayout';
import BlogFooter from '@/components/partials/BlogFooter';
import PhoneIcon from '@/components/common/icons/PhoneIcon';
import WhatsAppIcon from '@/components/common/icons/WhatsAppIcon';
import { FloatButton, Layout, Menu, Button, Popover } from 'antd';
import MessengerIcon from '@/components/common/icons/MessengerIcon';
import { WhatsAppOutlined, LoadingOutlined } from '@ant-design/icons';
import Logo from '@/components/common/Logo';

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

const BlogLayout = ({ children }) => {
  const router = useRouter();
  const { data, isLoading } = useApp();

  return (
    <Layout>
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
      <StyledBlogContent>{children}</StyledBlogContent>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        icon={isLoading ? <LoadingOutlined /> : <WhatsAppOutlined />}
      >
        {mobile() ? (
          <Button
            icon={<PhoneIcon />}
            type="link"
            href={`tel:${data?.whatsApp}`}
          />
        ) : (
          <Popover
            content={<b dir="ltr">{data?.whatsApp}</b>}
            title="تواصل مباشرة معنا"
            trigger="hover"
            placement="topLeft"
          >
            <Button icon={<PhoneIcon />} type="text" />
          </Popover>
        )}

        <Button
          href={`https://api.whatsapp.com/send/?phone=${data?.whatsApp.replace(
            /\D/g,
            ''
          )}&text&type=phone_number&app_absent=0`}
          icon={<WhatsAppIcon />}
          type="link"
        />
        {data?.messengerId && (
          <Button
            icon={<MessengerIcon />}
            href={`https://m.me/${data.messengerId}`}
            type="link"
          />
        )}
      </FloatButton.Group>
      <BlogFooter siteData={data} />
    </Layout>
  );
};

export default BlogLayout;
