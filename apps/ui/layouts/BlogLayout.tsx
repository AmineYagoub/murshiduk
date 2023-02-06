import { FloatButton, Layout, Menu, Button, Popover } from 'antd';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { StyledContent } from './DashboardLayout';
import styled from '@emotion/styled';
import { WhatsAppOutlined } from '@ant-design/icons';
import MessengerIcon from '@/components/common/icons/MessengerIcon';
import WhatsAppIcon from '@/components/common/icons/WhatsAppIcon';
import PhoneIcon from '@/components/common/icons/PhoneIcon';

const { Header, Footer } = Layout;

const menu: MenuProps['items'] = [
  {
    key: '1',
    label: 'الرئيسية',
  },
  {
    key: '2',
    label: 'المدونة',
  },
  {
    key: '3',
    label: 'تواصل معي',
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

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const BlogLayout = ({ children }) => {
  return (
    <Layout>
      <StyledHeader>
        <Image
          src="https://img.logoipsum.com/264.svg"
          alt="logo"
          width={150}
          height={60}
        />
        <nav>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={menu}
          />
        </nav>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        icon={<WhatsAppOutlined />}
      >
        <Popover content={content} title="Title" trigger="hover">
          <Button icon={<PhoneIcon />} type="text" />
        </Popover>

        <Button
          href="https://api.whatsapp.com/send/?phone=21305455878&text&type=phone_number&app_absent=0"
          icon={<WhatsAppIcon />}
          type="link"
        />
        <Button
          icon={<MessengerIcon />}
          href="https://m.me/5558456958"
          type="link"
        />
      </FloatButton.Group>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default BlogLayout;
