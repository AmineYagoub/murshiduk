import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>{children}</Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default HomeLayout;
