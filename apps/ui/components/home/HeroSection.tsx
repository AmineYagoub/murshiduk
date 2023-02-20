import styled from '@emotion/styled';
import { Carousel } from 'antd';
import Image from 'next/image';
import { memo, useEffect } from 'react';
const StyledCarousel = styled(Carousel)({
  width: '100%',
  height: '100vh',
  position: 'relative',
  img: {
    height: '100vh !important',
  },
});
const HeroSection = ({ images }: { images: string[] }) => {
  return (
    <StyledCarousel autoplay fade>
      {images.map((el) => (
        <Image
          key={el}
          src={el}
          width={1600}
          height={1100}
          sizes="100vw"
          alt=""
        />
      ))}
    </StyledCarousel>
  );
};

export default memo(HeroSection);
