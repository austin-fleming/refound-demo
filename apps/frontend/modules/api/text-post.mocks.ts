import { accountMocks } from "./account.mocks";
import type { TextPost } from "./text-post";

export const textPostMocks: TextPost[] = [
	{
		type: "TextPost",
		id: "123",
		creator: accountMocks[0],
		title: "Article 01",
		body: "article body 01",
		tags: ["tag1"],
		date: new Date(),
		slug: "article-01",
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
		type: "TextPost",
		id: "1234",
		creator: accountMocks[0],
		title: "Article 02",
		body: "article body 02",
		tags: [],
		date: new Date(),
		slug: "article-02",
		ranking: {
			community: {
				votes: 14,
				ratio: 0.92,
			},
			stakers: {
				votes: 79,
				ratio: 0.94,
			},
		},
	},
	{
		type: "TextPost",
		id: "12345",
		creator: accountMocks[1],
		title: "Article 03",
		body: "article body 03",
		date: new Date(),
		slug: "article-03",
		ranking: {
			community: {
				votes: 567,
				ratio: 0.52,
			},
			stakers: {
				votes: 37,
				ratio: 0.78,
			},
		},
	},
	{
		type: "TextPost",
		id: "123456",
		creator: accountMocks[1],
		title: "Article 04",
		body: "article body 04",
		tags: ["tag1", "tag2"],
		date: new Date(),
		slug: "article-04",
		ranking: {
			community: {
				votes: 768,
				ratio: 0.97,
			},
			stakers: {
				votes: 214,
				ratio: 0.78,
			},
		},
	},
];
