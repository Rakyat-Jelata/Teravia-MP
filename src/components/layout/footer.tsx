import React from 'react';
import logoImg from '../../assets/img/logo.png'; // Menggunakan logo yang sama dengan filter inversi CSS

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-600 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Kolom 1: Brand Info */}
        <div className="flex flex-col space-y-4">
          <img src={logoImg} alt="TERAVIA Logo" className="h-8 w-auto self-start brightness-0 invert" />
          <p className="text-sm text-slate-600 leading-relaxed">
            Platform marketplace properti modern terlengkap untuk menemukan hunian impian, ruko bisnis, dan investasi properti masa depan Anda.
          </p>
        </div>

        {/* Kolom 2: Beli Properti */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-white font-semibold text-base mb-1">Cari Properti</h4>
          <a href="/beli/rumah" className="text-sm hover:text-white transition-colors">Rumah Dijual</a>
          <a href="/beli/apartemen" className="text-sm hover:text-white transition-colors">Apartemen Dijual</a>
          <a href="/beli/ruko" className="text-sm hover:text-white transition-colors">Ruko & Komersial</a>
        </div>

        {/* Kolom 3: Perusahaan */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-white font-semibold text-base mb-1">TERAVIA</h4>
          <a href="/tentang-kami" className="text-sm hover:text-white transition-colors">Tentang Kami</a>
          <a href="/kontak" className="text-sm hover:text-white transition-colors">Hubungi Kami</a>
          <a href="/membership" className="text-sm hover:text-white transition-colors">Paket Agen Premium</a>
        </div>

        {/* Kolom 4: Newsletter */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-white font-semibold text-base">Berlangganan Info Properti</h4>
          <p className="text-sm text-slate-600">Dapatkan notifikasi properti terbaru langsung di email Anda.</p>
          <div className="flex h-11 w-full rounded-md overflow-hidden border border-slate-700">
            <input 
              type="email" 
              placeholder="Email Anda" 
              className="w-full px-3 bg-slate-800 text-white text-sm focus:outline-none"
            />
            <button className="bg-secondary hover:bg-secondary-dark text-white px-4 text-sm font-medium transition-colors">
              Gabung
            </button>
          </div>
        </div>

      </div>

      {/* Bagian Bawah: Copyright */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-20 mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-slate-600">
          © {new Date().getFullYear()} TERAVIA. Hak Cipta Dilindungi.
        </span>
        <div className="flex space-x-6 text-xs text-slate-600">
          <a href="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</a>
          <a href="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  );
};

