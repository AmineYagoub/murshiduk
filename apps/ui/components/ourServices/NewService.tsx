import { ServiceType } from '@/utils/types';
import { PlusOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { TableCreateBtn } from '../common/CreateBtn';
import OurServiceForm from './OurServiceForm';

const NewService: FC<{ type: ServiceType }> = ({ type }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <TableCreateBtn
        icon={<PlusOutlined />}
        type="primary"
        size="middle"
        onClick={showDrawer}
        ghost
      >
        إضافة جديد
      </TableCreateBtn>

      <OurServiceForm onClose={onClose} open={visible} type={type} />
    </>
  );
};

export default NewService;
