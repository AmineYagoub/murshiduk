import BlogFooter from '@/components/partials/BlogFooter';
import WhatsAppButton from '@/components/partials/WhatsAppButton';
import { useApp } from '@/hooks/app/query.hook';
import { Layout } from 'antd';

const { Content } = Layout;

const HomeLayout = ({ children }) => {
  const { data, isLoading } = useApp();
  return (
    <Layout>
      <Content style={{ zIndex: 0, overflowX: 'hidden' }}>{children}</Content>
      <WhatsAppButton data={data} isLoading={isLoading} />
      <BlogFooter siteData={data} color="opa" />
    </Layout>
  );
};

export default HomeLayout;
