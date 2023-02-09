import { Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import type { Blog } from '@/utils/types';

const PreviewBlog = ({ record }: { record: Blog }) => {
  return (
    <Button
      shape="circle"
      icon={<LinkOutlined style={{ color: 'blue' }} />}
      type="primary"
      ghost
      href={`/blog/${record.slug}`}
    />
  );
};

export default PreviewBlog;
