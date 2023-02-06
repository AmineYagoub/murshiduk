import Script from 'next/script';
import React from 'react';

const ShareButtons = () => {
  return (
    <>
      <div className="sharethis-inline-share-buttons" />
      <Script
        async
        src="https://platform-api.sharethis.com/js/sharethis.js#property=63e0bfa24a4876001374e0e3&product=inline-share-buttons&source=platform"
      ></Script>
    </>
  );
};

export default ShareButtons;
