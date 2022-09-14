import type { Account } from "./account";

export const accountMocks: Account[] = [
	{
		type: "Account",
		username: "donalbert",
		avatarUrl:
			"https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
		walletAddress: "0x0000000000000000",
		status: "VERIFIED",
		bio: "I am an experienced journalist.",
		slug: "/u/donalbert",
	},
	{
		type: "Account",
		username: "jenbalder",
		avatarUrl:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
		walletAddress: "0x0000000000000000",
		status: "TRUSTED",
		bio: "I am an experienced journalist.",
		slug: "/u/jenbalder",
	},
	{
		type: "Account",
		username: "0xjaguar",
		avatarUrl:
			"https://images.unsplash.com/photo-1571070201382-a45dd17e17e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
		walletAddress: "0x0000000000000000",
		status: "NONE",
		bio: "I am an amateur journalist.",
		slug: "/u/0xjaguar",
	},
	{
		type: "Account",
		username: "0xAustin",
		avatarUrl:
			"https://images.unsplash.com/photo-1571070201382-a45dd17e17e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
		walletAddress: "0x7d1c044792e428b47e1749068e4d918964f2c4b9",
		status: "NONE",
		bio: "This is my account.",
		slug: "/u/0xAustin",
	},
];
