import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import isMobile from 'is-mobile';
import { Button, Card } from 'antd';
import styled from '@emotion/styled';
import { getFirstImageFromContent } from '@/utils/index';

const StyledSection = styled('section')({
  textAlign: 'center',
  backgroundColor: '#122639',
  color: '#f3b91d',
  padding: 10,
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
  img: {
    blockSize: '200px !important',
  },
});

const LatestBlogsSection = ({ data }) => {
  return (
    <StyledSection>
      <h3>قم بزيارة المدونة لتحصل على لمحة عما يمكنك تجربته</h3>
      <h4>آخر التدوينات</h4>
      <swiper-container
        navigation
        space-between="1"
        slides-per-view={isMobile() ? '1' : screen.width <= 1366 ? '3' : '5'}
        free-mode="true"
        grab-cursor="true"
        centered-slides="true"
        centered-slides-bounds="true"
        round-lengths="true"
      >
        {data.map((el) => (
          <swiper-slide key={el.id}>
            <Card
              style={{ width: 350, height: 400 }}
              cover={
                <Image
                  alt={el.title}
                  src={
                    getFirstImageFromContent(el.content) || '/img/no-image.svg'
                  }
                  width={350}
                  height={350}
                  loader={() =>
                    getFirstImageFromContent(el.content) || '/img/no-image.svg'
                  }
                />
              }
            >
              <Card.Meta
                title={el.title}
                description={`${el.descriptionMeta.slice(0, 100)} ... `}
              />
              <Link
                href={`/blog/${el.slug}`}
                rel="noopener noreferrer"
                target="_blank"
              >
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
          </swiper-slide>
        ))}
      </swiper-container>
    </StyledSection>
  );
};

export default memo(LatestBlogsSection);
