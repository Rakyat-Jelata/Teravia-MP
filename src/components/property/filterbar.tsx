import React, { useState } from 'react';

export const FilterBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('house');
  const [status, setStatus] = useState('sale'); // sale atau rent

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika pengalihan ke halaman /search dengan query parameter akan diproses di tahap berikutnya
    console.log({ keyword, propertyType, status });
  };

  return (
    <div className="w-full max-w-[850px] mx-auto px-4">
      {/* Tab Pilihan Status (Dijual / Disewa) */}
      <div className="flex space-x-2 mb-3">
        <button
          onClick={() => setStatus('sale')}
          className={`px-5 py-2.5 rounded-t-md font-semibold text-sm transition-all duration-200 ${
            status === 'sale'
              ? 'bg-white text-primary shadow-elevated-low'
              : 'bg-white/60 text-slate-800 backdrop-blur-md hover:bg-white/80'
          }`}
        >
          Dijual
        </button>
        <button
          onClick={() => setStatus('rent')}
          className={`px-5 py-2.5 rounded-t-md font-semibold text-sm transition-all duration-200 ${
            status === 'rent'
              ? 'bg-white text-primary shadow-elevated-low'
              : 'bg-white/60 text-slate-800 backdrop-blur-md hover:bg-white/80'
          }`}
        >
          Disewa
        </button>
      </div>

      {/* Kontainer Utama Filter dengan Efek Glassmorphism */}
      <form
        onSubmit={handleSearch}
        className="bg-white/75 backdrop-blur-md border border-white/30 rounded-lg p-4 md:p-6 shadow-elevated-high flex flex-col md:flex-row gap-4 items-center"
      >
        {/* Input Kata Kunci / Lokasi */}
        <div className="flex flex-col w-full md:flex-1">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Lokasi</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari kota, wilayah, atau nama perumahan..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Dropdown Tipe Properti */}
        <div className="flex flex-col w-full md:w-[220px]">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Tipe Properti</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full h-12 px-3 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="house">Rumah</option>
            <option value="apartment">Apartemen</option>
            <option value="land">Tanah</option>
            <option value="commercial">Ruko & Komersial</option>
          </select>
        </div>

        {/* Tombol Aksi Utama Pencarian */}
        <div className="w-full md:w-auto pt-6 flex items-end justify-end">
          <button
            type="submit"
            className="w-full md:w-auto h-12 bg-primary hover:bg-primary-dark text-white px-8 rounded-md font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-elevated-medium flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Cari Properti</span>
          </button>
        </div>
      </form>
    </div>
  );
};

