"use client";

import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    title: "Generative AI",
    isLocked: true,
    problem:
      "Explore how generative AI models like GPT can be used for creative content generation, automated storytelling, and personalized learning.",
  },
  {
    title: "Machine Learning",
    isLocked: true,
    problem:
      "Develop predictive models that analyze large datasets to uncover patterns, trends, and insights in various domains such as healthcare and finance.",
  },
  {
    title: "Deep Learning",
    isLocked: true,
    problem:
      "Build advanced neural networks that enhance image recognition, natural language processing, and autonomous decision-making systems.",
  },
  {
    title: "Blockchain",
    isLocked: true,
    problem:
      "Create secure and decentralized applications leveraging blockchain technology for industries like finance, supply chain, and digital identity verification.",
  },
  {
    title: "Cybersecurity",
    isLocked: true,
    problem:
      "Design AI-powered cybersecurity solutions to detect threats, prevent cyber attacks, and secure digital infrastructure.",
  },
  {
    title: "Web Development",
    isLocked: true,
    problem:
      "Develop modern web applications with seamless user experiences using the latest frameworks and technologies like Next.js and React.",
  },
  {
    title: "App Development",
    isLocked: true,
    problem:
      "Build innovative mobile applications for iOS and Android that leverage AI, IoT, and cloud computing for enhanced user engagement.",
  },
  {
    title: "Surprise",
    isLocked: true,
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
