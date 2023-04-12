import { memo } from 'react';
import Image from 'next/image';
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
      {images.map((el) => (
        <Image
          key={Math.random()}
          src={`${baseS3Url}/${el.lg}`}
          loader={() => `${baseS3Url}/${el.lg}`}
          alt="مرشد سياحي في تركيا"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      ))}
    </StyledCarousel>
  );
};

export default memo(HeroSection);
