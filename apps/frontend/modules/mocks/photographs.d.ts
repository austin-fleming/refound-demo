export type Photograph = {
	type: "Photograph";
	id: string;
	title: string;
	source: string;
	width: number;
	height: number;
	description?: string;
	creator: Account;
	location?: string;
	tags?: string[];
	date: Date;
	slug: string;
	ranking: PostRanking;
};
