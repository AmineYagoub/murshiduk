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
    background: 'linear-gradient(to right,#fff , #9773ff 70%, #fff)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
  },
});

const testimonialImages = [
  {
    title: 'عنوان 1',
    src: '/img/our-clients/client-2.png',
  },
  {
    title: 'عنوان 2',
    src: '/img/our-clients/client-3.png',
  },
  {
    title: 'عنوان 3',
    src: '/img/our-clients/client-4.png',
  },
];

const TestimonialsSlider = ({ images }: { images: string[] }) => {
  if (images.length < 3) {
    images.push(
      ...['/img/amasya.webp', '/img/antalya.webp', '/img/istanbul.webp']
    );
  }
  useEffect(() => {
    const anime = new TestimonialAnimation();
    anime.initAnimation();
  }, []);
  return (
    <>
      <StyledSection className="testimonial">
        <h1 className="testimonial__title">💖💘💞 أراء العملاء 💞💘💖</h1>
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
              <h1 className="text name">عبد المنعم الجليح</h1>
              <h4 className="text location">الإمارات</h4>
              <p className="text description">رحلة إلى الشمال التركي</p>
            </div>

            <div className="info previous--info">
              <h1 className="text name">أ . خالد</h1>
              <h4 className="text location">الإمارات</h4>
              <p className="text description">رحلة إلى الشمال التركي</p>
            </div>

            <div className="info next--info">
              <h1 className="text name">علي الدوسري</h1>
              <h4 className="text location">السعودية</h4>
              <p className="text description">رحلة إلى إسطنبول</p>
            </div>
          </div>
        </div>

        <div className="testimonial__bg">
          {images.slice(0, 3).map((el, i) => (
            <div
              key={el}
              className={`testimonial__bg__image ${
                i <= 0
                  ? 'previous--image'
                  : i === 1
                  ? 'current--image'
                  : 'next--image'
              }`}
            >
              <Image
                src={el}
                width={1600}
                height={1100}
                sizes="100vw"
                alt="رحلة إلى الشمال التركي"
              />
            </div>
          ))}
        </div>
      </StyledSection>
    </>
  );
};

export default TestimonialsSlider;
