"use client";

import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
const themes = [
  {
    title: "Malware File Scanner Web App",
    isLocked: false,
    problem:
      "Build a web application that performs static analysis on uploaded files, flags malicious indicators, and provides a verdict ('Malicious' or 'Clean').",
  },
  {
    title: "Blockchain-Based Event Ticketing System",
    isLocked: false,
    problem:
      "Create a blockchain-powered ticketing system where each ticket is an NFT, ensuring authenticity, fair pricing, and resale royalties.",
  },
  {
    title: "Time Capsule 2.0",
    isLocked: false,
    problem:
      "Develop a web platform where users can create, store, and share digital time capsules containing text, images, and videos, which can be locked until a future date.",
  },
  {
    title: "IIT Mandi Campus Marketplace",
    isLocked: false,
    problem:
      "Create a mobile application for IIT Mandi that facilitates buying, selling, and exchanging items securely within the campus community.",
  },
  {
    title: "Intelligent Traffic Perception",
    isLocked: false,
    problem:
      "Develop a deep learning model to process real-time traffic video, identifying multiple object classes such as vehicles, pedestrians, and traffic signs.",
  },
  {
    title: "Autonomous Application Builder",
    isLocked: false,
    problem:
      "Develop a multi-agent AI system that builds and deploys web applications based on user prompts, with agents for design, development, and project management.",
  },
  {
    title: "Surprise",
    isLocked: false,
    problem:
      "A mystery challenge awaits! Unveil a unique problem statement that pushes boundaries in technology and innovation.",
  },
];

//@ts-expect-error
const ThemeCard = ({ title, problem, isLocked, active }) => (
  <motion.div
    className={`relative border rounded-lg p-6 text-center overflow-hidden w-[320px] md:w-[450px] lg:w-[500px] ${
      active ? "scale-100 shadow-2xl z-10" : "scale-90 opacity-50"
    }`}
    initial={{ opacity: 0.5, scale: 0.9 }}
    animate={{ opacity: active ? 1 : 0.5, scale: active ? 1 : 0.9 }}
    transition={{ duration: 0.6 }}>
    <h3 className="text-2xl text-gray-50 font-bold">{title}</h3>
    <p className="text-lg text-gray-300 mt-2">{problem}</p>
    {isLocked && (
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
        <Lock className="w-10 h-10 text-white" />
      </div>
    )}
  </motion.div>
);

const Themes = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % themes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-10 flex flex-col items-center w-full">
      <h2 className="text-3xl font-arcade mb-6 text-center">
        Hackathon Themes
      </h2>

      <div className="relative flex items-center justify-center overflow-hidden w-full max-w-4xl">
        <div className="flex w-full justify-center">
          <AnimatePresence mode="wait">
            <Link
              href="https://drive.google.com/file/d/1HRf5FfrV9kCAeUmvXOOx0qS5UDZh4Dbw/view?usp=sharing"
              target="_blank">
              <motion.div
                key={themes[index].title}
                className="relative"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.8 }}>
                <ThemeCard
                  title={themes[index].title}
                  problem={themes[index].problem}
                  isLocked={themes[index].isLocked}
                  active={true}
                />
              </motion.div>
            </Link>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="https://drive.google.com/file/d/1jzeRy-LjQ9aL0OBQCM8PSN68KiFpTgzM/view?usp=sharing"
          target="_blank"
          className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-black font-semibold py-2 px-6 rounded-md transition-transform transform hover:scale-105">
          Have a look at the rules!
        </Link>
      </div>
    </div>
  );
};

export default Themes;
