import { ThemeConfig } from 'antd/es/config-provider/context';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#f3b91d',
    // colorBgBase: 'cadetblue',
    fontSize: 14,
    borderRadius: 16,
    wireframe: true,
  },
  components: {
    Rate: {
      colorFillContent: '#ccc',
    },
  },
};

export default theme;
