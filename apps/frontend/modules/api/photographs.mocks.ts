import { accountMocks } from "./account.mocks";
import type { Photograph } from "./photographs";

export const photographMocks: Photograph[] = [
	{
		type: "Photograph",
		id: "1234",
		title: "A Hazy Forest",
		source: "https://images.unsplash.com/photo-1662721194158-570344f84260?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		width: 6000,
		height: 4000,
		description: "The sick forest, bark beetle plagued, September 2022",
		creator: accountMocks[0],
		date: new Date(),
		slug: "hazy-forest",
		ranking: {
			community: {
				votes: 220,
				ratio: 0.9,
			},
			stakers: {
				votes: 135,
				ratio: 0.87,
			},
		},
	},
	{
		type: "Photograph",
		id: "12345",
		title: "Waves and Stones",
		source: "https://images.unsplash.com/photo-1662740267885-f3e405a17a62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
		width: 3857,
		height: 4821,
		description: "Waves crushing in front of a solitude rock",
		creator: accountMocks[0],
		location: "Algarve, Portugal",
		tags: ["tag1", "tag2", "tag3"],
		date: new Date(),
		slug: "waves-and-stones",
		ranking: {
			community: {
				votes: 67,
				ratio: 0.78,
			},
			stakers: {
				votes: 332,
				ratio: 0.87,
			},
		},
	},
	{
		type: "Photograph",
		id: "123456",
		title: "A Cold Coast",
		source: "https://images.unsplash.com/photo-1662436267863-e31fea0120fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
		width: 5464,
		height: 3640,
		description: "Winter bay",
		creator: accountMocks[1],
		tags: ["tag1", "tag2", "tag3"],
		date: new Date(),
		slug: "cold-coast",
		ranking: {
			community: {
				votes: 29,
				ratio: 0.98,
			},
			stakers: {
				votes: 98,
				ratio: 0.99,
			},
		},
	},
	{
		type: "Photograph",
		id: "1234567",
		title: "Aurora 1/150",
		source: "https://images.unsplash.com/photo-1662436267874-4ab1145ade4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2143&q=80",
		width: 8640,
		height: 5317,
		description: "A northern aurora at night",
		creator: accountMocks[1],
		tags: ["tag1", "tag2", "tag3"],
		date: new Date(),
		location: "Alaska",
		slug: "aurora-1-150",
		ranking: {
			community: {
				votes: 567,
				ratio: 0.92,
			},
			stakers: {
				votes: 89,
				ratio: 0.87,
			},
		},
	},
	{
		type: "Photograph",
		id: "12345678",
		title: "Aurora 2/150",
		source: "https://images.unsplash.com/photo-1662436267874-4ab1145ade4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2143&q=80",
		width: 8640,
		height: 5317,
		description: "A northern aurora at night",
		creator: accountMocks[1],
		tags: ["tag1", "tag2", "tag3"],
		date: new Date(),
		location: "Alaska",
		slug: "aurora-2-150",
		ranking: {
			community: {
				votes: 643,
				ratio: 0.89,
			},
			stakers: {
				votes: 45,
				ratio: 0.91,
			},
		},
	},
];
