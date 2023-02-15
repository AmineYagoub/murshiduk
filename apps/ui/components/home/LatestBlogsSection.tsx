import { useBlogs } from '@/hooks/blog/query.hook';
import styled from '@emotion/styled';
import { Col, Divider, Row } from 'antd';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect } from 'react';

const StyledSection = styled('section')({
  minHeight: '100vh',
  textAlign: 'center',
  color: '#fff',

  h4: {
    fontSize: 'clamp(2rem, 10vw, 4.5rem)',
    marginBottom: '2em auto',
  },
  figure: {
    overflow: 'hidden',
    figcaption: {
      fontSize: '1.8rem',
      margin: '0 auto',
      maxWidth: 250,
    },
    img: {
      objectFit: 'cover',
      height: 'clamp(500px, 50vw, 600px)',
      width: 'clamp(300px, 30vw, 400px)',
    },
    h6: {
      fontSize: 'clamp(1rem, 10vw, 1.5rem)',
    },
  },
  '.ant-col': {
    ':first-of-type': {
      transform: 'rotateZ(-5deg) translateY(80px)',
      figcaption: {
        transform: 'rotateZ(5deg) translateY(-50px)',
      },
    },
    ':last-of-type': {
      transform: 'rotateZ(2deg)',
      figcaption: {
        transform: 'rotateZ(-2deg) translateY(-50px)',
      },
    },
  },
  '.ant-divider': {
    ':before': {
      border: '1px solid #ccc',
    },
    a: {
      color: '#ccc',
    },
  },
});

const LatestBlogsSection = () => {
  const { data } = useBlogs();
  const items = data?.slice(0, 2);
  useEffect(() => {
    gsap.to('.travel__blog-img', {
      scrollTrigger: {
        trigger: '.travel__blog-img',
        toggleActions: 'restart pause reverse pause',
        scrub: 1,
        start: 'top bottom',
        end: 'center top',
      },
      y: -100,
      ease: 'none',
    });
  }, []);
  return (
    <StyledSection>
      <h3>قم بزيارة المدونة لتحصل على لمحة عما يمكنك تجربته</h3>
      <h4>قصص ملهمة</h4>
      <Row justify="center">
        {items?.map((el) => (
          <Col sm={24} lg={10} md={12} style={{ marginBottom: 50 }} key={el.id}>
            <figure>
              <Image
                src="/img/swimer-man.jpg"
                height={500}
                width={350}
                alt={el.title}
                className="travel__blog-img"
              />
              <figcaption>
                <h6>{el.title}</h6>
                <Divider orientation="right">
                  <Link href={`/blog/${el.slug}`}>طالع المزيد</Link>
                </Divider>
              </figcaption>
            </figure>
          </Col>
        ))}
      </Row>
    </StyledSection>
  );
};

export default memo(LatestBlogsSection);
