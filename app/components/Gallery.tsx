"use client";
import React, { useEffect, useState } from "react";
import { useScroll, motion } from "framer-motion";
import Image from "next/image";

const HorizontalScrollBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const [horizontalOffset, setHorizontalOffset] = useState(-1000);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    return scrollY.on("change", (latestScroll) => {
      setHorizontalOffset(-1000 + latestScroll * 2);
      setOpacity(Math.min(latestScroll / 1000, 0.6));
    });
  }, [scrollY]);

  const images = [
    "chrome",
    "cloud",
    "drive",
    "firebase",
    "go",
    "google",
    "lens",
    "mail",
    "maps",
    "meet",
    "play",
    "tf",
    "watch",
    "yt",
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <motion.div
        className="absolute top-1/2 flex flex-nowrap whitespace-nowrap px-4"
        style={{
          transform: `translateX(${horizontalOffset}px) translateY(-50%)`,
          opacity: opacity,
        }}>
        {images.map((img, index) => (
          <div
            key={index}
            className="min-w-[80px] sm:min-w-[100px] h-auto mx-2">
            <Image
              src={`/homeMedia/${img}.webp`}
              alt={img}
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalScrollBackground;
