import type { Result } from "@utils/monads";
import type { Pool, PoolId } from "../models/pool.model";
import type { ProfileOwnerAddress } from "../models/profile.model";
import type { Contract } from "web3-eth-contract";

interface IRefoundPoolRepo {
	// QUERIES
	getPoolsByCreator: (
		contract: Contract,
		address: ProfileOwnerAddress,
	) => Promise<Result<Pool[]>>;
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
	refundPoolPledgers: (
		contract: Contract,
		walletAddress: ProfileOwnerAddress,
		poolId: PoolId,
	) => Promise<Result<>>;
}
