import React from "react";
import Link from "next/link";
const WhatWeDo: React.FC = () => {
  return (
    <section
      className="relative bg-black text-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden"
      id="whatwedo">
      <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient">
          What we do
        </h2>

        <p className="text-lg md:text-xl text-center leading-relaxed mb-8 text-gray-300">
          Welcome to GDG IIT Mandi! needs change needs change needs change needs
          change needs change needs change needs change needs change needs
          change needs change needs change needs change needs change needs
          change needs change needs change needs change needs change needs
          change needs change needs change needs change needs change needs
          change needs change needs change needs change needs change needs
          change needs change needs change needs change needs change needs
          change
        </p>

        <div className="flex justify-center mt-8">
          <Link
            href="/Highlights"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-black font-semibold py-2 px-6 rounded-md transition-transform transform hover:scale-105">
            Explore Our Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;