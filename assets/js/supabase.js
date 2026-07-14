/* =====================================================
   TERAVIA - Supabase Client Configuration
   File: assets/js/supabase.js
===================================================== */


const config = window.TERAVIA_CONFIG;


const supabaseClient = supabase.createClient(
    config.SUPABASE.URL,
    config.SUPABASE.ANON_KEY
);


window.supabaseClient = supabaseClient;
