import React from "react";
import { Calendar, Users, Rocket, Code, Trophy } from "lucide-react";

const TimelineItem = ({ icon: Icon, title, date, description, isLast }) => (
  <div className="flex-1 relative">
    {/* Connector line */}
    {!isLast && (
      <div className="absolute w-full h-0.5 bg-blue-200 top-8 left-1/2 z-0" />
    )}

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center gap-2">
      {/* Icon circle */}
      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Text content */}
      <div className="text-center mt-2">
        <h3 className="font-semibold text-lg text-red-500">{title}</h3>
        <p className="text-sm font-medium text-blue-600 mb-1">{date}</p>
        <p className="text-sm text-green-600 max-w-[200px]">{description}</p>
      </div>
    </div>
  </div>
);

const Timeline = () => {
  const stages = [
    {
      icon: Calendar,
      title: "Registration Opens",
      date: "March 1",
      description:
        "Submit your application and form your team of up to 4 members",
    },
    {
      icon: Users,
      title: "Team Formation",
      date: "March 15",
      description: "Network with other participants and finalize your team",
    },
    {
      icon: Users,
      title: "Kickoff Event",
      date: "March 20",
      description: "Join us for project briefing and technical workshops",
    },
    {
      icon: Rocket,
      title: "Project Submission",
      date: "March 22",
      description: "Submit your project for evaluation",
    },
    {
      icon: Trophy,
      title: "Demo Day",
      date: "March 23",
      description: "Present your solution and awards ceremony",
    },
  ];

  return (
    <div className="w-full rounded-lg shadow-lg p-8">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage, index) => (
            <TimelineItem
              key={stage.title}
              {...stage}
              isLast={index === stages.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
