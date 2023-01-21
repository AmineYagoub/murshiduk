import {
  Renderer,
  Program,
  Mesh,
  Triangle,
  Vec2,
  Texture,
  OGLRenderingContext,
} from 'ogl-typescript';
import { gsap } from 'gsap';
import ColorThief from '@colorthief/colorthief';

interface State {
  isAnimating: boolean;
  currentTextureIndex: number;
  texture0: Texture;
  texture1: Texture;
}
interface Color {
  primary: string;
  secondary: string;
}
interface UI {
  buttons: any;
  slides: NodeListOf<Element>;
}

const images = [
  '/img/istanbul.jpg',
  '/img/trabzon.jpg',
  '/img/cappadocia.jpg',
  '/img/antalya.jpg',
  '/img/amasya.jpg',
];

export class WebGLCarousel {
  private wrapper: HTMLSelectElement;
  private renderer: Renderer;
  private program: Program;
  private gl: OGLRenderingContext;
  private geometry: Triangle;
  private mesh: Mesh;
  private textures: Texture[];
  private noiseTexture: Texture[];
  private colors: Color[];
  private state: State;
  private ui: UI;

  constructor() {
    this.wrapper = document.querySelector('[data-canvas-wrapper]');
    this.state = {
      isAnimating: false,
      currentTextureIndex: 0,
      texture0: null,
      texture1: null,
    };
    this.ui = {
      buttons: document.querySelectorAll('[data-carousel-control]'),
      slides: document.querySelectorAll('[data-slide]'),
    };
  }

  public init() {
    this.createRenderer();
    this.loadTextures().then(() => {
      this.createScene();
      this.addListeners();
      this.onResize();
      gsap.ticker.add(() => {
        this.program.uniforms.uTime.value += 0.1;
        this.program.uniforms.uTexture0Size.value = new Vec2(
          this.state.texture0.width,
          this.state.texture0.height
        );
        this.program.uniforms.uTexture1Size.value = new Vec2(
          this.state.texture1.width,
          this.state.texture1.height
        );
        this.renderer.render({ scene: this.mesh });
      });
    });
  }

  /**
   * Animate the carousel towards the next slide.
   *
   */
  private onButtonClick(e) {
    // Do nothing if an animation is already running
    if (this.state.isAnimating) return;

    // Get the direction of the clicked button (defaults to 1)
    const direction = Number(e.currentTarget.dataset.dir ?? 1);

    // Define the index of the texture that will be set as texture1
    let nextTextureIndex = this.state.currentTextureIndex + direction;

    if (nextTextureIndex < 0) nextTextureIndex = this.textures.length - 1;

    if (nextTextureIndex >= this.textures.length) nextTextureIndex = 0;

    const currentSlide = this.ui.slides[this.state.currentTextureIndex];
    const currentSlideTitle = currentSlide.querySelector('[data-slide-title]');
    const currentSlideCopy = currentSlide.querySelector('[data-slide-copy]');

    const nextSlide = this.ui.slides[nextTextureIndex];
    const nextSlideTitle = nextSlide.querySelector('[data-slide-title]');
    const nextSlideCopy = nextSlide.querySelector('[data-slide-copy]');

    const tl = gsap.timeline({
      onStart: () => {
        // Prevent any other animation from starting
        this.state.isAnimating = true;

        // Define the direction of the rotation during the transition
        this.program.uniforms.uAnimationDirection.value = direction;

        // Set the next texture to display
        this.state.texture1 = this.textures[nextTextureIndex];
        this.program.uniforms.uTexture1.value = this.state.texture1;

        // Set the background colors of the next slide
        this.program.uniforms.uBackground1.value = [
          this.colors[nextTextureIndex].primary,
          this.colors[nextTextureIndex].secondary,
        ];
      },
      onComplete: () => {
        // Re-enable animations
        this.state.isAnimating = false;

        // Reset the `uProgress` uniform ...
        this.program.uniforms.uProgress.value = 0;

        // ... and set what was only the next texture as current texture
        this.state.texture0 = this.textures[nextTextureIndex];
        this.program.uniforms.uTexture0.value = this.state.texture0;

        // Same thing with the background colors
        this.program.uniforms.uBackground0.value = [
          this.colors[nextTextureIndex].primary,
          this.colors[nextTextureIndex].secondary,
        ];

        // End of the animation. Set the new texture's index as the current one.
        this.state.currentTextureIndex = nextTextureIndex;
      },
    });

    tl.add('start')
      .to(currentSlideTitle, {
        '--progress': 110,
        duration: 0.5,
      })
      .fromTo(
        nextSlideTitle,
        { '--progress': -110 },
        {
          '--progress': 0,
          duration: 1,
        },
        '<0.1'
      )

      .to(currentSlideCopy, { opacity: 0, duration: 0.35 }, 'start+=0.1')
      .to(nextSlideCopy, { opacity: 1, duration: 0.5 }, '>')

      .to(
        this.program.uniforms.uProgress,
        {
          value: 1,
          duration: 1.5,
        },
        'start'
      );
  }

  /**
   * Load an image as an OGL `Texture` object.
   *
   */
  private loadTexture(url: string, params = {}) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        const texture = new Texture(this.gl, {
          ...params,
          image: img,
        });
        resolve(texture);
      };
    });
  }

  /**
   * Load all the images from the `this.texturesURLs` array and the noise texture.
   *
   */
  private loadTextures() {
    return new Promise((resolve) => {
      const textures = images.map((url) => this.loadTexture(url));
      const colorThief = new ColorThief();
      Promise
        // Load the images for the carousel
        .all(textures)
        .then((res: Texture[]) => {
          // Fill an array of colors for each texture
          // to use for the background
          this.colors = res.map((e) => {
            return {
              primary: colorThief.getColor(e.image),
              secondary: colorThief.getPalette(e.image)[3],
            };
          });

          this.textures = res;
          this.state.texture0 = res[0];
          this.state.texture1 = res[1];
        })

        // Load the noise texture
        .then(() => {
          return this.loadTexture('/img/Noise_18.jpg', {
            wrapS: this.gl.REPEAT,
            wrapT: this.gl.REPEAT,
          });
        })
        .then((res: Texture[]) => {
          this.noiseTexture = res;
          resolve(true);
        });
    });
  }

  private createRenderer() {
    this.renderer = new Renderer();
    this.gl = this.renderer.gl;
    this.wrapper.appendChild(this.gl.canvas);
    this.gl.clearColor(1, 1, 1, 1);
  }

  createScene() {
    this.geometry = new Triangle(this.gl);
    this.program = new Program(this.gl, {
      vertex: require('../glsl/effect.vertex.glsl'),
      fragment: require('../glsl/effect.fragment.glsl'),
      uniforms: {
        // uTime: { value: 0 },
        uProgress: { value: 0.25 },
        uResolution: {
          value: new Vec2(
            this.gl.canvas.clientWidth,
            this.gl.canvas.clientHeight
          ),
        },
        uGridSize: {
          value: new Vec2(7, 5),
        },
        uTexture0: {
          value: this.state.texture0,
        },
        uTexture0Size: {
          value: new Vec2(
            this.state.texture0.width,
            this.state.texture0.height
          ),
        },
        uTexture1: {
          value: this.state.texture1,
        },
        uTexture1Size: {
          value: new Vec2(
            this.state.texture1.width,
            this.state.texture1.height
          ),
        },
        uNoiseTexture: {
          value: this.noiseTexture,
        },
        uBackground0: {
          value: [this.colors[0].primary, this.colors[0].secondary],
        },
        uBackground1: {
          value: [this.colors[1].primary, this.colors[1].secondary],
        },
        uTime: { value: 0 },
        uAnimationDirection: { value: 1 },
      },
    });

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
  }

  private addListeners() {
    window.addEventListener('resize', this.onResize.bind(this), {
      passive: true,
    });
    for (const button of this.ui.buttons) {
      button.addEventListener('click', this.onButtonClick.bind(this), {
        passive: true,
      });
    }
  }

  private onResize() {
    this.renderer.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight);
    this.program.uniforms.uResolution.value = new Vec2(
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight
    );
  }
}
