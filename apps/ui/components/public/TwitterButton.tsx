import styled from '@emotion/styled';
import { Button } from 'antd';
import { TwitterOutlined } from '@ant-design/icons';

const StyledTweet = styled(Button)({
  backgroundColor: '#1d9bf0',
  borderColor: '#1d9bf0',
  marginTop: '2em',
  color: '#fff',
  fontWeight: 'bold',
});

const TwitterButton = ({ twitter }: { twitter: string }) => {
  return (
    <StyledTweet
      block
      href={`https://twitter.com/intent/tweet?screen_name=${twitter}`}
      icon={<TwitterOutlined />}
    >
      غرد على {twitter}
    </StyledTweet>
  );
};

export default TwitterButton;
