import React from "react";
import Link from "next/link";
const AboutUs: React.FC = () => {
  return (
    <section
      className="relative bg-black text-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden"
      id="aboutUsSection">
      <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient">
          About Us
        </h2>

        <p className="text-lg md:text-xl text-center leading-relaxed mb-8 text-gray-300">
          GDG stands for Google Developer Group. Google DGs are a program run by
          Google to support and empower students who are interested in
          technology. They provide resources and support for students to learn
          and apply their skills, including access to Google technologies,
          mentorship from Google experts, and opportunities to connect with
          other students and professionals in the tech industry.<br></br>
          GDG IIT Mandi was established in AY 2021-22 by Shubham Saurav
          (B19222). The GDG Leads are chosen by Google itself through a
          transparent application and interview process. It has conducted about
          30 events since it started last year, including sessions, talks,
          hackathons, bootcamps, study jams, etc. Kindly find more details about
          the past events in the next section. Since GDG is a known and renowned
          student club, we are often reached out by various speakers, other
          colleges, and organisations such as Coding Ninjas, FOSS
          for collaborations.
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

export default AboutUs;
