import { gsap } from 'gsap';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import ContactForm from './ContactForm';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const StyledSection = styled('section')({
  position: 'relative',
  width: '100%',
  height: '100vh',
  textAlign: 'center',
  color: '#fff',
  padding: '3em',
  '#scene': {
    display: 'block',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: -20,
  },
  '.scrollElement': {
    position: 'absolute',
    height: '120vh',
    width: '100px',
    top: '0',
    zIndex: '0',
  },
  form: {
    fontFamily: 'inherit',
    position: 'absolute',
    right: '50%',
    transform: 'translateX(50%) !important',
    top: '30vh',
    maxWidth: 600,
    input: {
      background: 'transparent',
      border: '2px solid #fff',
      color: 'floralwhite !important',

      fontWeight: 'bold',
    },
    textArea: {
      background: 'transparent',
      border: '2px solid #fff',
      color: 'floralwhite !important',
      fontWeight: 'bold',
    },
    '.ant-select-selector': {
      border: '1px solid #fff !important',
      background: 'floralwhite !important',
    },
    '.ant-picker': {
      background: 'transparent',
      border: '2px solid #fff',
      color: 'floralwhite',
      fontWeight: 'bold',
    },

    label: {
      color: '#fff !important',
    },
    button: {
      width: 300,
    },
    h6: {
      color: '#fff',
      fontSize: '1rem',
      textAlign: 'left',
      marginBottom: '1em',
    },
  },
});

const ContactUsSection = () => {
  useEffect(() => {
    /* Transition (from Scene2 to Scene3) */
    gsap.set('#scene3', { y: 580, visibility: 'visible' });
    const sceneTransition = gsap.timeline();
    ScrollTrigger.create({
      animation: sceneTransition,
      trigger: '.scrollElement',
      start: 'top top',
      end: 'bottom 100%',
      scrub: 3,
    });

    /*     sceneTransition.to(
      '#h2-1',
      { y: -680, scale: 1.5, transformOrigin: '50% 50%' },
      0
    );
    sceneTransition.to('#bg_grad', { attr: { cy: '-80' } }, 0.0); */
    sceneTransition.to('#bg2', { y: 0 }, 0);

    /* Scene 3 */
    const scene3 = gsap.timeline();
    ScrollTrigger.create({
      animation: scene3,
      trigger: '.scrollElement',
      start: 'top 100%',
      end: 'bottom 100%',
      scrub: 3,
    });

    //Hills motion
    scene3.fromTo('#h3-1', { y: 300 }, { y: -550 }, 0);
    scene3.fromTo('#h3-2', { y: 800 }, { y: -550 }, 0.03);
    scene3.fromTo('#h3-3', { y: 600 }, { y: -550 }, 0.06);
    scene3.fromTo('#h3-4', { y: 800 }, { y: -550 }, 0.09);
    scene3.fromTo('#h3-5', { y: 1000 }, { y: -550 }, 0.12);

    //stars
    scene3.fromTo('#stars', { opacity: 0 }, { opacity: 0.5, y: -500 }, 0.25);

    //gradient value change
    scene3.to('#bg2-grad', { attr: { cy: 600 } }, 0);
    scene3.to('#bg2-grad', { attr: { r: 500 } }, 0);
    // Scroll Back text
    // scene3.fromTo('#arrow2', { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.25);
    scene3.fromTo(
      '#form',
      { opacity: 0, y: 500 },
      { opacity: 0.7, y: 150 },
      0.25
    );
  }, []);

  return (
    <StyledSection>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xlinkHref="http://www.w3.org/1999/xlink"
        viewBox="0 0 750 500"
        preserveAspectRatio="xMidYMax slice"
        id="scene"
      >
        <defs>
          <radialGradient
            id="bg2-grad"
            cx="365.22"
            cy="500"
            r="631.74"
            gradientTransform="translate(750 552.6) rotate(180) scale(1 1.11)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="hsla(349, 94%, 75%, 1)" />
            <stop offset="0.12" stopColor="hsla(342, 49%, 62%, 1)" />
            <stop offset="0.18" stopColor="hsla(328, 37%, 56%, 1)" />
            <stop offset="0.33" stopColor="hsla(281, 33%, 48%, 1)" />
            <stop offset="0.41" stopColor="hsla(268, 38%, 48%, 1)" />
            <stop offset="0.45" stopColor="hsla(266, 38%, 43%, 1)" />
            <stop offset="0.55" stopColor="hsla(261, 37%, 32%, 1)" />
            <stop offset="0.64" stopColor="hsla(253, 36%, 24%, 1)" />
            <stop offset="0.72" stopColor="hsla(244, 33%, 19%, 1)" />
            <stop offset="0.78" stopColor="hsla(240, 33%, 17%, 1)" />
          </radialGradient>
          <radialGradient
            id="fstar-grad"
            cx="1362.39"
            cy="-53.7"
            r="39.39"
            gradientTransform="matrix(0.89, -0.45, -0.45, -0.89, -473.7, 640.57)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.06" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="0.12" stopColor="#fff" stopOpacity="0.62" />
            <stop offset="0.19" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="0.26" stopColor="#fff" stopOpacity="0.31" />
            <stop offset="0.33" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="0.41" stopColor="#fff" stopOpacity="0.11" />
            <stop offset="0.49" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="0.59" stopColor="#fff" stopOpacity="0.01" />
            <stop offset="0.72" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="linear-gradient"
            x1="472"
            y1="461.56"
            x2="872.58"
            y2="461.56"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fd75a8" />
            <stop offset="1" stopColor="#5a2d81" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            x1="214.61"
            y1="508.49"
            x2="166.09"
            y2="361.12"
            xlinkHref="#linear-gradient"
          />
          <linearGradient
            id="linear-gradient-3"
            x1="57.65"
            y1="508.01"
            x2="448.08"
            y2="508.01"
            xlinkHref="#linear-gradient"
          />
          <linearGradient
            id="linear-gradient-4"
            x1="193.48"
            y1="508.3"
            x2="761.05"
            y2="508.3"
            xlinkHref="#linear-gradient"
          />
        </defs>

        <g id="scene3" style={{ visibility: 'visible' }}>
          <rect
            id="bg2"
            y="-59.8"
            width="750"
            height="612.4"
            transform="translate(750 492.8) rotate(180)"
            fill="url(#bg2-grad)"
          />

          <g id="stars" fill="#fff" style={{ opacity: 0 }}>
            <path d="M699.71,128.24a1,1,0,1,1-1-1A1,1,0,0,1,699.71,128.24Z" />
            <path d="M643.78,37.74a1,1,0,1,1-1-1A1,1,0,0,1,643.78,37.74Z" />
            <path d="M666.33,139.16a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,666.33,139.16Z" />
            <circle cx="636.11" cy="77.24" r="1.46" />
            <path d="M714.4,31.27a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,714.4,31.27Z" />
            <path d="M725,27.36a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,725,27.36Z" />
            <path d="M468.41,65.4A1.46,1.46,0,1,1,467,63.94,1.46,1.46,0,0,1,468.41,65.4Z" />
            <path d="M710,97.11a1.46,1.46,0,1,1-1.46-1.46A1.45,1.45,0,0,1,710,97.11Z" />
            <circle cx="711.49" cy="170.22" r="1.46" />
            <path d="M677.73,260.6a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,677.73,260.6Z" />
            <path d="M731.11,208.78a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,731.11,208.78Z" />
            <path d="M447.4,234.79a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,447.4,234.79Z" />
            <path d="M523.16,200.18a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,523.16,200.18Z" />
            <path d="M624.94,167.77a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,624.94,167.77Z" />
            <path d="M562.88,139.31a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,562.88,139.31Z" />
            <path d="M372,86.87a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,372,86.87Z" />
            <circle cx="473.23" cy="34.67" r="1.46" />
            <path d="M398.74,28.36a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,398.74,28.36Z" />
            <path d="M448.85,192.73a1.46,1.46,0,1,1-1.45-1.46A1.46,1.46,0,0,1,448.85,192.73Z" />
            <circle cx="616.73" cy="121.26" r="1.46" />
            <circle cx="559.97" cy="25.73" r="1.46" />
            <circle cx="679.95" cy="161.38" r="1.46" />
            <circle cx="558.51" cy="229.54" r="1.46" />
            <path d="M692.7,250.2a1.46,1.46,0,1,1-1.45-1.46A1.46,1.46,0,0,1,692.7,250.2Z" />
            <circle cx="616.73" cy="201.91" r="1.46" />
            <circle cx="544.82" cy="223.87" r="1.46" />
            <path d="M450.53,73.81a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,450.53,73.81Z" />
            <path d="M445.94,201.63a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,445.94,201.63Z" />
            <path d="M186.43,237.31a1,1,0,1,1-1-1A1,1,0,0,1,186.43,237.31Z" />
            <path d="M291.32,199.17a1,1,0,1,1-1-1A1,1,0,0,1,291.32,199.17Z" />
            <path d="M153.05,248.24a1.46,1.46,0,1,1-1.46-1.46A1.45,1.45,0,0,1,153.05,248.24Z" />
            <path d="M114,221.87a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,114,221.87Z" />
            <path d="M154.88,151.93a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,154.88,151.93Z" />
            <path d="M199.67,279.29a1.46,1.46,0,1,1-1.46-1.46A1.47,1.47,0,0,1,199.67,279.29Z" />
            <path d="M54.91,249.69a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,54.91,249.69Z" />
            <circle cx="166.68" cy="270.45" r="1.46" />
            <path d="M166.68,191.27a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,166.68,191.27Z" />
            <path d="M185.88,123.67a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,185.88,123.67Z" />
            <circle cx="671.95" cy="113.82" r="1.46" />
            <path d="M631.32,65.4a1.46,1.46,0,1,1-1.46-1.46A1.47,1.47,0,0,1,631.32,65.4Z" />
            <path d="M30,149a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,30,149Z" />
            <circle cx="104.05" cy="109.88" r="1.46" />
            <path d="M108.42,183a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,108.42,183Z" />
            <path d="M76.88,174.14a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,76.88,174.14Z" />
            <path d="M76.88,78.7a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,76.88,78.7Z" />
            <path d="M239,207.33a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,239,207.33Z" />
            <path d="M598,191.27a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,598,191.27Z" />
            <path d="M509.84,86.87a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,509.84,86.87Z" />
            <path d="M285.57,238.38a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,285.57,238.38Z" />
            <circle cx="252.58" cy="229.54" r="1.46" />
            <path d="M222.07,80.16a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,222.07,80.16Z" />
            <path d="M251.13,29.82a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,251.13,29.82Z" />
            <path d="M190.54,71.32a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,190.54,71.32Z" />
            <circle cx="351.16" cy="104.5" r="1.46" />
            <path d="M294.24,80.16a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,294.24,80.16Z" />
            <path d="M367.7,126.71a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,367.7,126.71Z" />
            <path d="M358.52,77.06a1.46,1.46,0,1,1-1.46-1.46A1.47,1.47,0,0,1,358.52,77.06Z" />
            <path d="M49,126.59a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,49,126.59Z" />
            <path d="M22.81,37.74a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,22.81,37.74Z" />
            <path d="M150.15,74.81a1,1,0,1,1-1-1A1,1,0,0,1,150.15,74.81Z" />
            <path d="M89.47,27.36a1,1,0,1,1-1-1A1,1,0,0,1,89.47,27.36Z" />
            <circle cx="32.33" cy="82.62" r="1" />
            <path d="M100.29,143.93a1,1,0,0,1-2,0,1,1,0,0,1,2,0Z" />
            <circle cx="48.8" cy="202.91" r="1" />
            <path d="M225.77,129.05a1,1,0,1,1-1-1A1,1,0,0,1,225.77,129.05Z" />
            <path d="M283.66,83.62a1,1,0,1,1-1-1A1,1,0,0,1,283.66,83.62Z" />
            <circle cx="474.23" cy="222.87" r="1" />
            <circle cx="663.41" cy="189.82" r="1" />
            <path d="M599.68,251.66a1,1,0,1,1-1-1A1,1,0,0,1,599.68,251.66Z" />
            <circle cx="349.25" cy="41.39" r="1" />
            <circle cx="557.51" cy="100.02" r="1" />
            <path d="M551.87,115.27a1,1,0,1,1-1-1A1,1,0,0,1,551.87,115.27Z" />
            <path d="M160.47,43.68A1.46,1.46,0,1,1,159,42.22,1.45,1.45,0,0,1,160.47,43.68Z" />
            <circle cx="122.39" cy="60.39" r="1.46" />
          </g>
          <g id="hills3">
            <polygon
              id="h3-5"
              points="756.31 330.55 750.57 327.01 742.42 331.08 719.12 317.36 705.87 311.91 695.11 307.32 688.01 314.24 675.69 336.9 665.32 346.76 657.77 353.08 641.17 353.46 633.52 362.58 626.63 373.11 618.53 378.94 596.8 411.28 588.95 404.93 578.86 406.48 539.9 443.36 472 493.8 556 490.91 756.14 490.91 756.31 330.55"
              fill="url(#linear-gradient)"
              style={{ mixBlendMode: 'multiply' }}
            />
            <path
              id="h3-4"
              d="M453.13,471.05c-20-.31-48.49-14.38-68.14-10.05-13.54-4.69-34.51-19.93-48.25-23.77-4.06-5.13-13.21-13.57-18.27-16.88L297,425.44c-25.78-9-71.66-48.83-92.2-70.78-23.25,8-24.38,17.46-52.47,13.47L125.84,344.9c-7.26,4.7-21.45,3.12-28.92.05C86.58,332.65,59.21,300,46.18,293.73L19.53,333.39l-21.39-3.8V490.91l204.07-2.72,2.2,2.72H456.94Z"
              fill="url(#linear-gradient-2)"
              style={{ mixBlendMode: 'multiply' }}
            />
            <path
              id="h3-3"
              d="M369.27,490.91h71.81l-20.37-23.39c-12.47-1.8-31-7.32-43-11.44-4.42,2-12-2.38-15.74-5.28-24-16.39-52.39-28.74-75.56-47.77L250.16,416,237,405.49l-44.35,23c-4.14-6-13.7-11.83-19.85-12.43-29.3,7.48-89.69,52.2-115.13,72.82C114.24,491.53,309.43,490.93,369.27,490.91Z"
              fill="url(#linear-gradient-3)"
              style={{ mixBlendMode: 'multiply' }}
            />
            <path
              id="h3-2"
              d="M756.14,490.91l-8-59.58-53-.18c-15.09-2.44-50.94-7.67-64.22,4.91-19.09-2.89-49.68-19.29-69.12-17.53-5.3-5.72-16.93-13.13-23.69-14.8l-26.87,20.38c-26.86,1.93-30.42-8.09-52.55-17.23l-12.86,14.87c-8.76-4.86-25.28-12.15-33.64-18.06-22.67,22.21-39,46.13-70,32.86-19.43,17.89-46.64,30.57-69.37,40.53-20.6-4.23-50.78,9.69-71.71,9.85l-.81,4Z"
              fill="url(#linear-gradient-4)"
              style={{ mixBlendMode: 'multiply' }}
            />
            <path
              id="h3-1"
              d="M754.08,270.8c-9.14,15.25-28.22,45.59-38,59.95-4.61,3.06-20.35,7.4-25.57,8.91L643.7,401c-25.83,9.4-65.64,40.62-89.22,55.62l-7.13-3c-18.15,15-47.22,22.84-68.46,20.49-9.82-6.6-45.32-31-54.87-36-26.29,17.87-45.79,32-76.1,17.57a96.12,96.12,0,0,0-21.71,12.72c-6.43.64-19,3.94-25.11,6.51-13.74-7.23-27.75-13.32-31.55-9.38L232.73,428l-8.08,6.7c-24.6-11.43-37.11-14.88-54.06-43.59l-8.4,4.76c-26.49-10.44-21.1-21.55-39-31.82-10.53,4.63-25.1,12-37.85,19.27C71,369.57,53.3,344.41,43.42,325c-16.37-6.4-30.9-30.44-40.59-47.58l-4.69,2v211.5H756.31V271.05Z"
            />
          </g>
        </g>
      </svg>
      <div className="scrollElement" />
      <ContactForm />
    </StyledSection>
  );
};

export default ContactUsSection;
