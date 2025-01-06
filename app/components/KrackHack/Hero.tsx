"use client";

import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // State for growing stats
  const [participants, setParticipants] = useState(0);
  const [sponsors, setSponsors] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const countUp = (start: number, end: number, duration: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(Math.floor(progress / (duration / (end - start))), end - start);
      setter(start + increment);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatsVisible(true);
    }, 1500); 
    window.addEventListener('scroll', handleScroll);
    countUp(0, 3500, 6000, setParticipants);
    countUp(0, 6, 6000, setSponsors); 

    return () =>{ clearTimeout(timer);window.removeEventListener('scroll', handleScroll);}
  }, []);
    const backgroundStyle = {
        background: `linear-gradient(to bottom, #000000 ${100 - scrollY / 5}%, rgba(162, 104, 255, 0.8) ${Math.min(scrollY / 2, 100)}%)`,
        transition: 'background 0.3s ease-out',
    };
  return (
    <div className="relative z-1 flex flex-col items-center pt-32">
      <div id="homepage-background"></div>

      <motion.div
        className="absolute left-[40%] w-12 h-12 rounded-md sm:block hidden"
        initial={{ x: 0 }}
        animate={{ x: -150, y: ["0", "-10px", "0px"] }} 
        transition={{
          x: { duration: 1, ease: "easeOut" },
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
        className="absolute right-[40%] w-12 h-12 rounded-md sm:block hidden"
        initial={{ x: 0 }} 
        animate={{ x: 150, y: ["0", "-10px", "0px"] }}
        transition={{
          x: { duration: 1, ease: "easeOut" },
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

      <TypeAnimation
        sequence={[
          'KRACK HACK',
          1200, 
          () => setShowSubtitle(true), 
        ]}
        wrapper="h1"
        speed={50}
        className="lg:text-4xl sm:text-2xl  text-purple-600 drop-shadow-lg font-arcade"
        repeat={0}
      />

      {showSubtitle && (
        <Link href="#">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }} 
            className="mt-5 flex flex-col items-center text-xl text-white justify-center "
          >
            <p className="text-xl text-gray-300 mt-4 font-medium">
              The long awaited Hackathon is Here!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 rounded-full bg-[#a268ff] text-white font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:bg-[#357ae8] sparkle-button"
            >
              Registrations open soon
            </motion.button>
          </motion.div>
        </Link>
      )}

      {statsVisible && (
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 2 }}
  className="mt-16 p-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl shadow-xl max-w-4xl mx-auto text-white text-center"
>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="px-6 py-4 text-lg bg-gray-800 rounded-lg shadow-lg">
              <span className="font-semibold">Participants:</span> {participants}+
            </div>
            <div className="px-6 py-4 text-lg bg-gray-800 rounded-lg shadow-lg">
              <span className="font-semibold">Prizes Worth:</span> 1.5L+
            </div>
            <div className="px-6 py-4 text-lg bg-gray-800 rounded-lg shadow-lg">
              <span className="font-semibold">Sponsors:</span> {sponsors}+
            </div>
  </div>
</motion.div>


      )}

      <div className="pb-[20vh]" />
    </div>
  );
};

export default Hero;
