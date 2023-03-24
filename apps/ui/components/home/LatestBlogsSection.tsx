import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import isMobile from 'is-mobile';
import { Button, Card } from 'antd';
import styled from '@emotion/styled';
import Carousel from 'react-multi-carousel';
import { useBlogs } from '@/hooks/blog/query.hook';
import { getFirstImageFromContent } from '@/utils/index';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 5,
    slidesToSlide: 5,
  },
  laptop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const StyledSection = styled('section')({
  textAlign: 'center',
  backgroundColor: '#122639',
  color: '#f3b91d',
  padding: 50,
  backgroundImage: "url('/img/waves-background.svg')",
  backgroundSize: 'cover',
  h3: {
    fontSize: 'clamp(0.8rem, 3vw, 1rem)',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 'clamp(2rem, 10vw, 4rem)',
    marginBottom: '1em',
    fontWeight: 'bold',
  },
  figure: {
    overflow: 'hidden',
    figcaption: {
      fontSize: '1.8rem',
      margin: '65px auto',
      maxWidth: 250,
    },
    img: {
      objectFit: 'cover',
      height: 'clamp(500px, 50vw, 600px)',
      width: 'clamp(300px, 30vw, 400px)',
    },
    h5: {
      fontSize: 'clamp(1rem, 10vw, 1.5rem)',
    },
  },
});

const LatestBlogsSection = () => {
  const { data } = useBlogs();

  return (
    <StyledSection>
      <h3>قم بزيارة المدونة لتحصل على لمحة عما يمكنك تجربته</h3>
      <h4>آخر التدوينات</h4>
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
          <Card
            key={el.id}
            style={{ maxWidth: 350, height: 400 }}
            cover={
              <Image
                alt={el.title}
                src={
                  getFirstImageFromContent(el.content) || '/img/no-image.svg'
                }
                width={350}
                height={350}
              />
            }
          >
            <Card.Meta
              title={el.title}
              description={`${el.descriptionMeta.slice(0, 100)} ... `}
            />
            <Link href={`/blog/${el.slug}`}>
              <Button
                type="primary"
                style={{
                  padding: '0 1.5em',
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translate(-50%, 0)',
                }}
              >
                طالع أكثر
              </Button>
            </Link>
          </Card>
        ))}
      </Carousel>
    </StyledSection>
  );
};

export default memo(LatestBlogsSection);
