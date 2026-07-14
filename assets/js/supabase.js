/* =====================================================
   TERAVIA - Supabase Client Configuration
   File: assets/js/supabase.js
===================================================== */


/*
    IMPORTANT:
    Ganti nilai berikut dengan credential Supabase milik TERAVIA
*/


const SUPABASE_CONFIG = {

    URL: "YOUR_SUPABASE_URL",

    ANON_KEY:
    "YOUR_SUPABASE_ANON_KEY"

};



/**
 * Initialize Supabase Client
 */

const supabaseClient = supabase.createClient(
    SUPABASE_CONFIG.URL,
    SUPABASE_CONFIG.ANON_KEY
);



/**
 * Export Global
 */

window.supabaseClient = supabaseClient;
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
