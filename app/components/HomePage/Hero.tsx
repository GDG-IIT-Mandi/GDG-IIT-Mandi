"use client"
import Script from 'next/script';
import React, { useEffect } from 'react';

const Hero: React.FC = () => {
  useEffect(() => {
    // Ensures Vanta effect fills the viewport on load
    const background = document.getElementById('homepage-background');
    if (background) {
      background.style.width = '100vw';
      background.style.height = '100vh';
      background.style.position = 'fixed';
      background.style.top = '0';
      background.style.left = '0';
    }
  }, []);

  return (
    <div>
      <div id="homepage-background"></div>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
        strategy="beforeInteractive"
      />
      <Script id="script">
        {`VANTA.DOTS({
          el: "#homepage-background",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xffffff,
          color2: 0xffffff,
          backgroundColor: 0x0,
          showLines: false
        });`}
      </Script>
    </div>
  );
};

export default Hero;
