import mobile from 'is-mobile';
import PhoneIcon from '@/components/common/icons/PhoneIcon';
import WhatsAppIcon from '@/components/common/icons/WhatsAppIcon';
import { FloatButton, Button, Popover } from 'antd';
import MessengerIcon from '@/components/common/icons/MessengerIcon';
import { WhatsAppOutlined, LoadingOutlined } from '@ant-design/icons';
import { App } from '@/utils/types';

const WhatsAppButton = ({
  data,
  isLoading,
}: {
  data: App;
  isLoading: boolean;
}) => {
  return data?.whatsApp ? (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      icon={isLoading ? <LoadingOutlined /> : <WhatsAppOutlined />}
    >
      {mobile() ? (
        <Button
          icon={<PhoneIcon />}
          type="link"
          href={`tel:${data.whatsApp}`}
        />
      ) : (
        <Popover
          content={<b dir="ltr">{data.whatsApp}</b>}
          title="تواصل مباشرة معنا"
          trigger="hover"
          placement="topLeft"
        >
          <Button icon={<PhoneIcon />} type="text" />
        </Popover>
      )}

      <Button
        href={`https://api.whatsapp.com/send/?phone=${data.whatsApp.replace(
          /\D/g,
          ''
        )}&text&type=phone_number&app_absent=0`}
        icon={<WhatsAppIcon />}
        type="link"
      />
      {data?.messengerId && (
        <Button
          icon={<MessengerIcon />}
          href={`https://m.me/${data.messengerId}`}
          type="link"
        />
      )}
    </FloatButton.Group>
  ) : null;
};

export default WhatsAppButton;
