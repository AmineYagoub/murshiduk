import { FC } from 'react';
import { mq } from '@/utils/index';
import styled from '@emotion/styled';
import { Service } from '@/utils/types';
import ShowServiceCard from '../services/ShowServiceCard';
import isMobile from 'is-mobile';

export const StyledSection = styled('section')(
  mq({
    backgroundColor: '#122639',
    color: '#f3b91d',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    padding: '3em',
    h1: {
      fontSize: 'clamp(1rem, 5vw, 1.3rem)',
      lineHeight: 1.6,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 'clamp(1.3rem, 6vw, 2.5rem)',
      lineHeight: 1.6,
      fontWeight: 'bold',
      marginBottom: 50,
    },
    img: {
      objectFit: 'cover',
      minHeight: 350,
    },

    '.ant-card-meta-title': {
      color: '#122639',
    },
  })
);

const GridCarousel: FC<{
  data: Service[];
  title: string;
  description: string;
}> = ({ data, title, description }) => {
  return (
    <StyledSection id={`our-${data[0]?.type}`}>
      <h1>{title}</h1>
      <h2>{description}</h2>

      <swiper-container
        navigation
        effect="coverflow"
        space-between={isMobile() ? '1' : '50'}
        slides-per-view={isMobile() ? '1' : '5'}
        grab-cursor="true"
        autoplay-delay="2500"
        centered-slides="true"
        coverflow-effect-rotate="50"
        coverflow-effect-stretch="0"
        coverflow-effect-depth="100"
        coverflow-effect-modifier="1"
        autoplay-disable-on-interaction="false"
      >
        {data.map((el) => (
          <swiper-slide key={el.id}>
            <ShowServiceCard service={el} />
          </swiper-slide>
        ))}
      </swiper-container>
    </StyledSection>
  );
};

export default GridCarousel;
