"use client";
import React, { useEffect } from "react";
import Hero from "../components/khComponents/Hero";
import Sponsor from "../components/khComponents/Sponsor";
import AboutUs from "../components/khComponents/About";
import Gallery from "../components/khComponents/Gallery";
import ContactUs from "../components/khComponents/ContactUs";
import Winners from "../components/khComponents/Winner";
import Stats from "../components/khComponents/Statistics";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
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
      <ChakraProvider value={defaultSystem}>
        <Hero></Hero>
        <AboutUs></AboutUs>
        <Stats></Stats>
        <Winners></Winners>
        <Gallery></Gallery>
        <Sponsor></Sponsor>
        <ContactUs></ContactUs>
      </ChakraProvider>
    </main>
  );
}
