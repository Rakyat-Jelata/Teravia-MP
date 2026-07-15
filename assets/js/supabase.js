/* =====================================================
   TERAVIA - Supabase Client Configuration
   File: assets/js/supabase.js
===================================================== */


import {
    createClient
} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


import TERAVIA_CONFIG
from "./config.js";



const supabaseClient = createClient(
    TERAVIA_CONFIG.SUPABASE.URL,
    TERAVIA_CONFIG.SUPABASE.ANON_KEY
);



export {
    supabaseClient
};



window.supabaseClient = supabaseClient;


console.log(
    "✓ Supabase Client Initialized"
);
