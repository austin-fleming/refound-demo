export type TextPost = {
	type: "TextPost";
	id: string;
	creatorUsername: string;
	title: string;
	body: string;
	tags?: string[];
	date: Date;
	slug: string;
};
