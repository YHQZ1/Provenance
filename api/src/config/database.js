import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

// Regular client for frontend operations
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
  : null;
