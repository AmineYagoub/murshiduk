import styled from '@emotion/styled';
import Script from 'next/script';

const StyledDiv = styled('article')({
  textAlign: 'center',
  margin: '1em auto',
});

const TwitterButton = () => {
  return (
    <StyledDiv>
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
    </StyledDiv>
  );
};

export default TwitterButton;
