import { accountMocks } from "./account.mocks";
import type { Pool } from "./pools";

export const poolsMocks: Pool[] = [
	{
		type: "Pool",
		tags: ["tag1"],
		creator: accountMocks[0],
		category: "INITIATIVE",
		contractAddress: "0x000000000000",
		title: "The effect of war on Ukraine’s culinary culture",
		slug: "the-effect-of-war",
		coverImage:
			"https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
		description:
			"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		deadline: new Date(),
		creationDate: new Date(),
		communityRanking: 0.82,
		communityVotes: 58,
		stakerRanking: 0.97,
		stakerVotes: 28,
		memberCount: 68,
		amountGoal: 18_000,
		amountContributed: 9_000,
	},
	{
		type: "Pool",
		tags: ["tag2", "tag3"],
		creator: accountMocks[1],
		category: "COMMISSION",
		contractAddress: "0x000000000000",
		title: "Effect of the Congo’s Conflict on Local Wildlife",
		slug: "effect-of-the-congo",
		coverImage:
			"https://images.unsplash.com/photo-1576526164505-9a2540866186?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
		description:
			"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		deadline: new Date(),
		creationDate: new Date(),
		communityRanking: 0.72,
		communityVotes: 89,
		stakerRanking: 0.89,
		stakerVotes: 68,
		memberCount: 68,
		amountGoal: 18_000,
		amountContributed: 9_000,
	},
];
