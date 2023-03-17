import { mq } from '../utils';
import { useState } from 'react';
import styled from '@emotion/styled';
import Logo from '@/components/common/Logo';
import { Layout, Button, Drawer } from 'antd';
import { useApp } from '@/hooks/app/query.hook';
import { StyledContent } from './DashboardLayout';
import { MenuFoldOutlined } from '@ant-design/icons';
import BlogFooter from '@/components/partials/BlogFooter';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import WhatsAppButton from '@/components/partials/WhatsAppButton';
import Navigation, {
  menuItems,
  sideMenuItems,
} from '@/components/common/Navigation';

const { Header } = Layout;

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
      {showHeader && <Navigation mode="horizontal" items={menuItems} />}
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
