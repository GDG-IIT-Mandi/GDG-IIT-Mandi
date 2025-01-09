"use client";
import React, { useState } from "react";

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src); // Set the clicked image as the selected image
  };

  const handleModalClose = () => {
    setSelectedImage(null); // Clear the selected image when closing the modal
  };

  return (
    <div id="gallery2023" className="animate-on-scroll">
      <div className="relative bg-black text-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 animate-bg-move opacity-30 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 font-arcade">
            Gallery
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {[
              "/galleryKH/gal1.webp",
              "/galleryKH/gal2.webp",
              "/galleryKH/gal3.webp",
              "/galleryKH/gal4.webp",
            ].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`2023 KrackHack Image ${index + 1}`}
                className="cursor-pointer rounded-md hover:scale-105 transition-transform duration-300"
                onClick={() => handleImageClick(src)} // Open modal on image click
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleModalClose}>
          <div
            className="relative bg-white rounded-lg  w-100 max-w-5xl shadow-lg"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Button
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              onClick={handleModalClose}
            >
              ✕
            </button> */}
            <img
              src={selectedImage}
              alt="Selected Image"
              className="rounded-md w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
