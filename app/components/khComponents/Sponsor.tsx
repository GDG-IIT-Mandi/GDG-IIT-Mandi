import React from "react";
// import Image from 'next/image';
import { Image } from "@chakra-ui/react";
import Link from "next/link";
import "./Sponsor.module.css";

const sponsors = [
  { src: "/khMedia/celo.webp", link: "https://celo.org/" },
  { src: "/khMedia/de.webp", link: "https://devfolio.co/" },
  { src: "/khMedia/gd.webp", link: "https://developers.google.com/" },
  { src: "/khMedia/hr.webp", link: "https://hoverrobotix.com/" },
  { src: "/khMedia/ihub.webp", link: "https://www.ihubiitmandi.in/" },
  { src: "/khMedia/celo.webp", link: "https://celo.org/" },
  { src: "/khMedia/de.webp", link: "https://devfolio.co/" },
  { src: "/khMedia/gd.webp", link: "https://developers.google.com/" },
  { src: "/khMedia/hr.webp", link: "https://hoverrobotix.com/" },
  { src: "/khMedia/ihub.webp", link: "https://www.ihubiitmandi.in/" },
];

const Sponsor: React.FC = () => {
  return (
    <div className="relative w-full mt-8 bg-black py-10">
      <h2 className="text-center text-4xl font-bold text-white mb-6 font-arcade">
        Our Past Sponsors
      </h2>

      <div className="sponsor-container">
        {/* Marquee effect with infinite scrolling without duplicating sponsors */}
        <div className="sponsor-marquee flex py-4">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="transition-transform transform hover:scale-110">
              <Link legacyBehavior href={sponsor.link} passHref>
                <a target="_blank">
                  <Image
                    rounded={"md"}
                    src={sponsor.src}
                    alt={`Sponsor ${index}`}
                    width={400} // Increased width
                    height={200} // Increased height
                    objectFit="contain"
                    className="filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
