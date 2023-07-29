import { gsap } from 'gsap';
import { Flip } from 'gsap/dist/Flip';

export class ReviewsGrid {
  private introGrid: Element;
  private gridImages: Element[];
  private gridLabels: Element[];
  private gridTitle: any;
  private sliderTitle: any;
  private controls: Element;
  private closeCtrl: Element;
  private nav: Element;
  private current = -1;
  // Check if the animation is in progress
  private isAnimating = false;
  // grid || slider
  private mode = 'grid';

  constructor() {
    // Grid
    this.introGrid = document.querySelector('.intro-grid--images');

    // The grid images
    this.gridImages = Array.from(
      this.introGrid.querySelectorAll('.intro-grid__img')
    );

    // The grid labels
    this.gridLabels = Array.from(
      document.querySelectorAll(
        '.intro-grid--labels > .intro-grid__label > .oh__inner'
      )
    );

    // The grid title
    this.gridTitle = {
      main: document.querySelector(
        '.intro-title > .intro-title__main > .oh__inner'
      ),
      sub: document.querySelector(
        '.intro-title > .intro-title__sub > .oh__inner'
      ),
    };

    // The slider title
    this.sliderTitle = {
      el: document.querySelector('.slider-title'),
      main: document.querySelector(
        '.slider-title > .slider-title__main > .oh__inner'
      ),
      desc: document.querySelector('.slider-title > .slider-title__desc'),
    };

    // Controls element
    this.controls = document.querySelector('.controls');
    this.closeCtrl = this.controls.querySelector('button.close');
    this.nav = this.controls.querySelector('nav.nav');
    gsap.registerPlugin(Flip);
  }

  // Show the slider
  public showSlider(image) {
    if (this.isAnimating || this.mode === 'slider') return;
    this.isAnimating = true;
    this.mode = 'slider';

    const DURATION = 1;
    const EASE = 'power4.inOut';

    this.current = this.gridImages.indexOf(image);

    gsap
      .timeline({
        defaults: {
          duration: DURATION,
          ease: EASE,
        },
        onComplete: () => (this.isAnimating = false),
      })
      .addLabel('start', 0)
      .to(
        Object.values(this.gridTitle),
        {
          yPercent: -100,
        },
        'start'
      )
      .to(
        this.gridLabels,
        {
          yPercent: -100,
        },
        'start'
      )
      .to(image, { filter: 'brightness(100%) hue-rotate(0deg)' }, 'start')
      .add(() => {
        // Save current state  of all images
        const flipstate = Flip.getState(this.gridImages);
        // Change layout
        this.introGrid.classList.add('intro-grid--slider');
        // and position the introSlider at the center of the current image
        gsap.set(this.introGrid, {
          yPercent: -100 * this.current,
        });
        // Animate all
        Flip.from(flipstate, {
          duration: DURATION,
          ease: EASE,
          absolute: true,
          stagger: {
            each: 0.02,
            from: this.current,
          },
          simple: true,
          prune: true,
        });
      }, 'start')
      .set(
        this.sliderTitle.el,
        {
          opacity: 1,
        },
        'start'
      )
      .fromTo(
        [this.sliderTitle.main, this.sliderTitle.desc],
        {
          yPercent: (pos) => (pos ? 240 : 100),
          opacity: (pos) => (pos ? 0 : 1),
        },
        {
          yPercent: 0,
          xPercent: -50,
          opacity: 1,
        },
        'start'
      )
      .add(() => {
        this.controls.classList.add('controls--open');
      }, 'start')
      .fromTo(
        [this.closeCtrl, this.nav],
        {
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.02,
        },
        'start'
      );
  }

  // Hide the slider
  hideSlider() {
    if (this.isAnimating || this.mode === 'grid') return;
    this.isAnimating = true;
    this.mode = 'grid';

    const DURATION = 1;
    const EASE = 'power4.inOut';

    gsap
      .timeline({
        defaults: {
          duration: DURATION,
          ease: EASE,
        },
        onComplete: () => (this.isAnimating = false),
      })
      .to(
        [this.closeCtrl, this.nav],
        {
          opacity: 0,
          scale: 0,
        },
        'start'
      )
      .add(() => {
        this.controls.classList.remove('controls--open');
      }, 'start')
      .to(
        [this.sliderTitle.main, this.sliderTitle.desc],
        {
          yPercent: (pos) => (pos ? 150 : 100),
          opacity: (pos) => (pos ? 0 : 1),
          onComplete: () => gsap.set(this.sliderTitle.el, { opacity: 0 }),
        },
        'start'
      )
      .add(() => {
        // Save current state  of all images
        const flipstate = Flip.getState(this.gridImages, { props: 'filter' });
        // Change layout
        this.introGrid.classList.remove('intro-grid--slider');
        gsap.set(this.gridImages[this.current], {
          filter: 'brightness(100%) hue-rotate(0deg)',
        });
        gsap.set(this.introGrid, {
          yPercent: 0,
        });
        // Animate all
        Flip.from(flipstate, {
          duration: DURATION,
          ease: EASE,
          absolute: true,
          stagger: {
            each: 0.02,
            from: this.current,
          },
          simple: true,
          prune: true,
        });
      }, 'start')
      .to(
        [this.gridLabels, Object.values(this.gridTitle)],
        {
          yPercent: 0,
        },
        'start'
      );
  }

  /**
   * triggerAnimation
   */
  public triggerAnimation() {
    // Grid images click event
    this.gridImages.forEach((image) => {
      image.addEventListener('click', () => this.showSlider(image));

      image.addEventListener('mouseenter', () => {
        if (this.mode === 'slider') return;
        gsap.fromTo(
          image,
          {
            filter: 'brightness(100%) hue-rotate(0deg)',
          },
          {
            duration: 1,
            ease: 'power4',
            filter: 'brightness(200%) hue-rotate(130deg)',
          }
        );
      });

      image.addEventListener('mouseleave', () => {
        if (this.mode === 'slider') return;
        gsap.to(image, {
          duration: 1,
          ease: 'power4',
          filter: 'brightness(100%) hue-rotate(0deg)',
        });
      });

      this.closeCtrl.addEventListener('click', () => this.hideSlider());
    });
  }
}
