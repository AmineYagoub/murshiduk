import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TableCreateBtn } from '../common/CreateBtn';
import OurServiceForm from './OurServiceForm';

const NewService = () => {
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
        إضافة خدمة
      </TableCreateBtn>

      <OurServiceForm onClose={onClose} open={visible} />
    </>
  );
};

export default NewService;
