import { memo } from 'react';
import { Carousel } from 'antd';
import styled from '@emotion/styled';
import { baseS3Url } from '@/utils/index';
import { CarouselEl } from '@/utils/types';
import isMobile from 'is-mobile';

const StyledCarousel = styled(Carousel)({
  width: '100%',
  height: '100vh',
  position: 'relative',
  marginTop: isMobile() ? 50 : 30,
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
        <picture key={i}>
          <source srcSet={`${baseS3Url}/${el.sm}`} media="(max-width:480px)" />
          <source srcSet={`${baseS3Url}/${el.md}`} media="(max-width:960px)" />
          <source srcSet={`${baseS3Url}/${el.lg}`} media="(min-width:1200px)" />
          <img src={`${baseS3Url}/${el.md}`} alt="مرشد سياحي في تركيا" />
        </picture>
      ))}
    </StyledCarousel>
  );
};

export default memo(HeroSection);
