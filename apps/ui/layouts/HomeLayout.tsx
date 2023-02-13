import BlogFooter from '@/components/partials/BlogFooter';
import WhatsAppButton from '@/components/partials/WhatsAppButton';
import { Layout } from 'antd';

const { Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout>
      <Content style={{ zIndex: 0 }}>{children}</Content>
      <WhatsAppButton data={{}} isLoading={false} />
      <BlogFooter siteData={{}} />
    </Layout>
  );
};

export default HomeLayout;
