import type { Profile } from "./profile.model";

/* 
schema of profile data written/parsed from profileData
*/
export type ProfileDataContractSchema = {
	avatarUrl: string;
	bio: string;
	status: string;
	address: string;
	joinedOn: string; // unix timestamp
};

/*
What contract will return
*/
export type ProfileContractDSO = {
	handle: string;
	profileData: string; // stringified ProfileDateContractSchema
};

/*
For creating a post
*/
export type ProfileCreationProperties = Omit<
	Profile,
	"joinedOn" | "slug" | "type" | "address" | "profileId" | "status"
>;
