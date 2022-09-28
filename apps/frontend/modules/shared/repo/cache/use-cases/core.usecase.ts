import type { SupabaseClient } from "@supabase/supabase-js";
import type { Result } from "@repo/common/utils/monads";
import { result } from "@repo/common/utils/monads";

type Profile = {
	id: number;
	walletAddress: string;
	username: string;
	joinedOn: string;
	bio?: string;
	avatarUrl?: string;
};

type ProfileAggregate = Profile & {
	level?: number;
};

type Account = ProfileAggregate & {
	beneficiary: {
		beneficiaryAddress?: string;
		claimStarted?: boolean;
		claimDate?: string;
		releaseDate?: string;
	};
};

const paginate = (limit: number, offset: number) => {
	const from = limit * offset;
	const to = from + limit;

	return { from, to };
};

export const makeCoreUsecases = (supabaseClient: SupabaseClient) => ({
	getProfiles: async (limit: number, offset: number): Promise<Result<ProfileAggregate[]>> => {
		const { from, to } = paginate(limit, offset);

		const { data, error } = await supabaseClient
			.from<ProfileAggregate>("profile")
			.select("*, profile_verification_level (level)")
			.range(from, to);

		if (error) {
			console.error(error);
			return result.fail(new Error(error.message));
		}

		return result.ok(data);
	},
	getProfileByUsername: async (username: string): Promise<Result<ProfileAggregate>> => {
		const { data, error } = await supabaseClient
			.from<ProfileAggregate>("profile")
			.select("*, profile_verification_level (level)")
			.eq("username", username);

		if (error) {
			console.error(error);
			return result.fail(new Error(error.message));
		}

		if (!data[0]) {
			return result.fail(new Error("profile not found"));
		}

		return result.ok(data[0]);
	},
	getProfileByAccount: async (walletAddress: string): Promise<Result<ProfileAggregate>> => {
		const { data, error } = await supabaseClient
			.from<ProfileAggregate>("profile")
			.select("*, profile_verification_level (level)")
			.eq("walletAddress", walletAddress);

		if (error) {
			console.error(error);
			return result.fail(new Error(error.message));
		}

		if (!data[0]) {
			return result.fail(new Error("profile not found"));
		}

		return result.ok(data[0]);
	},
	getAccount: async (walletAddress: string): Promise<Result<Account>> => {},
});
