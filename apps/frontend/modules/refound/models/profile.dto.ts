import type { Profile } from "./profile.model";

/* 
schema of profile data written/parsed from profileData
*/
export type ProfileDataContractSchema = {
	name: string;
	description: string;
	image: string;
	attributes: Array<{
		trait_type: string;
		value: string | number;
	}>;
};

/*
What contract will return
*/

/*
For creating a post
*/
export type ProfileCreationProperties = Omit<
	Profile,
	"joinedOn" | "slug" | "type" | "address" | "profileId" | "status"
>;
