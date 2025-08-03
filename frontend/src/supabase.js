import { CreateClient } from '@supabase/supabase-js';

const SupabaseUrl = 'https://YOUR_PROJECT.supabase.co';
const SupabaseAnonKey = 'Your_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);