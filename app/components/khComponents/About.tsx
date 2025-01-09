import React from "react";
const AboutUs: React.FC = () => {
  return (
    <section
      className="relative bg-black text-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden animate-on-scroll"
      id="aboutUsSection">
      <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient font-arcade">
          What is KrackHack?
        </h2>

        <p className="text-lg md:text-xl text-center leading-relaxed mb-8 text-gray-300">
          Welcome to KrackHack, a premier 48-hour hybrid hackathon designed to
          ignite innovation and empower students to tackle real-world challenges
          through technology. This dynamic event unfolds in the Even Semester,
          bringing together bright minds to ideate, develop, and present
          transformative solutions. With stages ranging from proposal submission
          to prototype development and final presentations, KrackHack offers a
          comprehensive platform for creativity and problem-solving. The top
          team earns the honor of representing their institution at “Bit and
          Build'25”, a prestigious pan-India competition by GDSC CRCE. Join us
          in shaping the future, one breakthrough at a time.
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
