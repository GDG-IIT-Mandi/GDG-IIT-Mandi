"use client";
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import Hero from "./componentsSelf/Hero";
import Footer from "../components/Footer";
import Sponsor from "./componentsSelf/sponsors";
import AboutUs from "./componentsSelf/About";
import { Gallery } from "./componentsSelf/Gallery";
import ContactUs from "./componentsSelf/ContactUs";
import Winners from "./componentsSelf/winners";
import Stats from "./componentsSelf/stats";

const KrackHack: React.FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Hero></Hero>
      <AboutUs></AboutUs>
      <Stats></Stats>
      <Winners></Winners>
      <Gallery></Gallery>
      <Sponsor></Sponsor>
      <ContactUs></ContactUs>
    </>
  );
};

export default KrackHack;
