"use client";
import React, { useEffect } from "react";
import Hero from "../components/khComponents/Hero";
import Sponsor from "../components/khComponents/sponsors";
import AboutUs from "../components/khComponents/About";
import { Gallery } from "../components/khComponents/Gallery";
import ContactUs from "../components/khComponents/ContactUs";
import Winners from "../components/khComponents/winners";
import Stats from "../components/khComponents/stats";
import { Provider } from "../components/khComponents/provider";
export default function KrackHack() {
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
