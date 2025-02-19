import React from "react";
interface Sponsor {
  src: string;
  link: string;
}

type SponsorSize = "large" | "medium" | "small";

interface SponsorSectionProps {
  title: string;
  sponsors: Sponsor[];
  size: SponsorSize;
}
const Sponsor = () => {
  const sponsorTiers = {
    platinum: [
      { src: "/khMedia/agent.webp", link: "https://agent.ai/" },
      { src: "/khMedia/sharp.webp", link: "https://sharpplatform.com/" },
      {
        src: "/khMedia/csharp.webp",
        link: "https://www.linkedin.com/company/sharp-economy/",
      },
    ],
    gold: [
      { src: "/khMedia/devdock.webp", link: "https://devdock.ai/" },
      { src: "/khMedia/de.webp", link: "https://devfolio.co/" },
    ],
    silver: [
      { src: "/khMedia/xyz.webp", link: "https://www.xyz.xyz/" },
      {
        src: "/khMedia/givemycertificate.webp",
        link: "https://givemycertificate.com/",
      },
      { src: "/khMedia/appwrite.webp", link: "https://appwrite.io/" },
      { src: "/khMedia/interview.webp", link: "https://interviewbuddy.net/" },
    ],
    past: [
      { src: "/khMedia/gd.webp", link: "https://developers.google.com/" },
      { src: "/khMedia/hr.webp", link: "https://hoverrobotix.com/" },
      { src: "/khMedia/ihub.webp", link: "https://www.ihubiitmandi.in/" },
      { src: "/khMedia/sntc.webp", link: "https://sntc.iitmandi.co.in/" },
      {
        src: "/khMedia/catalyst.webp",
        link: "https://www.iitmandicatalyst.in/",
      },
      { src: "/khMedia/coding.webp", link: "https://www.codingninjas.com/" },
      { src: "/khMedia/celo.webp", link: "https://celo.org/" },
    ],
  };

  const SponsorSection: React.FC<SponsorSectionProps> = ({
    title,
    sponsors,
    size,
  }) => (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-6 text-center font-arcade">
        {title} Sponsors
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {sponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-300">
            <img
              src={sponsor.src}
              alt={`${title} Sponsor ${index + 1}`}
              className={`object-contain filter transition-all duration-300 ${
                size === "large"
                  ? "w-28 h-28"
                  : size === "medium"
                  ? "w-28 h-28"
                  : "w-16 h-16"
              }`}
            />
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-full mt-8 bg-black py-10 px-4">
      <h2 className="text-center text-4xl font-bold text-white mb-12 font-arcade">
        Our Sponsors
      </h2>

      <div className="space-y-12">
        {/* Platinum section - full width */}
        <SponsorSection
          title="Platinum"
          sponsors={sponsorTiers.platinum}
          size="large"
        />

        {/* Gold and Silver section - side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SponsorSection
            title="Gold"
            sponsors={sponsorTiers.gold}
            size="large"
          />
          <SponsorSection
            title="Silver"
            sponsors={sponsorTiers.silver}
            size="large"
          />
        </div>

        {/* Past section - full width */}
        <SponsorSection
          title="Past"
          sponsors={sponsorTiers.past}
          size="small"
        />
      </div>
    </div>
  );
};

export default Sponsor;

// const Sponsor = () => {
// const sponsors = [
//   { src: "/khMedia/celo.webp", link: "https://celo.org/" },
//   { src: "/khMedia/de.webp", link: "https://devfolio.co/" },
//   { src: "/khMedia/gd.webp", link: "https://developers.google.com/" },
//   { src: "/khMedia/hr.webp", link: "https://hoverrobotix.com/" },
//   { src: "/khMedia/ihub.webp", link: "https://www.ihubiitmandi.in/" },
//   { src: "/khMedia/sntc.webp", link: "https://sntc.iitmandi.co.in/" },
//   { src: "/khMedia/catalyst.webp", link: "https://www.iitmandicatalyst.in/" },
//   { src: "/khMedia/coding.webp", link: "https://www.codingninjas.com/" },
//   { src: "/khMedia/appwrite.webp", link: "https://appwrite.io/" },
//   { src: "/khMedia/xyz.webp", link: "https://www.xyz.xyz/" },
//   { src: "/khMedia/interview.webp", link: "https://interviewbuddy.net/" },
//   { src: "/khMedia/sharp.webp", link: "https://sharpplatform.com/" },
//   {
//     src: "/khMedia/givemycertificate.webp",
//     link: "https://givemycertificate.com/",
//   },
//   { src: "/khMedia/devdock.webp", link: "https://devdock.ai/" },
//   { src: "/khMedia/appwrite.webp", link: "https://appwrite.io/" },
// ];
//   return (
//     <div className="relative w-full mt-8 bg-black py-10">
//       <h2 className="text-center text-4xl font-bold text-white mb-6 font-arcade">
//         Our Sponsors
//       </h2>

//       <div className="relative overflow-hidden w-full">
//         <div className="sponsor-track flex gap-8">
//           {/* First set of sponsors */}
//           {sponsors.map((sponsor, index) => (
//             <a
//               key={`sponsor1-${index}`}
//               href={sponsor.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
//               <img
//                 src={sponsor.src}
//                 alt={`Sponsor ${index + 1}`}
//                 className="w-32 h-32 object-contain filter transition-all duration-300"
//               />
//             </a>
//           ))}
//           {/* Duplicate set of sponsors for seamless loop */}
//           {sponsors.map((sponsor, index) => (
//             <a
//               key={`sponsor2-${index}`}
//               href={sponsor.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
//               <img
//                 src={sponsor.src}
//                 alt={`Sponsor ${index + 1}`}
//                 className="w-32 h-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
//               />
//             </a>
//           ))}
//         </div>
//       </div>
//       <style jsx>{`
//         .sponsor-track {
//           animation: scroll 20s linear infinite;
//           width: fit-content;
//         }

//         @keyframes scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .sponsor-track:hover {
//           animation-play-state: paused;
//         }

//         @media (max-width: 768px) {
//           .sponsor-track {
//             animation-duration: 10s;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Sponsor;
