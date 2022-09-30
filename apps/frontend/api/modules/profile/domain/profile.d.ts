/* export type ProfileId = number;

export type ProfileUsername = string;

export type ProfileWalletAddress = string;

export type ProfileBio = string;

export type ProfileAvatarUrl = string;

export type Profile = {
	id: ProfileId;
	username: ProfileUsername;
	wallet: ProfileWalletAddress;
	joinedOn: Date;
	bio?: ProfileBio;
	avatarUrl?: ProfileAvatarUrl;
}; */

import type { ProfileTable } from "@repo/common/db/cache/cache-tables";

export type Profile = ProfileTable;
