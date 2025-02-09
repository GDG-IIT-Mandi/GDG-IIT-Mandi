"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [participants, setParticipants] = useState(0);
  const [sponsors, setSponsors] = useState(0);

  const eventStart = "Feb 22";
  const eventEnd = "Feb 23";
  const eventYear = "2025";
  const registrationDeadline = new Date("2025-02-21T23:59:59");

  const calculateTimeLeft = () => {
    const difference = registrationDeadline.getTime() - new Date().getTime();

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }
  };


  const eventStart = "Feb 22";
  const eventEnd = "Feb 23";
  const eventYear = "2025";
  const registrationDeadline = new Date("2025-02-21T23:59:59");

  const calculateTimeLeft = () => {
    const difference = registrationDeadline.getTime() - new Date().getTime();

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };


  const countUp = (
    start: number,
    end: number,
    duration: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(
        Math.floor(progress / (duration / (end - start))),
        end - start
      );
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

    calculateTimeLeft();
    const countdownTimer = setInterval(calculateTimeLeft, 1000);


    calculateTimeLeft();
    const countdownTimer = setInterval(calculateTimeLeft, 1000);

    window.addEventListener("scroll", handleScroll);
    countUp(0, 1000, 6000, setParticipants);
    countUp(0, 6, 6000, setSponsors);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
      clearInterval(countdownTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const backgroundStyle = {
    background: `linear-gradient(to bottom, #000000 ${
      100 - scrollY / 5
    }%, rgba(162, 104, 255, 0.8) ${Math.min(scrollY / 2, 100)}%)`,
    transition: "background 0.3s ease-out",
  };


  return (
    <div className="relative z-1 flex flex-col items-center pt-32">
      <div id="homepage-background"></div>

      <motion.div
        className="absolute left-[40%] w-12 h-12 rounded-md"
        className="absolute left-[40%] w-12 h-12 rounded-md"
        initial={{ x: -10 }}
        animate={{ x: -150, y: ["0", "-10px", "0px"] }}
        transition={{
          x: { duration: 1, ease: "easeOut" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}>
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
        className="absolute right-[40%] w-12 h-12 rounded-md"
        initial={{ x: 10 }}
        animate={{ x: 150, y: ["0", "-10px", "0px"] }}
        transition={{
          x: { duration: 1, ease: "easeOut" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}>
        <Image
          src="/symbol_r.webp"
          alt="Right Symbol"
          width={10000}
          height={10000}
          quality={100}
        />
      </motion.div>

      <TypeAnimation
        sequence={["KRACK HACK", 1200, () => setShowSubtitle(true)]}
        wrapper="h1"
        speed={50}
        className="lg:text-4xl sm:text-3xl text-purple-600 drop-shadow-lg font-arcade"
        className="lg:text-4xl sm:text-3xl text-purple-600 drop-shadow-lg font-arcade"
        repeat={0}
      />

      {showSubtitle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0 }}
          className="mt-5 flex flex-col items-center text-xl text-white justify-center">
          className="mt-5 flex flex-col items-center text-xl text-white justify-center">
          <p className="text-xl text-gray-300 mt-4 font-medium text-center">
            Fueling innovation since 2022: Where ideas ignite and dreams take
            flight!
          </p>
          <Link href="/" target="_blank">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xl  bg-clip-text text-purple-600 font-arcade md:text-3xl">
            {eventStart} - {eventEnd}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-2xl  mt-2 bg-clip-text  text-purple-600 font-arcade md:text-4xl">
            {eventYear}
          </motion.div>

          <div className="mt-8 grid grid-cols-4 gap-6 w-full max-w-2xl px-4">
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="bg-[#DB4437] rounded-lg p-4 shadow-lg">
                <div className="text-xl font-bold text-white md:text-3xl">
                  {timeLeft.days}
                </div>
              </div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="bg-[#0F9D58] rounded-lg p-4 shadow-lg">
                <div className="text-xl font-bold text-white md:text-3xl">
                  {timeLeft.hours}
                </div>
              </div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="bg-[#4285F4] rounded-lg p-4 shadow-lg">
                <div className="text-xl font-bold text-white md:text-3xl">
                  {timeLeft.minutes}
                </div>
              </div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="bg-[#F4B400] rounded-lg p-4 shadow-lg">
                <div className="text-xl font-bold text-white md:text-3xl">
                  {timeLeft.seconds}
                </div>
              </div>
            </div>
          </div>

          <Link href="https://krackhack-2.devfolio.co/" target="_blank">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-6 py-3 rounded-full bg-[#a268ff] text-white font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:bg-[#357ae8] sparkle-button">
              className="mt-8 px-6 py-3 rounded-full bg-[#a268ff] text-white font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:bg-[#357ae8] sparkle-button">
              Register Now
            </motion.button>
          </Link>
        </motion.div>
      )}

      {statsVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-16 p-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl shadow-xl max-w-4xl mx-auto text-white text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="px-6 py-4 text-lg bg-gray-800 rounded-lg shadow-lg">
              <span className="font-semibold">Participants:</span>{" "}
              {participants}+
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

      <div className="pb-[5vh]" />
    </div>
  );
};

export default Hero;
