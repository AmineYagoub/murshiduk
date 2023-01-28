const { useToken } = theme;
import Image from 'next/image';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Col, Row, theme } from 'antd';
import { ScrollSmootherAnimation } from '@/utils/animation/ScrollSmoother';

const WhyUsSection = () => {
  const { token } = useToken();
  const StyledSection = styled('section')({
    backgroundColor: token.colorBgBase,
    backgroundImage:
      'linear-gradient(to right top, #123524, #0a3a2f, #02403b, #004547, #004953)',
    position: 'relative',
    width: '100%',
    height: '120vh',
    minHeight: 1100,
    textAlign: 'center',
    color: '#fff',
    padding: '3em',
    h2: {
      fontSize: '1.5rem',
      opacity: 0,
    },
    h3: {
      fontSize: '4.5rem',
      opacity: 0,
      transform: 'scale(1.5)',
    },
    img: {
      objectFit: 'cover',
      filter: 'drop-shadow(2px 5px 5px #000)',
      ':first-of-type': {
        transform: 'rotateZ(-10deg)',
        left: 0,
      },
    },
    '.travel__borderRadius': {
      borderTopRightRadius: '50%',
      borderTopLeftRadius: '50%',
    },
    '.travel__fatih-img': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end',
      margin: '8em auto 15em',
    },
    '.travel__desc': {
      textAlign: 'left',
      maxWidth: 1380,
      margin: '0 auto',
    },
    b: {
      lineHeight: 2,
    },
    p: {
      lineHeight: 1.5,
      margin: '2em auto',
    },
    '.travel__exp': {
      textAlign: 'center',
      margin: '0 auto',
      maxWidth: 280,
      opacity: 0,
      h5: {
        fontSize: '1.5rem',
        margin: 10,
        fontWeight: 'normal',
      },
    },
    '.travel__exp-free': {
      position: 'absolute',
      bottom: 100,
      left: 0,
    },
  });
  useEffect(() => {
    ScrollSmootherAnimation.initInWhyUsSection();
  }, []);
  return (
    <StyledSection className="travel__whyUs">
      <h2 className="travel__fatih-h2">مالذي يميزنا عن غيرنا</h2>
      <h3 className="travel__fatih-h3">لماذا نحن</h3>
      <Row className="travel__desc">
        <Col span={6}>
          <b>
            Majed Travel هي شركة سفر ذات طابع عصري تقدمي ومقرها في تركيا ولدت من
            شغف وحب الإستكشاف للقيام بالأشياء بشكل مختلف.
          </b>
          <p>
            نتكفل بإعداد الرحلات للعائلات أو الطلاب أو الأجانب ووضع برنامج مدروس
            للرحلات. تقديم خدمات الترجمة والدليل السياحي عبر موظفي مكاتب السياحة
            والسفر. تسهيل حجوزات الفنادق والطيران والحافلات للمجموعات السياحية.
            التنسيق مع المطاعم والمقاهي والمشافي والمراكز الصحية وغيرها التي
            يريد السائح زيارتها.
          </p>
          <p>
            خبراتنا في السياحة و السفر تحت تصرفك لإنشاء رحلات مذهلة ذات تأثير
            إيجابي بالنسبة لك.
          </p>
        </Col>
        <Col span={12} className="travel__fatih-img">
          <Image
            src="/img/fatih-1.jpg"
            width={280}
            height={400}
            alt="مسجد الفاتح"
            className="travel__fatih-img-1"
          />
          <Image
            src="/img/fatih-2.jpg"
            width={280}
            height={320}
            alt="مسجد الفاتح"
            className="travel__borderRadius travel__fatih-img-2"
          />
        </Col>
        <Col span={6}>
          <section className="travel__exp">
            <Image
              src="/icons/exp-favorite.svg"
              width={32}
              height={32}
              alt="تجارب لا تُنسى"
            />
            <h5>تجارب لا تُنسى</h5>
            <p>
              يعد إنشاء رحلتك أمرًا تخطيطيا تمامًا ونحن متواجدون هنا في كل خطوة.
            </p>
          </section>

          <section className="travel__exp travel__exp-free">
            <Image
              src="/icons/map-favorite.svg"
              width={32}
              height={32}
              alt="تأثير إيجابي"
            />
            <h5>تأثير إيجابي</h5>
            <p>
              تجارب وأماكن إقامة مستدامة و منظمة تعظم الفوائد للسكان المحليين كي
              يصبح بمقدورهم تقديم خدمات جيدة للسياح.
            </p>
          </section>
        </Col>
      </Row>
      <section className="travel__exp">
        <Image
          src="/icons/team-favorite.svg"
          width={32}
          height={32}
          alt="الشفافية والوضوح"
        />
        <h5>الشفافية والوضوح</h5>
        <p>
          اختيار الأفضل كقاعدة أساسية لتبني سياسة الشفافية والوضوح للحفاظ على
          ميزانيتك من الهدر والضياع وتفعيلاً للقيم الأخلاقية والإنسانية
          والاجتماعية.
        </p>
      </section>
    </StyledSection>
  );
};

export default WhyUsSection;
