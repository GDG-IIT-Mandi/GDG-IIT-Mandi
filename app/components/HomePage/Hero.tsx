"use client";
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero: React.FC = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const background = document.getElementById('homepage-background');
    if (background) {
      background.style.width = '100vw';
      background.style.height = '100vh';
      background.style.position = 'fixed';
      background.style.top = '0';
      background.style.left = '0';
      background.style.zIndex = '-1'; // Keep background behind content
    }
  }, []);

  return (
    <div className="relative z-1 flex flex-col items-center pt-32">
      <div id="homepage-background"></div>
      
      {/* Load necessary scripts */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
        strategy="beforeInteractive"
      />
      <Script id="vanta-init-script">
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

      {/* Floating Side Divs */}
      <motion.div
        className="absolute left-[40%] w-12 h-12 rounded-md"
        initial={{ x: 0 }} // Start at center
        animate={{ x: -150, y: ["0", "-10px", "0px"] }} // Move left and then float
        transition={{
          x: { duration: 1.5, ease: "easeOut" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Image
          src="/symbol_l.webp"
          alt="Left Symbol"
          width={10000}
          height={10000}
          quality={100}
        />
      </motion.div>
      <motion.div
        className="absolute right-[40%] w-12 h-12 rounded-md"
        initial={{ x: 0 }} // Start at center
        animate={{ x: 150, y: ["0", "-10px", "0px"] }} // Move right and then float
        transition={{
          x: { duration: 1.5, ease: "easeOut" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Image
          src="/symbol_r.webp"
          alt="Right Symbol"
          width={10000}
          height={10000}
          quality={100}
        />
      </motion.div>

      {/* Typing Animation */}
      <TypeAnimation
        sequence={[
          'GDG IIT Mandi', // Text to type
          2000, // Wait 2 seconds at the end
          () => setShowSubtitle(true), // Show the subtitle after the typing animation
        ]}
        wrapper="h1"
        speed={50}
        className="text-4xl font-bold text-white drop-shadow-lg"
        repeat={0}
      />

      {/* Subtitle that appears after the main text with framer-motion */}
      {showSubtitle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }} // 0.5-second delay for smooth entrance
          className="mt-5 text-xl text-white justify-center"
        >
          Welcome to the Google Developer Group at IIT Mandi
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
