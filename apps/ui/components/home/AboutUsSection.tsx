import Link from 'next/link';
import Image from 'next/image';
import { Col, Row } from 'antd';
import styled from '@emotion/styled';
import { Bio } from '@/utils/types';
import { AppRoutes, baseS3Url, mq } from '@/utils/index';

export const StyledSection = styled('section')(
  mq({
    backgroundImage: 'linear-gradient(to top, #122639, #004953)',
    color: '#fff',
    position: 'relative',
    width: '100%',
    maxHeight: 1500,
    textAlign: 'center',
    padding: '3em',
    '.travel__desc': {
      maxWidth: 1300,
      margin: '0 auto',
      flexDirection: ['column-reverse', 'column-reverse', 'row'],
    },
    '.travel__desc-main': {
      h1: {
        fontSize: 'clamp(1.5rem, 8vw, 3rem)',
        lineHeight: 1.6,
        fontWeight: 'bold',
        color: '#f3b91d',
      },
      article: {
        lineHeight: 1.8,
        margin: '2em auto',
        fontSize: 'clamp(0.9rem, 4vw, 1rem)',
      },
      a: {
        textAlign: 'right',
        display: 'inherit',
        color: '#f3b91d',
      },
    },

    '.travel__about-img': {
      filter: 'drop-shadow(2px 5px 5px #000)',
      maxWidth: 'clamp(150px, 30vw, 420px)',
      borderRadius: '25% 0',
    },
  })
);

const AboutUsSection = ({ bio }: { bio: Bio[] }) => {
  const first = bio.shift();
  return (
    <StyledSection className="travel__whyUs" id="about-us">
      <Row className="travel__desc">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={10}
          className="travel__desc-main"
        >
          <h1 className="travel__fatih-h3">من نحن ؟</h1>
          <article dangerouslySetInnerHTML={{ __html: first?.content }} />
          <Link
            href={AppRoutes.About}
            rel="noopener noreferrer"
            target="_blank"
          >
            قراءة المزيد ...{' '}
          </Link>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Image
            src={`${baseS3Url}/${first?.image}`}
            width={420}
            height={780}
            alt="مرشد سياحي في تركيا"
            className="travel__about-img"
          />
        </Col>
      </Row>
    </StyledSection>
  );
};

export default AboutUsSection;
