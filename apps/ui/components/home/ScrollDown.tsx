import styled from '@emotion/styled';

const StyledBlock = styled('section')({
  position: 'absolute',
  height: 25,
  width: 25,
  bottom: 65,
  right: 'calc(50% - 13px)',
  zIndex: 20,
});

const StyledArrow = styled('div')({
  position: 'absolute',
  width: 28,
  height: 8,
  opacity: 0,

  transform: 'scale3d(0.5, 0.5, 0.5)',
  animation: 'move 3s ease-out infinite',
  ':first-of-type': {
    animation: 'move 3s ease-out 1s infinite',
  },
  ':nth-of-type(2)': {
    animation: 'move 3s ease-out 2s infinite',
  },
  ':before': {
    content: '" "',
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '51%',
    backgroundColor: 'orangered',
    left: 0,
    transform: 'skew(0deg, -30deg)',
  },
  ':after': {
    content: '" "',
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '50%',
    backgroundColor: 'orangered',
    transform: 'skew(0deg, 30deg)',
  },
});

const ScrollDown = () => {
  return (
    <StyledBlock className="travel__scrollDown">
      <StyledArrow />
      <StyledArrow />
      <StyledArrow />
    </StyledBlock>
  );
};

export default ScrollDown;
