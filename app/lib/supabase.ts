import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// O erro acontece porque falta o "export" aqui em baixo:
export const supabase = createClient(supabaseUrl, supabaseKey);