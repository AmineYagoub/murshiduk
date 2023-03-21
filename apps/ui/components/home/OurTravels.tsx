import isMobile from 'is-mobile';
import Carousel from 'react-multi-carousel';
import { StyledSection } from './OurServices';
import { useServices } from '@/hooks/ourService/query.hook';
import ShowServiceCard from '../ourServices/ShowServiceCard';

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
