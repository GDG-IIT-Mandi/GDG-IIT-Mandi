import React from 'react';
import { Code } from '@chakra-ui/react';
const AboutUs: React.FC = () => {
  return (
    <section className="relative bg-black text-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden animate-on-scroll" id='aboutUsSection'>
      <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient font-arcade">
            What is KrackHack?
        </h2>
        
        <p className="text-lg md:text-xl text-center leading-relaxed mb-8 text-gray-300">
        KrackHack is a 48-hour hybrid hackathon in Even Semester, open to students passionate about using technology for real-world problem-solving. The event spans proposal submission, development, and presentation stages. Teams submit proposals online, and the top 15 proceed to develop working prototypes within the 48-hour timeframe. The final stage involves presenting ideas and prototypes, with a panel judging and selecting the most innovative solutions. This is an internal hackathon, the top team will then get a chance to participate in “Bit and Build'25 “, a pan india competition organized by GDSC CRCE.
        </p>

        <div className="flex justify-center mt-8">
          <a 
            href="#gallery2023"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-black font-semibold py-2 px-6 rounded-md transition-transform transform hover:scale-105">
            See Last Year's Gallery Below!
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
