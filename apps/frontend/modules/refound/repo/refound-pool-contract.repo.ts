import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { Pool, PoolId } from "../models/pool.model";
import type { ProfileOwnerAddress } from "../models/profile.model";
import type { Contract } from "web3-eth-contract";
import type { PoolAggregate } from "../models/pool.aggregate";
import { queries as baseQueries } from "./refound-contract.repo";
import type { PoolDTO } from "../models/pool.dto";
import { unixTimestamp } from "@utils/unix-timestamp";
import { throwFieldError } from "../parsers/utils/throw-field-error";

interface IRefoundPoolRepo {
	// QUERIES
	getPool: (contract: Contract, poolId: PoolId) => Promise<Result<PoolAggregate>>;
	getPoolsByCreator: (
		contract: Contract,
		address: ProfileOwnerAddress,
	) => Promise<Result<PoolAggregate[]>>;
	// COMMANDS
	launchPool: (
		contract: Contract,
		walletAddress: ProfileOwnerAddress,
		poolId: PoolId,
	) => Promise<Result<boolean>>;
	pledgeToPool: (
		contract: Contract,
		walletAddress: ProfileOwnerAddress,
		poolId: PoolId,
		amount: number,
	) => Promise<Result<boolean>>;
	claimPool: (
		contract: Contract,
		walletAddress: ProfileOwnerAddress,
		poolId: PoolId,
	) => Promise<Result<boolean>>;
	/* refundPoolPledgers: (
		contract: Contract,
		walletAddress: ProfileOwnerAddress,
		poolId: PoolId,
	) => Promise<Result<>>; */
}

const getPool: IRefoundPoolRepo["getPool"] = async (contract, poolId) => {
	try {
		const rawPool: PoolDTO = contract.methods.campaigns(poolId).call();

		if (!rawPool) throw new Error("No pool found");

		const profile = (
			await baseQueries.getProfileById(contract, rawPool.creatorId)
		).unwrapOrElse((err) => {
			throw err;
		});

		const startAt: Date = unixTimestamp.toDate(rawPool.startAt).unwrapOrElse((err) => {
			throw err;
		});
		const endAt: Date = unixTimestamp.toDate(rawPool.endAt).unwrapOrElse((err) => {
			throw err;
		});

		const poolAggregate: PoolAggregate = {
			...rawPool,
			startAt,
			endAt,
			poolId,
			creator: profile,
		};

		return result.ok(poolAggregate);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getPoolsByCreator: IRefoundPoolRepo["getPoolsByCreator"] = async (
	contract,
	creatorAddress,
) => {
	try {
		const rawPools: PoolDTO[] = contract.methods.creatorToCampaigns(creatorAddress).call();

		if (!rawPools || !Array.isArray(rawPools)) throw new Error("Expected an array of poolDTOs");

		const pools: PoolAggregate[] = await Promise.all(
			rawPools.map(async (rawPool) => {
				if (!rawPool) throw new Error("No pool found");

				const profile = (
					await baseQueries.getProfileById(contract, rawPool.creatorId)
				).unwrapOrElse((err) => {
					throw err;
				});

				const startAt: Date = unixTimestamp.toDate(rawPool.startAt).unwrapOrElse((err) => {
					throw err;
				});
				const endAt: Date = unixTimestamp.toDate(rawPool.endAt).unwrapOrElse((err) => {
					throw err;
				});

				const poolAggregate: PoolAggregate = {
					...rawPool,
					startAt,
					endAt,
					poolId: rawPool.id,
					creator: profile,
				};

				return poolAggregate;
			}),
		);

		return result.ok(pools);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const createPool = async (
	contract: Contract,
	walletAddress: ProfileOwnerAddress,
	{
		goal,
		title,
		description,
		imageLink,
		startAt,
		endAt,
	}: {
		goal: number;
		title: string;
		description: string;
		imageLink: string;
		startAt: Date;
		endAt: Date;
	},
): Promise<Result<true>> => {
	try {
		if (!walletAddress) throwFieldError("walletAddress");
		if (!goal) throwFieldError("goal");
		if (!description) throwFieldError("description");
		if (!imageLink) throwFieldError("imageLink");
		if (!startAt) throwFieldError("startAt");
		if (!endAt) throwFieldError("endAt");

		await contract.methods
			.launch(
				goal,
				title,
				description,
				imageLink,
				unixTimestamp.fromDate(startAt),
				unixTimestamp.fromDate(endAt),
			)
			.send({ from: walletAddress });

		return result.ok(true);
	} catch (err) {
		return result.fail(err as Error);
	}
};

export const queries = { getPool };

export const commands = { createPool };
