export type TrustStatus = "VERIFIED" | "TRUSTED" | "NONE";

export type Account = {
	type: "Account";
	username: string;
	avatarUrl: string;
	contractAddress: string;
	status: TrustStatus;
	bio: string; // md
};
