import { baseS3Url } from '@/utils/index';
import { CarouselEl } from '@/utils/types';
import styled from '@emotion/styled';
import { Carousel } from 'antd';
import { memo } from 'react';
const StyledCarousel = styled(Carousel)({
  width: '100%',
  height: '100vh',
  position: 'relative',
  img: {
    height: '100vh !important',
  },
});

const HeroSection = ({ images }: { images: CarouselEl[] }) => {
  return (
    <StyledCarousel autoplay fade>
      {images.map((el, i) => (
        <img
          key={i}
          src={`${baseS3Url}/${el.lg}`}
          alt="مرشد سياحي في تركيا"
          srcSet={`${baseS3Url}/${el.sm} 480w, ${baseS3Url}/${el.md} 800w`}
          sizes="(max-width: 600px) 480px, 100vw"
        />
      ))}
    </StyledCarousel>
  );
};

export default memo(HeroSection);
