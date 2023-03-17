import { Button } from 'antd';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import type { Service } from '@/utils/types';
import OurServiceForm from './OurServiceForm';

const EditService = ({ record }: { record: Service }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        shape="circle"
        icon={<EditOutlined />}
        type="primary"
        ghost
        onClick={showDrawer}
      />
      <OurServiceForm onClose={onClose} open={visible} record={record} />
    </>
  );
};

export default EditService;
