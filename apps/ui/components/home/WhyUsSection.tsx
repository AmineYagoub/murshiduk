import { Button, Col, Row } from 'antd';
import { AppRoutes, mq } from '@/utils/index';
import styled from '@emotion/styled';
import Link from 'next/link';

export const StyledSection = styled('section')(
  mq({
    color: '#fff',
    backgroundImage: "url('/img/layered-bg.svg')",
    backgroundSize: ['cover', 'cover', 'contain'],
    position: 'relative',
    width: '100%',
    height: '80vh',
    textAlign: 'center',
    padding: ['1.5em', '1.5em', '3em'],
    maxHeight: ['', '', 800],
    '.ant-row': {
      maxWidth: 1300,
      margin: '0 auto',
    },
    h1: {
      fontSize: 'clamp(1rem, 5vw, 2.5rem)',
      lineHeight: 1.6,
      fontWeight: 'bold',
      color: '#f3b91d',
    },

    p: {
      lineHeight: 1.9,
      margin: '2em auto',
      fontSize: 'clamp(0.8rem, 3vw, 1rem)',
    },
    button: {
      padding: '0 4em !important',
      backgroundImage: 'linear-gradient(to top, #f3b91d 0%, #eadaaf 100%)',
      border: 'none',
      color: '#122639',
    },
  })
);

const WhyUsSection = ({ content }: { content: string }) => {
  return (
    <StyledSection id="why-us">
      <Row align="middle">
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <h1>لماذا تحتاج منظم ومرشد سياحي لرحلتك ؟</h1>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <p>{content}</p>
          <Link
            href={AppRoutes.Contact}
            rel="noopener noreferrer"
            target="_blank"
          >
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
