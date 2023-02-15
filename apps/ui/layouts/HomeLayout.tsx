import BlogFooter from '@/components/partials/BlogFooter';
import WhatsAppButton from '@/components/partials/WhatsAppButton';
import { useAppState } from '@/hooks/app/mutation.hook';
import { App } from '@/utils/types';
import { Layout } from 'antd';

const { Content } = Layout;

const HomeLayout = ({ children }) => {
  const [appData] = useAppState<App>();
  return (
    <Layout>
      <Content style={{ zIndex: 0 }}>{children}</Content>
      <WhatsAppButton data={appData} isLoading={false} />
      <BlogFooter siteData={appData} />
    </Layout>
  );
};

export default HomeLayout;
