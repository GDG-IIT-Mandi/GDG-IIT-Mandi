import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './sponsor.css';

const sponsors = [
  { src: '/assets/celo.webp', link: 'https://celo.org/' },
  { src: '/assets/de.webp', link: 'https://devfolio.co/' },
  { src: '/assets/gd.webp', link: 'https://developers.google.com/' },
  { src: '/assets/hr.webp', link: 'https://hoverrobotix.com/' },
  { src: '/assets/ihub.webp', link: 'https://www.ihubiitmandi.in/' },
];

const Sponsor: React.FC = () => {
  return (
    <div className="relative w-full mt-8 bg-black py-12">
      <h2 className="text-center text-4xl font-bold text-white mb-6">
        Our Past Sponsors
      </h2>

      <div className="overflow-hidden">
        {/* Marquee effect with infinite scrolling without duplicating sponsors */}
        <div className="sponsor-marquee flex py-4">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="transition-transform transform hover:scale-110">
              <Link legacyBehavior href={sponsor.link} passHref>
                <a target="_blank">
                  <Image
                    src={sponsor.src}
                    alt={`Sponsor ${index}`}
                    width={400}  // Increased width
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
