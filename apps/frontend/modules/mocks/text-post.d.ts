import type { Account } from "./account";

export type TextPost = {
	type: "TextPost";
	id: string;
	creator: Account;
	coverImage?: string;
	title: string;
	body: string;
	tags?: string[];
	date: Date;
	slug: string;
	ranking: PostRanking;
};
