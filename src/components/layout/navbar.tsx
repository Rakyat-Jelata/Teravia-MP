import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/img/logo.png'; // Memanggil aset logo Anda

export const Navbar: React.FC = () => {
  const { user, profile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full h-20 bg-white border-b border-slate-200 shadow-elevated-low sticky top-0 z-50">
      <div className="max-w-[1280px] h-full mx-auto px-4 md:px-20 flex items-center justify-between">
        
        {/* Kiri: Logo Brand */}
        <div className="flex items-center">
          <img src={logoImg} alt="TERAVIA Logo" className="h-8 w-auto object-contain" />
        </div>

        {/* Tengah: Menu Navigasi Utama (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/beli" className="text-slate-600 hover:text-primary font-medium transition-colors duration-200">Beli</a>
          <a href="/sewa" className="text-slate-600 hover:text-primary font-medium transition-colors duration-200">Sewa</a>
          <a href="/agen" className="text-slate-600 hover:text-primary font-medium transition-colors duration-200">Cari Agen</a>
        </div>

        {/* Kanan: Otorisasi & Aksi (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {user && profile ? (
            <div className="flex items-center space-x-3 cursor-pointer">
              <img 
                src={profile.role === 'agent' ? '/default-agent.png' : '/default-avatar.png'} 
                alt={profile.name} 
                className="w-10 h-10 rounded-full border border-slate-200"
              />
              <span className="text-slate-800 font-medium text-sm">{profile.name}</span>
            </div>
          ) : (
            <a href="/login" className="text-primary font-semibold hover:text-primary-dark transition-colors duration-200">
              Masuk
            </a>
          )}
          
          <a href={profile?.role === 'agent' ? '/agent/add-property' : '/login'} 
             className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-elevated-medium">
            Pasang Iklan
          </a>
        </div>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu (Mobile Mobile Breakpoint) */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-white border-b border-slate-200 px-4 py-4 flex flex-col space-y-4 absolute left-0 top-20 shadow-elevated-medium">
          <a href="/beli" className="text-slate-600 font-medium">Beli</a>
          <a href="/sewa" className="text-slate-600 font-medium">Sewa</a>
          <a href="/agen" className="text-slate-600 font-medium">Cari Agen</a>
          <hr className="border-slate-200" />
          {!user && <a href="/login" className="text-primary font-medium">Masuk</a>}
          <a href="/pasang-iklan" className="bg-primary text-white text-center py-2.5 rounded-md font-medium">Pasang Iklan</a>
        </div>
      )}
    </nav>
  );
};

