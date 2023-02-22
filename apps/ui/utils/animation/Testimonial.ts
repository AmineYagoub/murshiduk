import gsap from 'gsap';

type Direction = 'right' | 'left';

export class TestimonialAnimation {
  private buttons: {
    prev: HTMLButtonElement;
    next: HTMLButtonElement;
  };
  private cardsContainerEl: HTMLDivElement;
  private appBgContainerEl: HTMLDivElement;
  private cardInfosContainerEl: HTMLDivElement;

  constructor() {
    this.buttons = {
      prev: document.querySelector('.btn--left'),
      next: document.querySelector('.btn--right'),
    };
    this.cardsContainerEl = document.querySelector('.cards__wrapper');
    this.appBgContainerEl = document.querySelector('.testimonial__bg');
    this.cardInfosContainerEl = document.querySelector('.info__wrapper');
    this.buttons.next.addEventListener('click', () => this.swapCards('right'));

    this.buttons.prev.addEventListener('click', () => this.swapCards('left'));
  }

  private swapCards(direction: Direction) {
    const currentCardEl = this.cardsContainerEl.querySelector(
      '.current--card'
    ) as HTMLDivElement;
    this.changeInfo(direction);
    this.swapCardsClass(direction, currentCardEl);
    this.removeCardEvents(currentCardEl);
  }

  private swapCardsClass(direction: Direction, currentCardEl: HTMLDivElement) {
    const previousCardEl = this.cardsContainerEl.querySelector(
      '.previous--card'
    ) as HTMLDivElement;
    const nextCardEl = this.cardsContainerEl.querySelector(
      '.next--card'
    ) as HTMLDivElement;

    const currentBgImageEl = this.appBgContainerEl.querySelector(
      '.current--image'
    ) as HTMLDivElement;
    const previousBgImageEl = this.appBgContainerEl.querySelector(
      '.previous--image'
    ) as HTMLDivElement;
    const nextBgImageEl = this.appBgContainerEl.querySelector(
      '.next--image'
    ) as HTMLDivElement;

    currentCardEl.classList.remove('current--card');
    previousCardEl.classList.remove('previous--card');
    nextCardEl.classList.remove('next--card');

    currentBgImageEl.classList.remove('current--image');
    previousBgImageEl.classList.remove('previous--image');
    nextBgImageEl.classList.remove('next--image');

    //currentCardEl.style.zIndex = '50';
    currentBgImageEl.style.zIndex = '-2';

    if (direction === 'right') {
      //previousCardEl.style.zIndex = '20';
      //nextCardEl.style.zIndex = '30';

      nextBgImageEl.style.zIndex = '-1';

      currentCardEl.classList.add('previous--card');
      previousCardEl.classList.add('next--card');
      nextCardEl.classList.add('current--card');

      currentBgImageEl.classList.add('previous--image');
      previousBgImageEl.classList.add('next--image');
      nextBgImageEl.classList.add('current--image');
    } else if (direction === 'left') {
      //previousCardEl.style.zIndex = '30';
      //nextCardEl.style.zIndex = '20';

      previousBgImageEl.style.zIndex = '-1';

      currentCardEl.classList.add('next--card');
      previousCardEl.classList.add('current--card');
      nextCardEl.classList.add('previous--card');

      currentBgImageEl.classList.add('next--image');
      previousBgImageEl.classList.add('current--image');
      nextBgImageEl.classList.add('previous--image');
    }
  }

  private changeInfo(direction: Direction) {
    const currentInfoEl = this.cardInfosContainerEl.querySelector(
      '.current--info'
    ) as HTMLDivElement;
    const previousInfoEl = this.cardInfosContainerEl.querySelector(
      '.previous--info'
    ) as HTMLDivElement;
    const nextInfoEl = this.cardInfosContainerEl.querySelector(
      '.next--info'
    ) as HTMLDivElement;

    gsap
      .timeline()
      .to([this.buttons.prev, this.buttons.next], {
        duration: 0.2,
        opacity: 0.5,
        pointerEvents: 'none',
      })
      .to(
        currentInfoEl.querySelectorAll('.text'),
        {
          duration: 0.4,
          stagger: 0.1,
          translateY: '-120px',
          opacity: 0,
        },
        '-='
      )
      .call(() => {
        this.swapInfosClass(
          currentInfoEl,
          previousInfoEl,
          nextInfoEl,
          direction
        );
      })
      .call(() => this.initCardEvents())
      .fromTo(
        direction === 'right'
          ? nextInfoEl.querySelectorAll('.text')
          : previousInfoEl.querySelectorAll('.text'),
        {
          opacity: 0,
          translateY: '40px',
        },
        {
          duration: 0.4,
          stagger: 0.1,
          translateY: '0px',
          opacity: 1,
        }
      )
      .to([this.buttons.prev, this.buttons.next], {
        duration: 0.2,
        opacity: 1,
        pointerEvents: 'all',
      });
  }

  private swapInfosClass(
    currentInfoEl: HTMLDivElement,
    previousInfoEl: HTMLDivElement,
    nextInfoEl: HTMLDivElement,
    direction: 'right' | 'left'
  ) {
    currentInfoEl.classList.remove('current--info');
    previousInfoEl.classList.remove('previous--info');
    nextInfoEl.classList.remove('next--info');

    if (direction === 'right') {
      currentInfoEl.classList.add('previous--info');
      nextInfoEl.classList.add('current--info');
      previousInfoEl.classList.add('next--info');
    } else if (direction === 'left') {
      currentInfoEl.classList.add('next--info');
      nextInfoEl.classList.add('previous--info');
      previousInfoEl.classList.add('current--info');
    }
  }

  private updateCard(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const box = card.getBoundingClientRect();
    const centerPosition = {
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    };
    const angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
    gsap.set(card, {
      '--current-card-rotation-offset': `${angle}deg`,
    });
    const currentInfoEl =
      this.cardInfosContainerEl?.querySelector('.current--info');
    gsap.set(currentInfoEl, {
      rotateY: `${angle}deg`,
    });
  }

  private resetCardTransforms(e: Event) {
    const card = e.currentTarget;
    const currentInfoEl =
      this.cardInfosContainerEl?.querySelector('.current--info');
    gsap.set(card, {
      '--current-card-rotation-offset': 0,
    });
    gsap.set(currentInfoEl, {
      rotateY: 0,
    });
  }

  private removeCardEvents(card: HTMLDivElement) {
    card.removeEventListener('pointermove', this.updateCard);
  }

  private initCardEvents() {
    const currentCardEl = this.cardsContainerEl.querySelector('.current--card');
    currentCardEl.addEventListener('pointermove', this.updateCard);
    currentCardEl.addEventListener('pointerout', (e) => {
      this.resetCardTransforms(e);
    });
  }

  private init() {
    const tl = gsap.timeline();
    tl.to(this.cardsContainerEl.children, {
      delay: 0.15,
      duration: 0.5,
      stagger: {
        ease: 'power4.inOut',
        from: 'end',
        amount: 0.1,
      },
      '--card-translateY-offset': '0%',
    })
      .to(
        this.cardInfosContainerEl
          .querySelector('.current--info')
          .querySelectorAll('.text'),
        {
          delay: 0.5,
          duration: 0.4,
          stagger: 0.1,
          opacity: 1,
          translateY: 0,
        }
      )
      .to(
        [this.buttons.prev, this.buttons.next],
        {
          duration: 0.4,
          opacity: 1,
          pointerEvents: 'all',
        },
        '-=0.4'
      );
  }

  initAnimation() {
    // this.initCardEvents(); 3d Hover....
    gsap.set(this.cardsContainerEl.children, {
      '--card-translateY-offset': '100vh',
    });
    gsap.set(
      this.cardInfosContainerEl
        .querySelector('.current--info')
        .querySelectorAll('.text'),
      {
        translateY: '40px',
        opacity: 0,
      }
    );
    gsap.set([this.buttons.prev, this.buttons.next], {
      pointerEvents: 'none',
      opacity: '0',
    });
    this.init();
  }
}
