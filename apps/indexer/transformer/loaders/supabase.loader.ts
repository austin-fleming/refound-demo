import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import config from "@transformer/config";

export const initSupabase = async (): Promise<SupabaseClient> => {
	return createClient(config.supabase.url, config.supabase.token);
};
