"use client";
import React, { useEffect } from "react";
import Hero from "./componentsSelf/Hero";
import Sponsor from "./componentsSelf/sponsors";
import AboutUs from "./componentsSelf/About";
import { Gallery } from "./componentsSelf/Gallery";
import ContactUs from "./componentsSelf/ContactUs";
import Winners from "./componentsSelf/winners";
import Stats from "./componentsSelf/stats";
import { Provider } from "./components/provider";
export default function Krackhack() {
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
    <main>
      <Provider>
        <Hero></Hero>
        <AboutUs></AboutUs>
        <Stats></Stats>
        <Winners></Winners>
        <Gallery></Gallery>
        <Sponsor></Sponsor>
        <ContactUs></ContactUs>
      </Provider>
    </main>
  );
}
