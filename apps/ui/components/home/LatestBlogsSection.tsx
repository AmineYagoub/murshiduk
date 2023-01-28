import styled from '@emotion/styled';
import { Col, Divider, Row } from 'antd';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const StyledSection = styled('section')({
  minHeight: '100vh',
  textAlign: 'center',
  color: '#123524',
  padding: '7em',
  h4: {
    fontSize: '4.5rem',
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
});

const LatestBlogsSection = () => {
  useEffect(() => {
    gsap.to('.travel__blog-img', {
      scrollTrigger: {
        trigger: '.travel__blog-img',
        toggleActions: 'restart pause reverse pause',
        // pin: true,
        // pinSpacing:false,
        scrub: 1,
        start: 'top bottom',
        end: 'center top',
      },
      y: -100,
      height: 600,
      ease: 'none',
    });
  }, []);
  return (
    <StyledSection>
      <h3>أحصل على لمحة عما يمكنك تجربته</h3>
      <h4>قصص ملهمة</h4>
      <Row justify="center">
        <Col span={10}>
          <figure>
            <Image
              src="/img/swimer-man.jpg"
              height={500}
              width={350}
              alt="أفضل اماكن الغوص في تركيا"
              className="travel__blog-img"
            />
            <figcaption>
              أفضل اماكن الغوص في تركيا
              <Divider orientation="right">
                <Link href="/">طالع المزيد</Link>
              </Divider>
            </figcaption>
          </figure>
        </Col>
        <Col span={10}>
          <figure>
            <Image
              src="/img/cappadocia-hotels.jpg"
              height={500}
              width={350}
              alt="أفضل اماكن الغوص في تركيا"
              className="travel__blog-img"
            />

            <figcaption>
              تعرف على فنادق كابادوكيا
              <Divider orientation="right">
                <Link href="/">طالع المزيد</Link>
              </Divider>
            </figcaption>
          </figure>
        </Col>
      </Row>
    </StyledSection>
  );
};

export default LatestBlogsSection;
