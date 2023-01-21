import { WebGLCarousel } from '@/utils/index';
import { memo, useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      const gl = new WebGLCarousel();
      gl.init();
    }
    console.log(canvas);
  }, []);
  return (
    <>
      <div id="canvas-wrapper" data-canvas-wrapper></div>
      <div id="slides">
        <div className="slide" data-slide>
          <span
            className="slide__zero slide__title | font-display"
            data-slide-title
          >
            Aesthete
          </span>
          <span className="slide__copy | font-copy" data-slide-copy>
            Chicago
          </span>
        </div>

        <div className="slide" data-slide>
          <span
            className="slide__progress slide__title | font-display"
            data-slide-title
          >
            Raconteur
          </span>
          <span
            className="slide__copy | font-copy"
            data-slide-copy
            style={{ opacity: 0 }}
          >
            Florence
          </span>
        </div>

        <div className="slide" data-slide>
          <span
            className="slide__progress slide__title | font-display"
            data-slide-title
          >
            Daemonia
          </span>
          <span
            className="slide__copy | font-copy"
            data-slide-copy
            style={{ opacity: 0 }}
          >
            Rome
          </span>
        </div>

        <div className="slide" data-slide>
          <span
            className="slide__progress slide__title | font-display"
            data-slide-title
          >
            Lassitude
          </span>
          <span
            className="slide__copy | font-copy"
            data-slide-copy
            style={{ opacity: 0 }}
          >
            Paris
          </span>
        </div>

        <div className="slide" data-slide>
          <span
            className="slide__progress slide__title | font-display"
            data-slide-title
          >
            Istanbul
          </span>
          <span
            className="slide__copy | font-copy"
            data-slide-copy
            style={{ opacity: 0 }}
          >
            Turkey
          </span>
        </div>
      </div>

      <nav id="controls">
        <button className="font-display" data-carousel-control data-dir="-1">
          Prev
        </button>
        <button className="font-display" data-carousel-control data-dir="1">
          Next
        </button>
      </nav>
    </>
  );
};

export default memo(HeroSection);
