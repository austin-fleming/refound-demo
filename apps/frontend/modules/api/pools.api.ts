import { Result, result } from "@utils/monads";
import type { Pool } from "./pools";
import { poolsMocks } from "./pools.mocks";

interface PoolService {
	getPool: (slug: string) => Promise<Result<Pool>>;
	getExplorePools: (limit: number, offset: number) => Promise<Result<Pool[]>>;
	getPoolsByCreator: (creatorHandle: string) => Promise<Result<Pool[]>>;
}

const makeInMemoryPoolService = (): PoolService => ({
	getPool: async (slug) => {
		const maybePool = poolsMocks.find((pool) => pool.slug === slug);

		if (!maybePool) {
			return result.fail(new Error("Pool not found"));
		}

		return result.ok(maybePool);
	},
	getExplorePools: async (limit, offset) => {
		return result.ok(poolsMocks.slice(0, limit));
	},
	getPoolsByCreator: async (creatorHandle) => {
		return result.ok(poolsMocks.filter((pool) => pool.creator.username === creatorHandle));
	},
});

export const poolService = makeInMemoryPoolService();
