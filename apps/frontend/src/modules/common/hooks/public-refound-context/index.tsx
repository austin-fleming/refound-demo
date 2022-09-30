import { makeCacheRepo } from "@api/repo/cache/cache.repo";
import { useMemo } from "react";

export const usePublicRefoundQueries = () => {
	const cacheRepo = makeCacheRepo();

	return useMemo(() => cacheRepo, [cacheRepo]);
};
