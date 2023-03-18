import { Button, Col, Row } from 'antd';
import { AppRoutes, mq } from '@/utils/index';
import styled from '@emotion/styled';
import Link from 'next/link';

export const StyledSection = styled('section')(
  mq({
    backgroundColor: '#c9e8e0',
    backgroundImage: "url('/img/layered-bg.svg')",
    backgroundSize: 'contain',
    position: 'relative',
    width: '100%',
    height: '100vh',
    textAlign: 'center',
    color: '#fff',
    padding: '3em',
    maxHeight: 700,
    h1: {
      fontSize: 'clamp(1.3rem, 5vw, 3rem)',
      lineHeight: 1.6,
      fontWeight: 'bold',
    },

    p: {
      lineHeight: 1.9,
      margin: '2em auto',
      fontSize: 'clamp(0.9rem, 4vw, 1rem)',
    },
    button: {
      padding: '0 4em !important',
      backgroundImage: 'linear-gradient(to top, #0baa7d 0%, #c9e8e0 100%)',
      border: 'none',
      color: '#232526',
    },
  })
);

const WhyUsSection = ({ content }: { content: string }) => {
  return (
    <StyledSection id="why-us">
      <Row align="middle">
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <h1>لماذا تختارنا ؟</h1>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <p>{content}</p>
          <Link href={AppRoutes.Contact}>
            <Button type="ghost" size="large">
              تواصل معنا
            </Button>
          </Link>
        </Col>
      </Row>
    </StyledSection>
  );
};

export default WhyUsSection;
