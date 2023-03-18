import Link from 'next/link';
import Image from 'next/image';
import { Col, Row } from 'antd';
import styled from '@emotion/styled';
import { AppRoutes, getFirstImageFromContent, mq } from '@/utils/index';

export const StyledSection = styled('section')(
  mq({
    backgroundImage: 'linear-gradient(to top, #123524, #004953)',
    position: 'relative',
    width: '100%',

    maxHeight: 1500,
    textAlign: 'center',
    color: '#fff',
    padding: '3em',
    '.travel__desc-main': {
      h1: {
        fontSize: 'clamp(1.3rem, 5vw, 3rem)',
        lineHeight: 1.6,
        fontWeight: 'bold',
      },
      article: {
        height: 300,
        maxWidth: 400,
        margin: '0 auto',
        overflow: 'clip',
      },
      a: {
        textAlign: 'right',
        display: 'inherit',
        color: 'greenyellow',
      },
      img: {
        ':first-of-type': {
          display: 'none',
        },
      },

      b: {
        lineHeight: 2,
        marginTop: 20,
      },
      p: {
        ':nth-child(2)': {
          display: 'none',
          margin: 0,
        },
        lineHeight: 1.8,
        margin: '2em auto',
        fontSize: 'clamp(0.9rem, 4vw, 1rem)',
      },
    },

    '.travel__about-img': {
      filter: 'drop-shadow(2px 5px 5px #000)',
      maxWidth: 'clamp(150px, 30vw, 420px)',
      borderRadius: '25% 0',
    },
  })
);

const AboutUsSection = ({ content }: { content: string }) => {
  const img = getFirstImageFromContent(content);
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
          <article dangerouslySetInnerHTML={{ __html: content }} />
          <Link href={AppRoutes.About}>قراءة المزيد ... </Link>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Image
            src={img}
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
