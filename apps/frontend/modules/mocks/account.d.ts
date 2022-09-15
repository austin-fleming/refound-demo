export type TrustStatus = "VERIFIED" | "TRUSTED" | "NONE";

export type Account = {
	type: "Account";
	username: string;
	avatarUrl: string;
	walletAddress: string;
	status: TrustStatus;
	bio: string; // md
	slug: string;
};
