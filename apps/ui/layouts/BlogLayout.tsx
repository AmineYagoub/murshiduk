import { useState } from 'react';
import styled from '@emotion/styled';
import { Layout, Drawer } from 'antd';
import Logo from '@/components/common/Logo';
import { useApp } from '@/hooks/app/query.hook';
import { StyledContent } from './DashboardLayout';
import BlogFooter from '@/components/partials/BlogFooter';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import WhatsAppButton from '@/components/partials/WhatsAppButton';
import Navigation, {
  menuItems,
  sideMenuItems,
} from '@/components/common/Navigation';
import { StyledButton } from './HomeLayout';
import { MenuFoldOutlined } from '@ant-design/icons';

export const StyledBlogContent = styled(StyledContent)({
  backgroundColor: 'transparent',
  margin: '0 auto',
});

const BlogLayout = ({ children }: { children: EmotionJSX.Element }) => {
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
      <StyledButton
        icon={<MenuFoldOutlined />}
        shape="circle"
        size="large"
        onClick={showDrawer}
      />
      <Navigation mode="horizontal" items={menuItems} />
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
        <Navigation mode="vertical" items={sideMenuItems} />
      </Drawer>
    </Layout>
  );
};

export default BlogLayout;
