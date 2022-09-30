import type { CacheRepo } from "@api/repo/cache/cache.repo";
import type { Result } from "@repo/common/utils/monads";
import { config } from "config/config";
import type { ProfileAggregate } from "../domain/profile-aggregate";

export const makeProfileQueries = ({ cacheRepo }: { cacheRepo: CacheRepo }) => {
	return {
		getProfile: async (username: string): Promise<Result<ProfileAggregate>> =>
			cacheRepo.getProfileByUsername(username),
		getProfiles: (offset: number, limit?: number) =>
			cacheRepo.getProfiles({
				filter: "newest",
				limit: limit || config.site.content.defaultResultCount,
				offset,
			}),
	};
};
