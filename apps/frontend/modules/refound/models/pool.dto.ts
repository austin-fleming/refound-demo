import type { ProfileId } from "./profile.model";

export type PoolDTO = {
	id: string | number;
	creator: string; // address
	goal: number;
	title: string;
	description: string;
	imageLink: string;
	pledged: number;
	startAt: number; // unix timestamp
	endAt: number; // unix timestamp
	claimed: boolean;
};
