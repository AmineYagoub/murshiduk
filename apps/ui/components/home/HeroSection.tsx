import { memo } from 'react';
import { Carousel } from 'antd';
import styled from '@emotion/styled';
import { baseS3Url } from '@/utils/index';
import { CarouselEl } from '@/utils/types';
import Image from 'next/image';
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
        <Image
          fill
          key={i}
          src={isMobile() ? `${baseS3Url}/${el.sm}` : `${baseS3Url}/${el.lg}`}
          loader={() =>
            isMobile() ? `${baseS3Url}/${el.sm}` : `${baseS3Url}/${el.lg}`
          }
          alt="مرشد سياحي في تركيا"
        />
      ))}
    </StyledCarousel>
  );
};

export default memo(HeroSection);
