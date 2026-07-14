import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Anon Key dari environment variables Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Inisialisasi client Supabase untuk Auth, Database, dan Storage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
