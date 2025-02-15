"use client";

import React, { useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
  LinkIcon,
} from "lucide-react";

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
    {
      Icon: LinkIcon,
      color: "text-blue-500",
      href: "https://linktr.ee/gdg_iitmandi",
    },
    { Icon: X, color: "text-blue-400", href: "https://x.com/gdg_iitmandi" },
    {
      Icon: Instagram,
      color: "text-pink-500",
      href: "https://www.instagram.com/gdg_iitmandi/",
    },
    {
      Icon: Linkedin,
      color: "text-blue-700",
      href: "https://www.linkedin.com/company/google-developer-groups-iit-mandi/posts/?feedView=all",
    },
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
            target="_blank"
            className={`${color} hover:scale-110 transition-transform duration-200`}>
            <Icon className="w-6 h-6 cursor-pointer" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBar;
