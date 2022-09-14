export type Profile = {
	type: "Profile";
	address: string; // wallet address
	profileId: string; // profile id from contract
	username: string;
	avatarUrl: string;
	bio: string;
	status: "NONE" | "TRUSTED" | "VERIFIED";
	slug: string;
	joinedOn: Date;
};

export type ProfileDSO = {
	handle: string;
	profileData: {
		avatarUrl: string;
		bio: string;
		status: string;
		address: string;
		joinedOn: string; // unix timestamp
	};
};

export type ProfileContractDSO = {
	handle: string;
	profileData: string;
};
