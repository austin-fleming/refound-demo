export type ProfileId = string;

export type ProfileOwnerAddress = string;

export type ProfileUsername = string;

export enum ProfileType {
	PROFILE = "PROFILE",
}

export enum ProfileTrustStatus {
	NONE = "NONE",
	TRUSTED = "TRUSTED",
	VERIFIED = "VERIFIED",
}

export type Profile = {
	type: ProfileType;
	address: ProfileOwnerAddress;
	profileId: ProfileId;
	username: ProfileUsername;
	avatarUrl?: string;
	bio?: string;
	status: ProfileTrustStatus;
	slug: string;
	joinedOn: Date;
};
