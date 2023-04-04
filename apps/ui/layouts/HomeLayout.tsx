import { mq } from '../utils';
import { useState } from 'react';
import styled from '@emotion/styled';
import Logo from '@/components/common/Logo';
import { Button, Drawer, Layout } from 'antd';
import { useApp } from '@/hooks/app/query.hook';
import { MenuFoldOutlined, CloseOutlined } from '@ant-design/icons';
import BlogFooter from '@/components/partials/BlogFooter';
import WhatsAppButton from '@/components/partials/WhatsAppButton';
import Navigation, {
  sideMenuItems,
  menuItems,
} from '@/components/common/Navigation';
const { Content } = Layout;

export const StyledButton = styled(Button)(
  mq({
    background: 'linear-gradient(to right, #29323c, #485563, #29323c)',
    color: '#f3b91d',
    position: 'fixed',
    left: 15,
    top: 12,
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
      <BlogFooter siteData={data} />
      <Drawer
        title={<Logo />}
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        headerStyle={{ backgroundColor: '#122639' }}
        closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: 16 }} />}
      >
        <Navigation mode="vertical" items={sideMenuItems} onSelect={onClose} />
      </Drawer>
    </Layout>
  );
};

export default HomeLayout;
