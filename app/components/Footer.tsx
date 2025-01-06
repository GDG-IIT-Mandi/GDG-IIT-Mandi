import React from "react";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className=" text-gray-200 py-5 text-center">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-200 text-2xl transition-transform duration-300 hover:text-[#1877f2] hover:scale-110">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-200 text-2xl transition-transform duration-300 hover:text-gray-800 hover:scale-110">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-200 text-2xl transition-transform duration-300 hover:text-[#e1306c] hover:scale-110">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-gray-200 text-2xl transition-transform duration-300 hover:text-red-600 hover:scale-110">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-gray-200 text-2xl transition-transform duration-300 hover:text-[#1da1f2] hover:scale-110">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
      <p className="mt-2 text-sm text-white">Copyright &copy; 2025 All rights reserved by GDG, IIT Mandi</p>
    </footer>
  );
};

export default Footer;
