import Image from 'next/image';
import { Col, Row } from 'antd';
import styled from '@emotion/styled';
import { memo, useEffect, useState } from 'react';
import { TimeLineAnimation } from '@/utils/animation/TimeLine';
import { baseS3Url, mq } from '@/utils/index';
import { Bio } from '@/utils/types';

const StyledContainer = styled('section')(
  mq({
    position: 'relative',
    overflowX: 'hidden',
    section: {
      height: '100vh',
      padding: '5em',
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
        '.section__heading': {
          direction: 'initial',
          fontSize: 'clamp(3rem, 20vw, 7rem)',
          fontWeight: 'bolder',
          clipPath: 'polygon(0 0, 100% 0, 110% 100%, 0 100%)',
          lineHeight: '8rem',
          textAlign: 'left',
          width: '100%',
          color: '#fff',
        },
        '.section__heading-char': {
          display: 'inline-block',
          color: '#f1ebe5',
          textShadow:
            '0 1px 0 #dba1a1, 0 2px 0 #d89999, 0 3px 0 #d59292, 0 4px 0 #d28a8a, 0 5px 0 #cf8383, 0 6px 0 #cd7c7c, 0 7px 0 #ca7474, 0 8px 0 #c76d6d, 0 0 5px rgba(230, 139, 139, 0.05), 0 -1px 3px rgba(230, 139, 139, 0.2), 0 9px 9px rgba(230, 139, 139, 0.3), 0 12px 12px rgba(230, 139, 139, 0.3), 0 15px 15px rgba(230, 139, 139, 0.3)',
        },
        p: {
          fontSize: 'clamp(1rem, 5vw, 2rem)',
          color: '#fff',
        },
      },
    },

    '#section_1': {
      backgroundImage: 'linear-gradient(to right, #232526, #414345)',
    },
    '#section_2': {
      backgroundImage: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
    },
    '#section_3': {
      backgroundImage: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    },
    '#section_4': {
      backgroundImage: 'linear-gradient(to right, #606c88, #3f4c6b)',
    },
    '#section_5': {
      backgroundImage: 'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)',
    },
  })
);

const StyledNav = styled('header')({
  position: 'fixed',
  top: '-6rem',
  left: 0,
  width: '100%',
  background: 'linear-gradient(to right, #29323c, #485563, #29323c)',
  color: 'rgb(202 202 202)',
  height: '6rem',
  zIndex: 5,
  ':after': {
    content: '" "',
    position: 'absolute',
    top: '2.5rem',
    left: 0,
    width: '100%',
    height: ' 0.25rem',
    background: 'currentColor',
    pointerEvents: 'none',
    opacity: 'var(--timeLine-opacity)',
  },
  nav: {
    maxWidth: 1366,
    position: 'relative',
    margin: '0 auto',
    '.nav__track': {
      position: 'relative',
      minWidth: 'max(200rem, 200%)',
      padding: '1.5rem 0 0 max(111rem, 100%)',
      height: '6rem',
    },
    '.nav__list': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-around',

      '.nav__link': {
        position: 'relative',
        // transform: 'translateY(-100px)',
        // opacity: 0,
        display: 'block',
        minWidth: '8rem',
        textAlign: 'center',
        padding: '2rem 1rem 0.5rem',
        color: 'inherit',
        textDecoration: 'none',
        zIndex: 10,
        transition: 'color 150ms',
        ':hover': {
          color: 'rgb(240 240 240)',

          textDecoration: 'underline',
        },
        ':focus': {
          color: 'rgb(240 240 240)',

          textDecoration: 'underline',
        },
        ':after': {
          content: '" "',
          position: 'absolute',
          top: 10,
          right: '50%',
          width: '1rem',
          height: '1rem',
          borderRadius: '50%',
          zIndex: 2222,
          backgroundColor: 'currentColor',
          transform: 'translate3d(-50%, 0, 0)',
          transformOrigin: 'center center',
        },
        a: {
          display: 'block',
        },
      },
    },
    '.travel__timeLine-marker': {
      position: 'absolute',
      opacity: 0,
      top: '-2rem',
      left: '14.5rem',
      width: '1.5rem',
      height: '1.5rem',
      transform: 'translate3d(50%, 0, 0)',
      background: 'coral',
      borderRadius: '100%',
      zIndex: 2000,
      '.travel__timeLine-ring': {
        position: 'absolute',
        backgroundColor: 'inherit',
        height: '100%',
        width: '100%',
        borderRadius: '100%',
        opacity: 0.8,
      },
    },
  },
});

const TimeLineSection = ({ bio }: { bio: Bio[] }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const nav = document.querySelector('.travel__nav');
    if (nav) {
      setLoaded(true);
    }
    if (loaded) {
      const init = new TimeLineAnimation();
      init.triggerAnimation();
    }
  });
  return (
    <StyledContainer className="travel__timeLine">
      <StyledNav className="travel__nav">
        <nav>
          <div className="travel__timeLine-marker">
            <div className="travel__timeLine-ring" />
            <div className="travel__timeLine-ring" />
            <div className="travel__timeLine-ring" />
          </div>
          <div className="nav__track" data-draggable>
            <ul className="nav__list">
              {bio?.map((el, i) => (
                <li key={el.year}>
                  <a href={`#section_${i + 1}`} className="nav__link" data-link>
                    {el.year}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </StyledNav>

      <main>
        {bio?.map((el, i) => (
          <section id={`section_${i + 1}`} data-section key={el.year}>
            <Row gutter={20}>
              <Col md={10} xs={24}>
                <figure className="section__figure">
                  <Image
                    src={`${baseS3Url}/${el.image}`}
                    width={550}
                    height={700}
                    alt=""
                  />
                </figure>
              </Col>
              <Col md={14} xs={24}>
                <h2 className="section__heading" data-section-title={el.year} />
                <p>{el.content}</p>
              </Col>
            </Row>
          </section>
        ))}
      </main>
    </StyledContainer>
  );
};

export default memo(TimeLineSection);
