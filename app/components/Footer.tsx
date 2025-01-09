"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { handleSignIn, handleSignOut } from "./GDGTeam";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const Footer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="text-gray-200 py-5 relative">
      <div className="md:container mx-auto px-4 flex-col">
        <div className="text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://gdg.community.dev/gdg-on-campus-indian-institute-of-technology-mandi-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-200 text-2xl transition-transform duration-300 hover:text-gray-50 hover:scale-110">
              <i className="fa-brands fa-google"></i>
            </a>
            <a
              href="https://github.com/GDG-IIT-Mandi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 text-2xl transition-transform duration-300 hover:text-gray-800 hover:scale-110">
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.instagram.com/gdg_iitmandi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 text-2xl transition-transform duration-300 hover:text-[#e1306c] hover:scale-110">
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/google-developer-groups-iit-mandi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 text-2xl transition-transform duration-300 hover:text-[#0077b5] hover:scale-110">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="mailto:gdgiitmandi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 text-2xl transition-transform duration-300 hover:text-[#1da1f2] hover:scale-110">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
          <p className="text-sm text-white">
            Copyright &copy; 2025 All rights reserved by GDG, IIT Mandi
          </p>
        </div>
        <div className="md:absolute md:right-4 md:bottom-4 relative justify-center flex mt-2">
          <div className="inline-flex items-center gap-2 rounded-lg border-white border-2 p-1 ">
            <Image src="/iitm.jpeg" alt="IIT Mandi" width={50} height={50} />
            {isAuthenticated ? (
              <button
                onClick={() => handleSignOut(setIsAuthenticated)}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => handleSignIn(setIsAuthenticated)}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                For Team
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
