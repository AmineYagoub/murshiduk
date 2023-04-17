import { memo } from 'react';
import { Carousel } from 'antd';
import styled from '@emotion/styled';
import { baseS3Url } from '@/utils/index';
import { CarouselEl } from '@/utils/types';

const StyledCarousel = styled(Carousel)({
  width: '100%',
  height: '100vh',
  position: 'relative',
  img: {
    height: '100vh !important',
    objectFit: 'fill',
  },
  '.slick-list': {
    width: '100%',
    height: '100vh',
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
