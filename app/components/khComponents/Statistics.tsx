import React from "react";
import { Heading } from "@chakra-ui/react";
interface Stat {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const statsData: Stat[] = [
  {
    title: "Projects Completed",
    value: "25+",
    description: "Successfully delivered projects",
    icon: <i className="fas fa-check-circle text-blue-500"></i>,
  },
  {
    title: "Teams",
    value: "50+",
    description: "Enthusiatic and skilled Students",
    icon: <i className="fas fa-users text-green-500"></i>,
  },
  {
    title: "Prizes Won Worth",
    value: "1.5L+",
    description: "Recognized for excellence",
    icon: <i className="fas fa-trophy text-purple-500"></i>,
  },
];

const Stats: React.FC = () => {
  return (
    <div className="bg-black text-white py-12 px-6">
      <h2 className=" font-bold mb-6 text-center text-gradient">
        <Heading className="text-4xl sm:text-2xl font-arcade ">
          KrackHack 2024 Statistics
        </Heading>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">{stat.icon}</div>
            <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
            <p className="text-3xl font-extrabold">{stat.value}</p>
            <p className="text-gray-400 mt-2 text-center">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
