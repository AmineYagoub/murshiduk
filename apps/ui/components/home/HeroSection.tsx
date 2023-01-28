import ScrollDown from './ScrollDown';
import { memo, useEffect } from 'react';
import { WebGLCarousel } from '@/utils/index';
import { ScrollSmootherAnimation } from '@/utils/animation/ScrollSmoother';

const images = [
  '/img/istanbul.webp',
  '/img/cappadocia.webp',
  '/img/trabzon.webp',
  '/img/antalya.webp',
  '/img/amasya.webp',
];

const data = [
  {
    title: 'مدينة الجمال و التاريخ',
    city: 'إسطنبول',
  },
  {
    title: 'من أجمل الاماكن السياحية في العالم',
    city: 'كابادوكيا',
  },
  {
    title: 'حضاراتٍ عدة بصبغة عثمانية أصيلة',
    city: 'طرابزون',
  },
  {
    title: 'الطبيعية الساحرة و الشواطئ الرائعة',
    city: 'أنطاليا',
  },
  {
    title: 'محبو التاريخ والأثار العثمانية',
    city: 'أماسيا',
  },
];

const HeroSection = () => {
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      const gl = new WebGLCarousel(images);
      gl.init();
      ScrollSmootherAnimation.initInHeroSection();
    }
  }, []);
  return (
    <section id="canvas-wrapper" data-canvas-wrapper>
      <div id="slides">
        {data.map((el, i) => (
          <div className="slide" data-slide key={i}>
            <span
              className={`${
                i === 0 ? 'slide__zero' : 'slide__progress'
              } slide__title | font-display`}
              data-slide-title
            >
              {el.title}
            </span>
            <span
              className="slide__copy | font-copy"
              data-slide-copy
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {el.city}
            </span>
          </div>
        ))}
      </div>

      <nav id="controls">
        <button className="font-display" data-carousel-control data-dir="-1">
          السابق
        </button>
        <button className="font-display" data-carousel-control data-dir="1">
          التالي
        </button>
      </nav>
      <ScrollDown />
    </section>
  );
};

export default memo(HeroSection);
