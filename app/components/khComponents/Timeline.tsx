"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Users,
  Rocket,
  Code,
  Trophy,
  LucideIcon,
} from "lucide-react";

interface TimelineItemProps {
  icon: LucideIcon;
  title: string;
  date: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon: Icon,
  title,
  date,
  description,
}) => (
  <div className="relative flex flex-col items-center text-center min-w-[180px] md:min-w-[220px]">
    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
    </div>
    <div className="mt-3">
      <h3 className="font-semibold text-lg text-white">{title}</h3>
      <p className="text-lg font-medium text-gray-300">{date}</p>
      <p className="text-lg text-gray-400 mt-1 max-w-[180px] md:max-w-[200px]">
        {description}
      </p>
    </div>
  </div>
);

const Timeline: React.FC = () => {
  const stages: TimelineItemProps[] = [
    {
      icon: Calendar,
      title: "Pre-Hackathon",
      date: "7th Feb 2025",
      description: "Pre-Hackathon Session",
    },
    {
      icon: Users,
      title: "Opening Ceremony",
      date: "21st Feb 2025",
      description: "Opening Ceremony (12 AM)",
    },
    {
      icon: Code,
      title: "Mid-Submission",
      date: "22nd Feb 2025",
      description: "Mid-Submission Deadline (Noon)",
    },
    {
      icon: Rocket,
      title: "Final Submission",
      date: "23rd Feb 2025",
      description: "Final Submission (12 AM)",
    },
    {
      icon: Trophy,
      title: "Closing Ceremony",
      date: "3rd March 2025",
      description: "Closing Ceremony",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = container.offsetHeight;

        const distanceFromTop = rect.top;

        const progress =
          ((windowHeight - distanceFromTop) * 1.3) /
          (windowHeight + elementHeight);

        const clampedProgress = Math.min(1, Math.max(0, progress));

        setScrollProgress(clampedProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full p-6 lg:p-10 bg-black" ref={containerRef}>
      <h2 className="text-center text-2xl lg:text-3xl font-bold mb-10 text-white">
        Timeline
      </h2>
      <div className="relative flex overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-9 lg:gap-3 px-4 min-w-full lg:min-w-0 lg:mx-auto">
          <div
            className="lg:top-8 lg:left-0 lg:w-full lg:h-1 top-0 left-6 h-full w-1 hidden absolute lg:block"
            style={{
              background: `linear-gradient(${
                !isMobile ? "to right" : "to bottom"
              }, rgb(147, 51, 234) ${scrollProgress * 100}%, rgb(55, 65, 81) ${
                scrollProgress * 100
              }%)`,
            }}
          />

          {stages.map((stage, index) => (
            <div key={index} className="relative flex-1">
              <TimelineItem {...stage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
