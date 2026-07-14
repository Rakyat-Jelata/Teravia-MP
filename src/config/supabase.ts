import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Anon Key dari environment variables Vite
const supabaseUrl = import.meta.env.VITE_https://junramfhdgabmytoaazh.supabase.co;
const supabaseAnonKey = import.meta.env.VITE_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bnJhbWZoZGdhYm15dG9hYXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NDY2NDgsImV4cCI6MjA5OTQyMjY0OH0.DmK6iYsTGCRyfeSRDVs94CB_qN_Mymkywm8ib5IcU7w;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Inisialisasi client Supabase untuk Auth, Database, dan Storage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
