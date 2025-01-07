import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Glimpse = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Our Platform",
      description: "Discover amazing features and possibilities",
      bgColor: "bg-green-500",
    },
    {
      title: "Innovative Solutions",
      description: "Transforming ideas into reality",
      bgColor: "bg-blue-500",
    },
    {
      title: "Expert Support",
      description: "24/7 assistance at your fingertips",
      bgColor: "bg-red-500",
    },
    {
      title: "Expert Support",
      description: "24/7 assistance at your fingertips",
      bgColor: "bg-yellow-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full h-full ${slide.bgColor} flex flex-col items-center justify-center text-white p-8`}>
            <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
            <p className="text-xl">{slide.description}</p>
          </div>
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
