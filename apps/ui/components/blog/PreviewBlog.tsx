import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const PreviewBlog = () => {
  return (
    <Button
      shape="circle"
      icon={<EyeOutlined style={{ color: '#6f31a0' }} />}
      type="primary"
      ghost
    />
  );
};

export default PreviewBlog;
