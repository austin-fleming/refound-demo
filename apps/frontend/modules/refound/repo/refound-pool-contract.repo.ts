import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { Pool, PoolId } from "../models/pool.model";
import type { ProfileOwnerAddress, ProfileUsername } from "../models/profile.model";
import type { Contract } from "web3-eth-contract";
import type { PoolAggregate } from "../models/pool.aggregate";
import { queries as baseQueries } from "./refound-core-contract.repo";
import type { PoolDTO } from "../models/pool.dto";
import { unixTimestamp } from "@utils/unix-timestamp";
import { throwFieldError } from "../parsers/utils/throw-field-error";
import { poolParser } from "../parsers/pool.parser";

interface IRefoundPoolRepo {
	// QUERIES
	getPool: (
		coreContract: Contract,
		poolContract: Contract,
		poolId: PoolId,
	) => Promise<Result<PoolAggregate>>;
	getPools: (coreContract: Contract, poolContract: Contract) => Promise<Result<PoolAggregate[]>>;
	getPoolsByUsername: (
		coreContract: Contract,
		poolContract: Contract,
		username: ProfileUsername,
	) => Promise<Result<PoolAggregate[]>>;
	getPoolsByCreator: (
		coreContract: Contract,
		poolContract: Contract,
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

/* 
----------------
QUERIES
----------------
*/

const getPool: IRefoundPoolRepo["getPool"] = async (coreContract, poolContract, poolId) => {
	try {
		// 1. get pool
		const rawPool: PoolDTO = poolContract.methods.campaigns(poolId).call();

		// 2. get profile
		const profile = (
			await baseQueries.getProfileById(coreContract, rawPool.creatorId)
		).unwrapOrElse((err) => {
			throw err;
		});

		// 3. build aggregate
		return poolParser.dtoToAggregate(rawPool, profile);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getPools: IRefoundPoolRepo["getPools"] = async (coreContract, poolContract) => {
	try {
		const rawPools: PoolDTO[] = await poolContract.methods.campaigns().call();

		// TODO: optimize somehow. currently profiles get fetched multiple times
		const aggregates = await Promise.all(
			rawPools.map(async (rawPool) =>
				(
					await baseQueries.getProfileByAddress(coreContract, rawPool.creator)
				).chainOk((profile) => poolParser.dtoToAggregate(rawPool, profile)),
			),
		);

		return result.sequence(aggregates);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getPoolsByUsername: IRefoundPoolRepo["getPoolsByUsername"] = async (
	coreContract,
	poolContract,
	username,
) => {
	try {
		// 1. get profile to get the address
		const profile = (
			await baseQueries.getProfileByUsername(coreContract, username)
		).unwrapOrElse((err) => {
			throw err;
		});

		// 2. fetch pools by address
		const rawPools: PoolDTO[] = await poolContract.methods
			.creatorToCampaign(profile.address)
			.call();

		// 3. parse into an aggregate
		const poolAggregates = rawPools.map((rawPool) =>
			poolParser.dtoToAggregate(rawPool, profile),
		);

		// 4. clean up
		return result.sequence(poolAggregates);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getPoolsByOwner: IRefoundPoolRepo["getPoolsByCreator"] = async (
	coreContract,
	poolContract,
	address,
) => {
	try {
		// 1. get owner profile
		const ownerProfile = (
			await baseQueries.getProfileByAddress(coreContract, address)
		).unwrapOrElse((err) => {
			throw err;
		});
		// 2. query pools
		const rawPools: PoolDTO[] = await poolContract.methods
			.creatorToCampaigns(ownerProfile.address)
			.call();
		// 3. build aggregates
		const poolAggregates = rawPools.map((rawPool) =>
			poolParser.dtoToAggregate(rawPool, ownerProfile),
		);
		// 4. clean up
		return result.sequence(poolAggregates);
	} catch (err) {
		return result.fail(err as Error);
	}
};

/* 
----------------
COMMANDS
----------------
*/

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

export const queries = { getPool, getPools, getPoolsByUsername, getPoolsByOwner };

export const commands = { createPool };
