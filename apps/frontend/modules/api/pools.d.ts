export type Pool = {
	type: "Pool";
	tags: string[];
	creator: Account;
	category: "INITIATIVE" | "COMMISSION";
	contractAddress: string;
	title: string;
	slug: string;
	coverImage: string;
	description: string; // md
	creationDate: Date;
	deadline: Date;
	communityVotes: number;
	communityRanking: number;
	stakerVotes: number;
	stakerRanking: number;
	memberCount: number;
	amountGoal: number;
	amountContributed: number;
};
