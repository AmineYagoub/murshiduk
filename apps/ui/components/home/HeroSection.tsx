import styled from '@emotion/styled';
import React from 'react';

const StyledSection = styled('section')({
  height: '100vh',
  position: 'relative',
  width: '100%',

  canvas: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});

const HeroSection = () => {
  return (
    <section id="canvas-wrapper" data-canvas-wrapper>
      HeroSection
    </section>
  );
};

export default HeroSection;
