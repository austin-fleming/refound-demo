import { accountMocks } from "./account.mocks";
import type { TextPost } from "./text-post";

export const textPostMocks: TextPost[] = [
	{
		type: "TextPost",
		id: "123",
		creatorUsername: accountMocks[0].username,
		title: "Article 01",
		body: "article body 01",
		tags: ["tag1"],
		date: new Date(),
		slug: "article-01",
	},
	{
		type: "TextPost",
		id: "1234",
		creatorUsername: accountMocks[0].username,
		title: "Article 02",
		body: "article body 02",
		tags: [],
		date: new Date(),
		slug: "article-02",
	},
	{
		type: "TextPost",
		id: "12345",
		creatorUsername: accountMocks[1].username,
		title: "Article 03",
		body: "article body 03",
		date: new Date(),
		slug: "article-03",
	},
	{
		type: "TextPost",
		id: "123456",
		creatorUsername: accountMocks[1].username,
		title: "Article 04",
		body: "article body 04",
		tags: ["tag1", "tag2"],
		date: new Date(),
		slug: "article-04",
	},
];
