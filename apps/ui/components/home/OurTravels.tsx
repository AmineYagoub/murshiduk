import { mq } from '@/utils/index';
import styled from '@emotion/styled';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useServices } from '@/hooks/ourService/query.hook';
import ShowServiceCard from '../ourServices/ShowServiceCard';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 3,
    slidesToSlide: 2,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 200,
    },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 30,
  },
};

export const StyledSection = styled('section')(
  mq({
    backgroundColor: '#c9e8e0',
    position: 'relative',
    width: '100%',
    color: '#00b96b',
    maxHeight: 1500,
    textAlign: 'center',
    padding: '3em',

    h2: {
      fontSize: 'clamp(1.3rem, 5vw, 2.5rem)',
      lineHeight: 1.6,
      fontWeight: 'bold',
      marginBottom: 50,
    },
    img: {
      objectFit: 'cover',
      minHeight: 350,
    },

    '.ant-card-meta-title': {
      color: '#00b96b',
    },
  })
);

const OurTravels = () => {
  const { data } = useServices('TRAVEL');
  return (
    <StyledSection id="our-travels">
      <h2>رحلاتنا السياحية</h2>

      <Carousel
        ssr
        infinite
        responsive={responsive}
        partialVisible
        slidesToSlide={1}
      >
        {data.map((el) => (
          <ShowServiceCard key={el.id} service={el} />
        ))}
      </Carousel>
    </StyledSection>
  );
};

export default OurTravels;
