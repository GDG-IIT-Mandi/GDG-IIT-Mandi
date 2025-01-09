import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Glimpse = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to GDG",
      description: "Discover what it means to be in GDG",
      image: "/homeMedia/slide1.webp",
      link: "https://developers.google.com/profile/u/me/dashboard",
      color: "text-red-500",
    },
    {
      title: "Develop Innovative Softwares",
      description: "Transforming ideas into reality",
      image: "/homeMedia/slide2.webp",
      link: "https://developers.google.com/solutions/catalog",
      color: "text-green-500",
    },
    {
      title: "Expert Community Support",
      description: "Join the worldwide community of developers",
      image: "/homeMedia/slide3.webp",
      link: "https://developers.google.com/community",
      color: "text-blue-500",
    },
    {
      title: "Empowering Tools",
      description: "Get Access to Google's SDKs for Developers like you.",
      image: "/homeMedia/slide4.webp",
      link: "https://developers.google.com/products",
      color: "text-yellow-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="relative w-3/4 mx-auto h-96 overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-gray-900 to-black">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <Link legacyBehavior href={slide.link} key={index} passHref>
            <a className="relative flex-shrink-0 w-full h-full group">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50  transition-all" />
              {/* Highlight Effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:shadow-xl transition-all" />
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-white text-center space-y-4">
                <h2
                  className={`text-5xl font-extrabold ${slide.color} drop-shadow-lg`}>
                  {slide.title}
                </h2>
                <p
                  className={`text-xl text-gray-300 ${slide.color} leading-relaxed max-w-lg"`}>
                  {slide.description}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-colors">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-colors">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Glimpse;
