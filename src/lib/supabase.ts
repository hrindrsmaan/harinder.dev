import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY"
  );
}

// One shared client for the whole app; import it, don't recreate it.
// The app never signs in, so ignore any stored auth session: a stale one
// (e.g. from another app on the same localhost origin) would run requests
// as `authenticated` instead of `anon`.
export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});
