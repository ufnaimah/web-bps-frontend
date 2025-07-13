// src/components/GalleryPage.jsx

import React, { useState } from 'react';
import img1 from '../assets/gallery/pertanian.jpg';
import img2 from '../assets/gallery/sawah.jpg';
import img3 from '../assets/gallery/pantai.jpg';
import img4 from '../assets/gallery/terasering.jpg';
import img5 from '../assets/gallery/pedagang.jpg';
import img6 from '../assets/gallery/pasar.jpg';

const images = [img1, img2, img3, img4, img5, img6];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Galeri Publikasi BPS Provinsi Jawa Timur
      </h1>

      {/* Preview utama */}
      <div className="flex justify-center mb-8">
        <div className="w-full md:w-2/3 border-4 border-white/50 rounded-lg shadow-xl overflow-hidden">
          <img
            src={selectedImage}
            alt="Preview utama"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(src)}
            className={`h-24 w-full object-cover rounded cursor-pointer transition duration-200 hover:scale-105 border-2 ${
              selectedImage === src ? 'border-blue-500' : 'border-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
