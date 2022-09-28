import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export const initSupabase = (): SupabaseClient =>
	createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_PUBLIC as string,
	);
