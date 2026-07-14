/**
 * TERAVIA - Database Dummy Seeder
 * Jalankan fungsi window.TERAVIA_SEEDER.run() dari Console Browser
 * pada halaman yang sudah memuat Supabase Client.
 */

window.TERAVIA_SEEDER = {
  async run() {
    const client = window.supabaseClient;
    if (!client) {
      console.error("Supabase client belum aktif. Buka halaman index.html terlebih dahulu.");
      return;
    }

    console.log("Memulai proses input data dummy...");

    // 1. Dapatkan user ID aktif saat ini untuk relasi pemilik/agen
    const { data: { user }, error: authError } = await client.auth.getUser();
    
    if (authError || !user) {
      console.error("Anda harus login/masuk terlebih dahulu di aplikasi untuk menjalankan seeder ini agar data profilnya sinkron.");
      return;
    }

    // 2. Data Dummy Properti
    const dummyProperties = [
      {
        user_id: user.id,
        title: "Cluster Minimalis Modern - Cluster Teravia Residen",
        description: "Rumah siap huni dengan desain minimalis modern di lokasi sangat strategis. Bebas banjir, keamanan 24 jam dengan sistem satu gerbang. Dekat dengan akses jalan tol dan pusat perbelanjaan.",
        price: 850000000,
        address: "Jl. Merdeka Raya No. 12",
        city: "Jakarta Barat",
        province: "DKI Jakarta",
        transaction_type: "Jual",
        category: "Hunian",
        status: "Approved"
      },
      {
        user_id: user.id,
        title: "Ruko Komersial 3 Lantai Strategis",
        description: "Ruko sangat cocok untuk kantor, perbankan, atau usaha kuliner. Lokasi di pinggir jalan raya utama dengan area parkir yang sangat luas.",
        price: 35000000, // Harga sewa per tahun
        address: "Kawasan Bisnis Sudirman Kav. 21",
        city: "Semarang",
        province: "Jawa Tengah",
        transaction_type: "Sewa",
        category: "Komersial",
        status: "Approved"
      },
      {
        user_id: user.id,
        title: "Tanah Kavling Siap Bangun",
        description: "Tanah rata berbentuk kotak sempurna di dalam kawasan industri. Sertifikat Hak Milik (SHM) sudah siap balik nama.",
        price: 1200000000,
        address: "Zona Industri Cikarang Blok B",
        city: "Bekasi",
        province: "Jawa Barat",
        transaction_type: "Jual",
        category: "Tanah & Lahan",
        status: "Approved"
      }
    ];

    // 3. Masukkan ke tabel 'properties'
    const { data: insertedProperties, error: propError } = await client
      .from('properties')
      .insert(dummyProperties)
      .select();

    if (propError) {
      console.error("Gagal memasukkan data properti:", propError.message);
      return;
    }

    console.log("✅ Berhasil memasukkan 3 data properti dummy!");

    // 4. Memasukkan Foto Dummy untuk masing-masing properti
    const dummyImages = [
      {
        property_id: insertedProperties[0].id,
        image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        is_primary: true
      },
      {
        property_id: insertedProperties[1].id,
        image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        is_primary: true
      },
      {
        property_id: insertedProperties[2].id,
        image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        is_primary: true
      }
    ];

    const { error: imgError } = await client
      .from('property_images')
      .insert(dummyImages);

    if (imgError) {
      console.error("Gagal memasukkan foto dummy:", imgError.message);
      return;
    }

    console.log("✅ Berhasil memasukkan foto properti dummy!");
    console.log("Proses seeding selesai! Silakan refresh halaman utama Anda.");
  }
};
