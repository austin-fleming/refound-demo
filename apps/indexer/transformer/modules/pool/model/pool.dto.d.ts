/* eslint-disable typescript-sort-keys/interface */
import type { UnixTimestamp } from "@modules/common/domain/unix-timestamp.vo";

type PoolOwnerAddress = string;

export type PoolDTO = {
	creator: PoolOwnerAddress;
	goal: number;
	title: string;
	description: string;
	imageLink: string;
	pledged: string;
	startAt: UnixTimestamp;
	endAt: UnixTimestamp;
	claimed: boolean;
};
