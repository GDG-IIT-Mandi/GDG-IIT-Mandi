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

  const divArray = Array.from({ length: 1 });

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <motion.div
        className="absolute top-1/2 flex space-x-4"
        style={{
          transform: `translateX(${horizontalOffset}px) translateY(-50%)`,
          opacity: opacity,
        }}>
        {divArray.map((_, index) => (
          <div
            key={index}
            className="rounded-md flex justify-center items-center"
            style={{
              minWidth: "100px",
              minHeight: "100px",
              margin: "0",
              overflow: "hidden",
            }}>
            <Image
              src="/homeMedia/chrome.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/cloud.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/drive.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/firebase.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/go.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/google.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/lens.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/mail.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/maps.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/meet.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/play.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/tf.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/watch.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
            <Image
              src="/homeMedia/yt.webp"
              alt="Google"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalScrollBackground;
