import { Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { Blog } from '@/hooks/blog/query.hook';

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
