import React from "react";
const Sponsor = () => {
  const sponsors = [
    { src: "/khMedia/celo.webp", link: "https://celo.org/" },
    { src: "/khMedia/de.webp", link: "https://devfolio.co/" },
    { src: "/khMedia/gd.webp", link: "https://developers.google.com/" },
    { src: "/khMedia/hr.webp", link: "https://hoverrobotix.com/" },
    { src: "/khMedia/ihub.webp", link: "https://www.ihubiitmandi.in/" },
    { src: "/khMedia/sntc.webp", link: "https://sntc.iitmandi.co.in/" },
    { src: "/khMedia/catalyst.webp", link: "https://www.iitmandicatalyst.in/" },
    { src: "/khMedia/coding.webp", link: "https://www.codingninjas.com/" },
    { src: "/khMedia/appWrite.webp", link: "https://appwrite.io/" },
    { src: "/khMedia/xyz.webp", link: "https://www.xyz.xyz/" },
    { src: "/khMedia/interview.webp", link: "https://interviewbuddy.net/" },
    { src: "/khMedia/sharp.webp", link: "https://sharpplatform.com/" },
    {
      src: "/khMedia/givemycertificate.webp",
      link: "https://givemycertificate.com/",
    },
    { src: "/khMedia/devdock.webp", link: "https://devdock.ai/" },
    { src: "/khMedia/appwrite.webp", link: "https://appwrite.io/" },
  ];

  return (
    <div className="relative w-full mt-8 bg-black py-10">
      <h2 className="text-center text-4xl font-bold text-white mb-6 font-arcade">
        Our Sponsors
      </h2>

      <div className="relative overflow-hidden w-full">
        <div className="sponsor-track flex gap-8">
          {/* First set of sponsors */}
          {sponsors.map((sponsor, index) => (
            <a
              key={`sponsor1-${index}`}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
              <img
                src={sponsor.src}
                alt={`Sponsor ${index + 1}`}
                className="w-32 h-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
          ))}
          {/* Duplicate set of sponsors for seamless loop */}
          {sponsors.map((sponsor, index) => (
            <a
              key={`sponsor2-${index}`}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
              <img
                src={sponsor.src}
                alt={`Sponsor ${index + 1}`}
                className="w-32 h-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
      <style jsx>{`
        .sponsor-track {
          animation: scroll 20s linear infinite;
          width: fit-content;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .sponsor-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .sponsor-track {
            animation-duration: 10s;
          }
        }
      `}</style>
    </div>
  );
};

export default Sponsor;
