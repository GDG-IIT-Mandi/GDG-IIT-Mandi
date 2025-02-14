"use client";

import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    title: "AI & Machine Learning",
    isLocked: false,
    problem:
      "Develop an AI-based assistant that helps visually impaired individuals navigate public spaces.",
  },
  {
    title: "Blockchain & Crypto",
    isLocked: true,
    problem:
      "Create a decentralized voting system using blockchain to ensure transparent elections.",
  },
  {
    title: "IoT & Smart Cities",
    isLocked: false,
    problem:
      "Design an IoT-enabled waste management system that optimizes garbage collection.",
  },
  {
    title: "Health Tech",
    isLocked: true,
    problem:
      "Develop an AI-powered early disease detection system using patient health records.",
  },
  {
    title: "Fintech",
    isLocked: true,
    problem:
      "Build an AI-based personal finance assistant to help users manage expenses.",
  },
  {
    title: "Sustainability",
    isLocked: true,
    problem:
      "Create a platform that rewards users for reducing carbon emissions in daily activities.",
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
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-lg text-gray-600 mt-2">{problem}</p>
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
    }, 4000); // Auto-scroll every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-10 flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Hackathon Themes</h2>

      <div className="relative flex items-center justify-center overflow-hidden w-full max-w-4xl">
        <div className="flex w-full justify-center">
          <AnimatePresence mode="wait">
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Themes;
