import React from "react";
import { Image } from "@chakra-ui/react";
import Link from "next/link";

const sponsors = [
  { src: "/khMedia/celo.webp", link: "https://celo.org/" },
  { src: "/khMedia/de.webp", link: "https://devfolio.co/" },
  { src: "/khMedia/gd.webp", link: "https://developers.google.com/" },
  { src: "/khMedia/hr.webp", link: "https://hoverrobotix.com/" },
  { src: "/khMedia/ihub.webp", link: "https://www.ihubiitmandi.in/" },
];

const SponsorMarquee = () => {
  const renderSponsors = () => (
    <div className="flex space-x-8">
      {sponsors.map((sponsor, index) => (
        <div
          key={index}
          className="transition-transform transform hover:scale-110 min-w-[200px]">
          <Link legacyBehavior href={sponsor.link} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Image
                rounded="md"
                src={sponsor.src}
                alt={`Sponsor ${index}`}
                width={400}
                height={200}
                objectFit="contain"
                className="filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full mt-8 bg-black py-12">
      <h2 className="text-center text-4xl font-bold text-white mb-6 font-arcade">
        Our Past Sponsors
      </h2>

      <div className="overflow-hidden">
        <div className="sponsor-marquee flex animate-scroll">
          {renderSponsors()}
          {renderSponsors()}
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause animation on hover */
        .sponsor-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default SponsorMarquee;
