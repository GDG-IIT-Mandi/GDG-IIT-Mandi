"use client";

import React, { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const SocialBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialIcons = [
    { Icon: Facebook, color: "text-blue-500", href: "#" },
    { Icon: Twitter, color: "text-blue-400", href: "#" },
    { Icon: Instagram, color: "text-pink-500", href: "#" },
    { Icon: Linkedin, color: "text-blue-700", href: "#" },
  ];

  return (
    <div
      className={`fixed right-4 transition-all duration-300 ease-in-out z-50 ${
        isScrolled ? "top-1/2 -translate-y-1/2" : "top-full"
      }`}>
      <div className="flex flex-col gap-4">
        {socialIcons.map(({ Icon, color, href }, index) => (
          <a
            key={index}
            href={href}
            className={`${color} hover:scale-110 transition-transform duration-200`}>
            <Icon className="w-6 h-6 cursor-pointer" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBar;
