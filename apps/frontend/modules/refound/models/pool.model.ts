import type { ProfileOwnerAddress } from "./profile.model";

export type PoolId = string | number;

export type Pool = {
	poolId: PoolId;
	creatorAddress: ProfileOwnerAddress;
	goal: number;
	title: string;
	description: string;
	imageLink: string;
	pledged: number;
	startAt: Date;
	endAt: Date;
	claimed: boolean;
};
