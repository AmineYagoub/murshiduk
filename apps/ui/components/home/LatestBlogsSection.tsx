import { useBlogs } from '@/hooks/blog/query.hook';
import { getFirstImageFromContent } from '@/utils/index';
import styled from '@emotion/styled';
import { Col, Divider, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const StyledSection = styled('section')({
  minHeight: '100vh',
  textAlign: 'center',
  color: '#122639',
  padding: 50,
  h3: {
    fontSize: 'clamp(0.8rem, 3vw, 1rem)',
  },
  h4: {
    fontSize: 'clamp(2rem, 10vw, 4rem)',
    marginBottom: '2em auto',
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
      color: 'inherit',
    },
  },
});

const LatestBlogsSection = () => {
  const { data } = useBlogs();
  const items = data?.slice(0, 2);
  return (
    <StyledSection>
      <h3>قم بزيارة المدونة لتحصل على لمحة عما يمكنك تجربته</h3>
      <h4>آخر التدوينات</h4>
      <Row justify="center">
        {items?.map((el) => (
          <Col sm={24} lg={10} md={12} key={el.id}>
            <figure>
              <Image
                src={
                  getFirstImageFromContent(el.content) || '/img/no-image.svg'
                }
                height={500}
                width={350}
                alt={el.title}
                className="travel__blog-img"
              />
              <figcaption>
                <Link href={`/blog/${el.slug}`}>
                  <h5>{el.title}</h5>
                </Link>

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
