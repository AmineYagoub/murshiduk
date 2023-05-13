import { Button } from 'antd';
import Image from 'next/image';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { TestimonialAnimation } from '@/utils/animation/Testimonial';

const StyledSection = styled('section')({
  position: 'relative',
  width: '100%',
  height: '100vh',
  display: 'flex',
  maxHeight: 770,
  justifyContent: 'center',

  '.testimonial__title': {
    color: 'transparent',
    fontWeight: '800',
    margin: '2em',
    zIndex: 100,
    fontSize: 'clamp(0.9rem, 4vw, 1rem)',
    background: 'linear-gradient(to right,#fff , #f3b91d 70%, #fff)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
  },
  b: {
    display: 'inline-block',
  },
  strong: {
    display: 'inline-block',
  },
});

const testimonialImages = [
  {
    title: 'الدوسري',
    src: '/img/our-clients/ali.jpeg',
  },
  {
    title: 'عبد المنعم الجليح',
    src: '/img/our-clients/julaih.jpeg',
  },
  {
    title: 'خالد',
    src: '/img/our-clients/khalid.jpeg',
  },
];

const TestimonialsSlider = () => {
  useEffect(() => {
    const anime = new TestimonialAnimation();
    anime.initAnimation();
  }, []);
  return (
    <>
      <StyledSection className="testimonial">
        <b className="testimonial__title">💖💘💞 أراء العملاء 💞💘💖</b>
        <div className="cardList">
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            className="cardList__btn btn--left"
          />

          <div className="cards__wrapper">
            {testimonialImages.map((el, i) => (
              <div
                className={`card ${
                  i <= 0
                    ? 'previous--card'
                    : i === 1
                    ? 'current--card'
                    : 'next--card'
                }`}
                key={i}
              >
                <div className="card__image">
                  <Image src={el.src} alt={el.title} width={720} height={380} />
                </div>
              </div>
            ))}
          </div>

          <Button
            shape="circle"
            icon={<RightOutlined />}
            className="cardList__btn btn--right"
          />
        </div>

        <div className="infoList">
          <div className="info__wrapper">
            <div className="info current--info">
              <h6 className="text name">عبد المنعم الجليح</h6>
              <b className="text location">الإمارات</b>
              <p className="text description">رحلة إلى الشمال التركي</p>
            </div>

            <div className="info previous--info">
              <h6 className="text name">أ . خالد</h6>
              <b className="text location">الإمارات</b>
              <p className="text description">رحلة إلى الشمال التركي</p>
            </div>

            <div className="info next--info">
              <h6 className="text name">علي الدوسري</h6>
              <b className="text location">السعودية</b>
              <p className="text description">رحلة إلى إسطنبول</p>
            </div>
          </div>
        </div>

        <div className="testimonial__bg">
          {testimonialImages.map((el, i) => (
            <div
              key={i}
              className={`testimonial__bg__image ${
                i <= 0
                  ? 'previous--image'
                  : i === 1
                  ? 'current--image'
                  : 'next--image'
              }`}
            >
              <Image
                src={el.src}
                width={1600}
                height={1100}
                sizes="100vw"
                alt={el.title}
              />
            </div>
          ))}
        </div>
      </StyledSection>
    </>
  );
};

export default TestimonialsSlider;
