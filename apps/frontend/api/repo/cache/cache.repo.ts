import { config } from "config/config";
import type { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import type {
	HoldingAccountActionTable,
	HoldingAccountBeneficiaryTable,
	HoldingAccountTable,
	LicenseTable,
	PoolTable,
	PostTable,
	PostTableArticle,
	PostTableImage,
	ProfileTable,
	ProfileVerificationLevelTable,
	WalletAddress,
} from "@repo/common/db/cache/cache-tables";
import type { Result } from "@repo/common/utils/monads";
import { result } from "@repo/common/utils/monads";
import { isEmptyArray } from "@repo/common/utils/validation";
import type { ProfileAggregate } from "@api/modules/profile/domain/profile-aggregate";

const calculatePagination = (limit: number, offset: number): { from: number; to: number } => {
	const from = limit * offset;
	const to = from + limit * offset;

	return { from, to };
};

type PaginationDetails = { pages: number; currentPage: number; pagesRemaining: number };

const calculateCursor = (limit: number, offset: number, count: number): PaginationDetails => {
	const pages = Math.ceil(count / limit) || 1;
	const currentPage = offset + 1 > pages ? pages : offset + 1;

	return { pages, currentPage, pagesRemaining: pages - currentPage };
};

export interface CacheRepo {
	// Feed
	getProfiles: ({
		filter,
		limit,
		offset,
	}: {
		filter: "newest";
		limit: number;
		offset: number;
	}) => Promise<Result<{ profiles: ProfileAggregate[]; pages: PaginationDetails }>>;
	/* getImagePosts: (
		limit: number,
		offset: number,
	) => Promise<Result<{ posts: PostTableImage[]; pages: number }>>;
	getArticlePosts: (
		limit: number,
		offset: number,
	) => Promise<Result<{ posts: PostTableArticle[]; pages: number }>>;
	getPools: (
		limit: number,
		offset: number,
	) => Promise<Result<{ pools: PoolTable[]; pages: number }>>; */
	// Profile
	getProfileByUsername: (username: string) => Promise<Result<ProfileAggregate>>;
	profileExists: (username: string) => Promise<Result<boolean>>;
	/* getImagePostsByProfile: (
		profileId: number,
		limit: number,
		offset: number,
	) => Promise<Result<{ posts: PostTableImage[]; pages: number }>>;
	getArticlePostsByProfile: (
		profileId: number,
		limit: number,
		offset: number,
	) => Promise<Result<{ posts: PostTableArticle[]; pages: number }>>;
	getPoolsByProfile: (
		profileId: number,
		limit: number,
		offset: number,
	) => Promise<Result<{ posts: PoolTable[]; pages: number }>>; */
	// Account
	getProfileByAddress: (walletAddress: string) => Promise<Result<ProfileAggregate>>;
	/* getLicenses: (
		walletAddress: string,
	) => Promise<Result<{ licenses: LicenseTable[]; pages: number }>>;
	getHoldingAccount: (walletAddress: string) => Promise<Result<HoldingAccountTable>>;
	getBeneficiary: (WalletAddress: string) => Promise<Result<HoldingAccountBeneficiaryTable[]>>;
	getAccountActions: (
		walletAddress: string,
		limit: number,
		offset: number,
	) => Promise<Result<{ actions: HoldingAccountActionTable[]; pages: number }>>;
	getAccountSubscribers: (
		walletAddress: string,
		limit: number,
		offset: number,
	) => Promise<Result<{ subscribers: ProfileTable[]; pages: number }>>; */
}

type ProfileTableAggregate = ProfileTable & { level: number };
const profileAggregateQuery = "*, profile_verification_level(level)";

export const makeCacheRepo = (): CacheRepo => {
	const client = createClient(config.supabase.url, config.supabase.publicToken);

	const getProfiles: CacheRepo["getProfiles"] = async ({ filter, limit, offset }) => {
		const orderBy = (
			{
				newest: "joined_on",
			} as Record<typeof filter, keyof ProfileTableAggregate>
		)[`${filter}`];

		const { from, to } = calculatePagination(limit, offset);

		const {
			data: profiles,
			error,
			count,
		} = await client
			.from<ProfileTableAggregate>("profile")
			.select(profileAggregateQuery, { count: "exact" })
			.order(orderBy)
			.range(from, to);

		if (error) {
			console.error(error);
			return result.fail(new Error("Failed to fetch profiles."));
		}

		if (!count) return result.fail(new Error("No count returned."));

		return result.ok({
			profiles,
			pages: calculateCursor(limit, offset, count),
		});
	};

	const getProfileByUsername: CacheRepo["getProfileByUsername"] = async (username) => {
		const { data, error, status } = await client
			.from<ProfileTableAggregate>("profile")
			.select(profileAggregateQuery)
			.eq("username", username);

		/* 
        if (error)
			return status === 406
				? result.fail(new Error("Multiple profiles found."))
				: result.fail(new Error(`${status} - ${error.message}`)); 
                */
		if (error) {
			console.error(error);
			return result.fail(new Error("Failed to fetch profile."));
		}
		if (!data || isEmptyArray(data)) return result.fail(new Error("Profile not found."));

		return result.ok(data[0]);
	};

	const profileExists: CacheRepo["profileExists"] = async (username) => {
		const { data, error } = await client
			.from<ProfileTable>("profile")
			.select("*")
			.eq("username", username);

		if (error) {
			console.error(error);
			return result.fail(new Error("Failed to check if profile exists."));
		}
		if (!data || isEmptyArray(data)) return result.ok(false);

		return result.ok(true);
	};

	const getProfileByAddress: CacheRepo["getProfileByAddress"] = async (walletAddress) => {
		console.log({ walletAddress });
		const { data, error } = await client
			.from<ProfileTableAggregate>("profile")
			.select("*")
			.eq("wallet_address", walletAddress);
		console.log({ data, error });

		if (error) {
			console.error(error);
			return result.fail(new Error("Failed to fetch profile."));
		}
		if (!data || isEmptyArray(data)) return result.fail(new Error("Profile not found."));

		return result.ok(data[0]);
	};

	return {
		getProfiles,
		getProfileByUsername,
		profileExists,
		getProfileByAddress,
	};
};
