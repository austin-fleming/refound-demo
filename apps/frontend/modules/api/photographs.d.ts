export type Photograph = {
	type: "Photograph";
	id: string;
	title: string;
	source: string;
	width: number;
	height: number;
	description?: string;
	creatorUsername: string;
	location?: string;
	tags?: string[];
	date?: Date;
	slug: string;
};
