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
  {
    /* <StyledDiv>
      <a
        href="https://twitter.com/intent/tweet?screen_name=TwitterDev&ref_src=twsrc%5Etfw"
        className="twitter-mention-button"
        data-size="large"
        data-lang="ar"
        data-show-count="false"
      >
        Tweet to @TwitterDev
      </a>
      <Script async src="https://platform.twitter.com/widgets.js"></Script>
    </StyledDiv> */
  }
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
