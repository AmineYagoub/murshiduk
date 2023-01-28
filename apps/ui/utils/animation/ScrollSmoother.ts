import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export class ScrollSmootherAnimation {
  public static initInHeroSection() {
    const scrollTrigger = {
      trigger: '.slide__title',
      start: 'top center',
      scrub: true,
    };
    gsap.to('.slide__title', {
      y: -300,
      opacity: 0,
      duration: 3,
      scrollTrigger,
    });
    gsap.to('.slide__copy', {
      y: -100,
      opacity: 0,
      duration: 4,
      scrollTrigger,
    });
    gsap.to('.travel__scrollDown', {
      y: 50,
      opacity: 0,
      scale: 2,
      duration: 3,
      scrollTrigger,
    });
  }

  public static initInWhyUsSection() {
    const fatihTrigger = {
      trigger: '.travel__fatih-img',
      start: 'top bottom',
    };
    const imgTrigger = {
      trigger: '.travel__fatih-img',
      start: 'top center',
      end: 'center',
      scrub: true,
    };
    gsap.to('.travel__fatih-h2', {
      opacity: 1,
      duration: 3,
      scrollTrigger: fatihTrigger,
    });
    gsap.to('.travel__fatih-h3', {
      opacity: 1,
      scale: 1,
      duration: 1,
      scrollTrigger: fatihTrigger,
    });
    // TODO Bottom the image and then top up and rotate when scroll
    gsap.to('.travel__fatih-img-1', {
      y: -50,
      duration: 6,
      scrollTrigger: imgTrigger,
    });
    gsap.to('.travel__fatih-img-2', {
      y: -150,
      duration: 3,
      rotateZ: 10,
      scrollTrigger: { ...fatihTrigger, scrub: true },
    });
    //
    gsap.to('.travel__exp', {
      y: -250,
      duration: 9,
      opacity: 1,
      scrollTrigger: { ...fatihTrigger, scrub: true },
    });
  }
}
