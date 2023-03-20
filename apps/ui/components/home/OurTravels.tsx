import { mq } from '@/utils/index';
import styled from '@emotion/styled';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useServices } from '@/hooks/ourService/query.hook';
import ShowServiceCard from '../ourServices/ShowServiceCard';
import isMobile from 'is-mobile';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const StyledSection = styled('section')(
  mq({
    backgroundColor: '#1cafbf',
    position: 'relative',
    width: '100%',
    color: '#122639',
    maxHeight: 1500,
    textAlign: 'center',
    padding: '3em',

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

const OurTravels = () => {
  const { data } = useServices('TRAVEL');
  return (
    <StyledSection id="our-travels">
      <h2>رحلاتنا السياحية</h2>

      <Carousel
        infinite
        responsive={responsive}
        partialVisible
        slidesToSlide={1}
        deviceType={
          isMobile()
            ? 'mobile'
            : isMobile({ tablet: true })
            ? 'tablet'
            : 'desktop'
        }
      >
        {data.map((el) => (
          <ShowServiceCard key={el.id} service={el} />
        ))}
      </Carousel>
    </StyledSection>
  );
};

export default OurTravels;
