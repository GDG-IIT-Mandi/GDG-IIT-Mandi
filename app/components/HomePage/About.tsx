import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="relative bg-black text-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden" id='aboutUsSection'>
      <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient">
          About Us
        </h2>
        
        <p className="text-lg md:text-xl text-center leading-relaxed mb-8 text-gray-300">
          Welcome to GDG IIT Mandi! Our mission is to foster a vibrant tech community for students passionate about 
          Google Developer technologies. We organize events, workshops, and hackathons to encourage collaboration, 
          learning, and growth among tech enthusiasts. Whether you're a beginner or an experienced developer, 
          GDG IIT Mandi is the perfect place to connect, learn, and make an impact.
        </p>

        <div className="flex justify-center mt-8">
          <a 
            href="/events"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-black font-semibold py-2 px-6 rounded-md transition-transform transform hover:scale-105">
            Explore Our Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
