import { Layout } from 'antd';

const { Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );
};

export default HomeLayout;
