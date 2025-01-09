"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";

const Hero: React.FC = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const background = document.getElementById("homepage-background");
    if (background) {
      background.style.width = "100vw";
      background.style.height = "100vh";
      background.style.position = "fixed";
      background.style.top = "0";
      background.style.left = "0";
      background.style.zIndex = "-1";
    }
  }, []);

  return (
    <div className="relative z-1 flex flex-col items-center pt-32">
      <div id="homepage-background"></div>
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
      <motion.div
        className="absolute left-[40%] w-12 h-12 rounded-md"
        initial={{ x: 0 }}
        animate={{ x: -150, y: ["0", "-10px", "0px"] }}
        transition={{
          x: { duration: 1.5, ease: "easeOut" },
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
        initial={{ x: 0 }}
        animate={{ x: 150, y: ["0", "-10px", "0px"] }}
        transition={{
          x: { duration: 1.5, ease: "easeOut" },
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
        sequence={["GDG IIT Mandi", 2000, () => setShowSubtitle(true)]}
        wrapper="h1"
        speed={80}
        className="text-4xl font-bold text-white drop-shadow-lg"
        repeat={0}
      />
      {showSubtitle && (
        <>
          <Link href="#aboutUsSection">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-5 flex flex-col items-center text-xl text-white justify-center ">
              <p>Welcome to the Google Developer Group at IIT Mandi</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 rounded-full bg-[#4285F4] text-white font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:bg-[#357ae8]">
                Explore
              </motion.button>
            </motion.div>
          </Link>
          <Link href="/krackhack">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px #FF2E63, 0 0 40px #FF2E63",
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0 0 10px #FF2E63",
                }}
                className="relative mt-6 px-10 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-bold text-lg flex items-center gap-3 shadow-lg shadow-rose-500/20 transition-all duration-300 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 border border-rose-400/20">
                <Zap className="w-5 h-5" />
                Let's KrackHack!
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "1px solid rgba(255, 46, 99, 0.3)",
                    boxShadow: "0 0 10px rgba(255, 46, 99, 0.3)",
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </motion.div>
          </Link>
        </>
      )}
      <div className="pb-[100vh]" /> {/* Adjust value as needed */}
    </div>
  );
};

export default Hero;
