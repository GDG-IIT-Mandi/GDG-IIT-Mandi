"use client"
import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Hero from '../components/KrackHack/Hero';
import Footer from '../components/Footer';
import Sponsor from '../components/KrackHack/sponsors';
import AboutUs from '../components/KrackHack/About';
import { Gallery } from '../components/KrackHack/Gallery';
import ContactUs from '../components/KrackHack/ContactUs';

const KrackHack: React.FC = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
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
        <Gallery></Gallery>
        <Sponsor></Sponsor>
        <ContactUs></ContactUs>
        <Footer></Footer>
    </>
  );
};

export default KrackHack;
