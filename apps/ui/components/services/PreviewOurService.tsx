import { Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import type { Service } from '@/utils/types';
import { getServiceLink } from '@/utils/index';

const PreviewOurService = ({ record }: { record: Service }) => {
  return (
    <Button
      shape="circle"
      icon={<LinkOutlined style={{ color: 'blue' }} />}
      type="primary"
      ghost
      href={getServiceLink(record)}
    />
  );
};

export default PreviewOurService;
