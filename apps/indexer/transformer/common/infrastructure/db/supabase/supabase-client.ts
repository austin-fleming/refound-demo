import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export const supabaseClient: SupabaseClient = createClient(
	process.env.POSTGREST_URL as string,
	process.env.SUPABASE_PUBLIC_ANON_KEY as string,
);

export type { SupabaseClient } from "@supabase/supabase-js";
