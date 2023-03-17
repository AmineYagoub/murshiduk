import { mq } from '../utils';
import { useState } from 'react';
import styled from '@emotion/styled';
import Logo from '@/components/common/Logo';
import { Button, Drawer, Layout } from 'antd';
import { useApp } from '@/hooks/app/query.hook';
import { MenuFoldOutlined } from '@ant-design/icons';
import BlogFooter from '@/components/partials/BlogFooter';
import WhatsAppButton from '@/components/partials/WhatsAppButton';
import Navigation, {
  sideMenuItems,
  menuItems,
} from '@/components/common/Navigation';

const { Content } = Layout;

const StyledButton = styled(Button)(
  mq({
    background: 'linear-gradient(to right, #29323c, #485563, #29323c)',
    color: '#fff',
    position: 'fixed',
    left: 15,
    top: 20,
    display: ['block', 'block', 'none'],
    zIndex: 1000,
  })
);

const HomeLayout = ({ children }) => {
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
      <Content style={{ zIndex: 0, overflow: 'hidden' }}>{children}</Content>
      <WhatsAppButton data={data} isLoading={isLoading} />
      <BlogFooter siteData={data} color="opa" />
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

export default HomeLayout;
