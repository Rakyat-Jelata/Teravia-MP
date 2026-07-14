/**
 * TERAVIA - Dynamic Navbar Component
 * File: assets/js/components/navbar.js
 */

document.addEventListener("DOMContentLoaded", async () => {
  const navbarContainer = document.getElementById("navbar-component");
  if (!navbarContainer) return;

  const client = window.supabaseClient;
  let userSession = null;

  // 1. Periksa status login pengguna jika Supabase aktif
  if (client) {
    const { data: { session } } = await client.auth.getSession();
    userSession = session;
  }

  // 2. Tentukan letak path (karena file di dalam folder /pages/ butuh penyesuaian path ../)
  const isSubPage = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/dashboard/');
  const prefix = isSubPage ? '../' : '';

  // 3. Siapkan Menu Kanan (Auth Menu) berdasarkan status login
  let authMenuHtml = '';

  if (userSession) {
    // Jika user SUDAH login
    authMenuHtml = `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle btn btn-outline-primary px-3 text-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-person-circle me-1"></i> Akun Saya
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-menu-item dropdown-item" href="${prefix}dashboard/member.html">Dashboard</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-menu-item dropdown-item text-danger" href="#" id="btn-logout-navbar">Keluar (Logout)</a></li>
        </ul>
      </li>
    `;
  } else {
    // Jika user BELUM login (Tampilkan Login & Register)
    authMenuHtml = `
      <li class="nav-item">
        <a class="nav-link text-dark me-2" href="${prefix}login.html">Masuk</a>
      </li>
      <li class="nav-item">
        <a class="btn btn-primary text-white px-3" href="${prefix}register.html">Daftar</a>
      </li>
    `;
  }

  // 4. Gambar Struktur Navbar Utama (Gaya Bootstrap 5)
  navbarContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand fw-bold text-primary fs-3" href="${prefix}index.html">TERAVIA</a>
        
        <!-- Toggle Button Mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Menu Items -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <a class="nav-link text-dark" href="${prefix}index.html">Beranda</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="${prefix}pages/home.html">Cari Properti</a>
            </li>
          </ul>
          
          <!-- Tombol Auth (Kanan) -->
          <ul class="navbar-nav align-items-center gap-2">
            ${authMenuHtml}
          </ul>
        </div>
      </div>
    </nav>
  `;

  // 5. Tambahkan Event Listener untuk tombol Logout jika ada
  const logoutBtn = document.getElementById("btn-logout-navbar");
  if (logoutBtn && client) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const { error } = await client.auth.signOut();
      if (!error) {
        window.location.href = `${prefix}index.html`;
      } else {
        alert("Gagal logout: " + error.message);
      }
    });
  }
});
