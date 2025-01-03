"use client"
import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Hero from '../components/KrackHack/Hero';
import Footer from '../components/KrackHack/Footer';
import Sponsor from '../components/KrackHack/sponsors';

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
        <Sponsor></Sponsor>
        <Footer></Footer>
    </>
  );
};

export default KrackHack;
