import { Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import type { Service } from '@/utils/types';

const PreviewOurService = ({ record }: { record: Service }) => {
  return (
    <Button
      shape="circle"
      icon={<LinkOutlined style={{ color: 'blue' }} />}
      type="primary"
      ghost
      href={`/our-services/${record.slug}`}
    />
  );
};

export default PreviewOurService;
