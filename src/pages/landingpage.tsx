import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FilterBar } from '../components/property/FilterBar';
import heroBgImg from '../assets/img/hero-bg.png'; // Memanggil aset gambar hero Anda

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-50">
      {/* Navigasi Atas */}
      <Navbar />

      {/* Konten Utama */}
      <main className="flex-grow">
        
        {/* Hero Section dengan Gambar Latar Belakang */}
        <section 
          className="relative w-full h-[600px] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        >
          {/* Overlay Gelap Halus untuk Meningkatkan Kontras Teks dan Filter */}
          <div className="absolute inset-0 bg-slate-900/40 z-0"></div>

          {/* Konten di dalam Hero */}
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-20 text-center flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl text-white font-bold leading-tight mb-4 drop-shadow-sm">
              Temukan Ruang Nyaman <br /> Untuk Masa Depan Anda
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-[600px] drop-shadow-sm">
              Marketplace properti modern terpercaya dengan ribuan listing pilihan terbaik yang divalidasi langsung oleh tim ahli kami.
            </p>
            
            {/* Memasang Bilah Pencarian Transparan */}
            <FilterBar />
          </div>
        </section>

        {/* Section Properti Unggulan (Akan dihubungkan ke Database Supabase di tahap berikutnya) */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-20 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-2">Rekomendasi Properti Terbaru</h2>
              <p className="text-slate-600 text-sm">Pilihan properti paling hot di lokasi strategis khusus untuk Anda.</p>
            </div>
            <a href="/search" className="text-primary font-semibold hover:text-primary-dark text-sm mt-2 md:mt-0 inline-flex items-center space-x-1">
              <span>Lihat Semua</span>
              <span>→</span>
            </a>
          </div>

          {/* Grid Kontainer Sementara untuk Properti */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Kartu properti dinamis (PropertyCard) akan di-render di sini pada tahap berikutnya */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center text-slate-600 shadow-elevated-low py-12">
              Belum ada properti aktif yang dimuat.
            </div>
          </div>
        </section>

      </main>

      {/* Kaki Halaman */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

