import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import isMobile from 'is-mobile';

export class TimeLineAnimation {
  private navLinks: HTMLAnchorElement[];

  constructor() {
    this.navLinks = gsap.utils.toArray('[data-link]');
    const sectionTitles = gsap.utils.toArray(
      '[data-section-title]'
    ) as HTMLHeadingElement[];
    sectionTitles.forEach((el) => {
      if (!el.hasChildNodes()) {
        [...el.getAttribute('data-section-title')]
          .filter((el) => !/\s/.test(el))
          .forEach((char) => {
            const child = document.createElement('span');
            child.className = 'section__heading-char';
            child.innerText = char;
            el.appendChild(child);
          });
      }
    });
    window.matchMedia('(prefers-reduced-motion: reduce)');
  }
  private getLastItemWidth() {
    return this.navLinks[this.navLinks.length - 1].offsetWidth;
  }

  private getDraggableWidth(track: HTMLDivElement) {
    return track.offsetWidth * 0.5 - this.getLastItemWidth();
  }

  private getUseableHeight() {
    return document.documentElement.offsetHeight - window.innerHeight;
  }

  private updatePosition(track: HTMLDivElement, st: ScrollTrigger) {
    const left = track.getBoundingClientRect().left;
    const width = this.getDraggableWidth(track);

    const useableHeight = this.getUseableHeight();
    const y = gsap.utils.mapRange(0, width, 0, useableHeight, left);
    st.scroll(y);
  }

  public triggerAnimation() {
    gsap.registerPlugin(Draggable);
    const track = document.querySelector('[data-draggable]') as HTMLDivElement;
    const tl = gsap.timeline().to(track, {
      x: () => this.getDraggableWidth(track),
      ease: 'none',
    });
    const trigger = {
      trigger: '.travel__timeLine',
      start: '100px top',
      scrub: 0,
    };
    if (!isMobile()) {
      gsap.to('.travel__timeLine-marker', {
        y: '4.5em',
        opacity: 1,
        scrollTrigger: { ...trigger, start: 'top top', end: '105px top' },
      });
    }
    gsap.to('.travel__nav', {
      y: 95,
      scrollTrigger: {
        ...trigger,
        start: 'top top',
        end: '105px top',
        scrub: true,
      },
    });
    gsap.to('.travel__nav', {
      y: 0,
      scrollTrigger: {
        trigger: '.travel__timeLine',
        start: 'bottom top',
        end: 'bottom -300px',
        scrub: true,
      },
    });
    gsap.to('.travel__timeLine-ring', {
      scale: 1.75,
      opacity: 0,
      duration: 2,
      stagger: {
        each: 0.5,
        repeat: -1,
      },
    });

    const sectionTitles = gsap.utils.toArray(
      '[data-section-title]'
    ) as HTMLHeadingElement[];
    sectionTitles.forEach(function (container) {
      gsap.fromTo(
        container.querySelectorAll('.section__heading-char'),
        { y: -150 },
        {
          y: 0,
          stagger: 0.3,
          scrollTrigger: {
            trigger: container,
            scrub: true,
            start: 'top 75%',
            end: 'top 40%',
            immediateRender: false,
          },
        }
      );
    });

    /*     gsap.to('.nav__link', {
      opacity: 1,
      y: 0,
      scrollTrigger: { ...trigger, start: 'top top', end: '105px top' },
    }); */
    gsap.to('.travel__nav', {
      opacity: 1,
      '--timeLine-opacity': 1,
      scrollTrigger: { ...trigger, start: 'top top', end: '100px top' },
    });
    const st = ScrollTrigger.create({
      animation: tl,
      ...trigger,
    });
    Draggable.create(track, {
      type: 'x',
      inertia: true,
      bounds: {
        minX: 0,
        maxX: this.getDraggableWidth(track),
      },
      edgeResistance: 1,
      onDragStart: () => st.disable(),
      onDragEnd: () => st.enable(),
      onDrag: () => this.updatePosition(track, st),
      onThrowUpdate: () => this.updatePosition(track, st),
    });
  }
}
