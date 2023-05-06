import { memo } from 'react';
import Image from 'next/image';
import { Col, Row } from 'antd';
import { Bio } from '@/utils/types';
import styled from '@emotion/styled';
import { baseS3Url, mq } from '@/utils/index';
import ContactForm from './ContactForm';

const StyledContainer = styled('section')(
  mq({
    position: 'relative',
    color: '#232526',
    section: {
      maxWidth: 1300,
      margin: '0 auto',
      figure: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '100% 0 0 100%',
      },
      img: {
        maxHeight: '80vh',
        maxWidth: 'clamp(250px, 30vw, 550px)',
      },
      '.ant-row': {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        h2: {
          direction: 'initial',
          fontSize: 'clamp(3rem, 20vw, 7rem)',
          fontWeight: 'bolder',
          margin: 0,
          textAlign: ['center', 'center', 'left'],
          width: '100%',
          color: '#122639',
          textShadow:
            '0 1px 0 #122639,0 2px 0 #99cfd8,0 3px 0 #92d5d5,0 4px 0 #8acfd2,0 5px 0 #83c4cf,0 6px 0 #7cc2cd,0 7px 0 #74c6ca,0 8px 0 #6dc7ba,0 0 5px rgba(128, 255, 0, 0.05),0 -1px 3px rgba(0, 255, 255, 0.2),0 9px 9px rgba(0, 231, 255, 0.3),0 12px 12px rgba(0, 231, 255, 0.3),0 15px 15px rgba(0, 255, 255, 0.3)',
        },
        p: {
          lineHeight: 1.6,
          fontSize: 'clamp(0.7rem, 3.6vw, 1.2rem)',
          maxWidth: ['100%', '100%', '80%', '80%', '70%'],
          marginBottom: 100,
          textAlign: ['center', 'center', 'left'],
        },
      },
    },
    form: {
      maxWidth: 750,
      margin: '1em auto',
    },
  })
);

const TimeLineSection = ({ bio }: { bio: Bio[] }) => {
  return (
    <StyledContainer className="travel__timeLine">
      {bio?.map((el, i) => (
        <section id={`section_${i + 1}`} data-section key={el.year}>
          <Row
            gutter={20}
            style={{ flexDirection: i === 1 ? 'row-reverse' : 'initial' }}
          >
            <Col md={10} xs={24}>
              <figure className="section__figure">
                <Image
                  loader={() => `${baseS3Url}/${el.image}`}
                  src={`${baseS3Url}/${el.image}`}
                  width={550}
                  height={700}
                  alt={String(el.year)}
                />
              </figure>
            </Col>
            <Col md={14} xs={24}>
              <h2>{el.year}</h2>
              <p>{el.content}</p>
            </Col>
          </Row>
        </section>
      ))}
      <ContactForm withAnimation={false} />
    </StyledContainer>
  );
};

export default memo(TimeLineSection);
