import { baseS3Url } from '@/utils/index';
import { Input, InputProps } from 'antd';

const UrlInput = (props: InputProps) => {
  return (
    <Input
      addonAfter={`/${baseS3Url}`}
      style={{
        textAlign: 'left',
      }}
      {...props}
    />
  );
};

export default UrlInput;
