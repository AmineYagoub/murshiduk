import isMobile from 'is-mobile';
import Carousel from 'react-multi-carousel';
import { responsive, StyledSection } from './OurServices';
import { useServices } from '@/hooks/ourService/query.hook';
import ShowServiceCard from '../ourServices/ShowServiceCard';

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
