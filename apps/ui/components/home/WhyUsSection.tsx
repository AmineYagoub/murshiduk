import Image from 'next/image';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import { ScrollSmootherAnimation } from '@/utils/animation/ScrollSmoother';
import { mq } from '@/utils/index';
import Navigation, { menuItems } from '../common/Navigation';

export const StyledSection = styled('section')(
  mq({
    backgroundImage:
      'linear-gradient(to right top, #123524, #0a3a2f, #02403b, #004547, #004953)',
    position: 'relative',
    width: '100%',
    height: ['200vh', '180vh', '150vh', '155vh', '100vh'],
    maxHeight: 1500,
    textAlign: 'center',
    color: '#fff',
    padding: ['3em', '3em', '10em 3em 3em'],
    nav: {
      display: ['none', 'none', 'block'],
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: '#fff',
      width: '100%',
      '.ant-menu': {
        maxWidth: 1360,
        margin: '0 auto',
        padding: 20,
        li: {
          minWidth: 150,
          fontSize: 18,
          fontWeight: 600,
          color: '#374151',
          borderLeft: 'solid 1px #374151',
          '&:first-of-type': {
            borderLeft: 'none',
          },
        },
      },
    },
    h2: {
      fontSize: 'clamp(1.3rem, 5vw, 3rem)',
      lineHeight: 1.6,
      fontWeight: 'bold',
      opacity: 0,
      transform: 'scale(1.5)',
    },

    img: {
      filter: 'drop-shadow(2px 5px 5px #000)',
      maxWidth: 'clamp(150px, 30vw, 320px)',
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
      margin: '6em auto 15em',
    },
    '.travel__desc': {
      textAlign: 'left',
      maxWidth: 1380,
      margin: '0 auto',
      '.travel__desc-main': {
        marginTop: 20,
      },
    },
    b: {
      lineHeight: 2,
      marginTop: 20,
    },
    p: {
      lineHeight: 1.5,
      margin: '2em auto',
      fontSize: 'clamp(0.9rem, 4vw, 1rem)',
    },
    '.travel__cards': {
      display: ['block', 'flex', 'block'],
    },
    '.travel__exp': {
      textAlign: 'center',
      margin: '0 auto',
      maxWidth: 300,
      minWidth: 180,
      h5: {
        fontSize: '1.5rem',
        margin: 10,
        fontWeight: 'normal',
      },
    },
    '.travel__exp-free': {
      position: ['relative', 'relative', 'absolute'],
      bottom: [0, 50, 100],
      left: 0,
    },
  })
);

const WhyUsSection = () => {
  useEffect(() => {
    ScrollSmootherAnimation.initInWhyUsSection();
  }, []);
  return (
    <StyledSection className="travel__whyUs">
      <Navigation mode="horizontal" items={menuItems} />
      <h2 className="travel__fatih-h3">
        لماذا تحتاج منظم ومرشد سياحي لرحلتك ؟
      </h2>
      <Row className="travel__desc">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={6}
          className="travel__desc-main"
        >
          <b>
            إسمي مجد الصباغ منظم رحلات سياحية إلى تركيا بخبرة تزيد عن 8 سنوات
            وعليك ان تعلم قبل كل شيء بأن هدفي الأول هو أن أضع جميع خبراتي و أجعل
            من رحلتك السياحية رحلة ناجحة سعيدة وممتعة وهذا هو هدف العطل.
          </b>
          <p>
            سأظمن لك الإستفادة القصوى من وقتك الثمين في رحلتك بأفضل شكل ممكن
            وترتيب الرحلة بشكل مدروس ووافي, حيث أتكفل بإعداد الرحلة كاملة من وقت
            قدومك إلى بوابة المطار وحتى عودتك منها وثق تماما أنك بأيدي أمينة.
          </p>
          <p>
            كما يمكنني مساعدتك بإختيار و التنسيق مع المطاعم والمقاهي والمشافي
            والمراكز الصحية إذا احتجت لها عزيزي السائح.
          </p>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          className="travel__fatih-img"
        >
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
        <Col xs={24} sm={24} md={24} lg={6} xl={6} className="travel__cards">
          <section className="travel__exp travel__exp-free">
            <Image
              src="/icons/exp-favorite.svg"
              width={32}
              height={32}
              alt="تجارب لا تُنسى"
            />
            <h5>تجارب لا تُنسى</h5>
            <p>
              نعم صديقي سوف أجعل من رحلتك رحلة لاتنسى وتجربتك معي تجربة حقيقية
              وجميلة وأنا أتكلم عن ذلك بكل ثقة لأني مع تعاملي الكبير مع العملاء
              والسائحين لم يخرج سائح واحد لدي إلا وتشكرنا وكان سعيداً جداً
              برحلته معنا , لذلك تواصل معي وانت مرتاح البال بنجاح رحلتك معي .
            </p>
          </section>

          {/*           <section className='travel__exp travel__exp-free'>
            <Image
              src='/icons/map-favorite.svg'
              width={32}
              height={32}
              alt='تأثير إيجابي'
            />
            <h5>تأثير إيجابي</h5>
            <p>
              تجارب وأماكن إقامة مستدامة و منظمة تعظم الفوائد للسكان المحليين كي
              يصبح بمقدورهم تقديم خدمات جيدة للسياح.
            </p>
          </section> */}
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
          إختيار الأفضل لك والأنسب بحسب الخبرة المكتسبة على مر السنين بشكل واضح
          وصريح , فعندما أفيدك وأعطيك حقك سوف آخذ حقي بكل تأكيد وتكون رحلتك
          ناجحة وجميلة وأعلم عزيزي السائح من المستحيل تقديم أي خدمة أو سكن غير
          المتفق عليه بكامل التفاصيل.
        </p>
      </section>
    </StyledSection>
  );
};

export default WhyUsSection;
