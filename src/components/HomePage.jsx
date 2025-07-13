// src/components/HomePage.jsx

import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/hero-bromo.jpg')` }}>
      <div className="bg-white/80 p-8 rounded-2xl shadow-md max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Selamat Datang</h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Website Resmi Badan Pusat Statistik<br />
          Provinsi Jawa Timur
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Menyediakan data statistik yang akurat, mutakhir, dan terpercaya
          untuk mendukung perencanaan dan evaluasi pembangunan daerah.
          <br />
          <br />
        </p>
        <div className="bg-[#314158]/25 p-8 rounded-2xl shadow-md max-w-xl text-center">
            <blockquote className="italic text-[#3D365C] text-sm mt-4 border-l-4 pl-4 border-gray-600">
                BPS – Lembaga yang Independen, Tepercaya, dan Berperan Aktif dalam Mendukung Perumusan Kebijakan Berbasis Data<br />
                <br />
                <span className="font-semibold">"Data yang akurat adalah fondasi pembangunan yang berkelanjutan."</span>
            </blockquote>
        </div>
      </div>
    </div>
  );
}
