/* eslint-disable no-mixed-spaces-and-tabs */
type IpfsUrl = string;
type UnixTimestamp = string | number;
type PostId = number | string;

export type ProfileMetadataSchema = {
	attributes: Array<{
		trait_type: string;
		value: string | number;
	}>;
	description: string;
	image: string;
	name: string;
};

export type ImagePostMetadataSchema = {
	attributes: Array<
		| {
				trait_type: "post_type";
				value: "image";
		  }
		| {
				trait_type: "location";
				value: string;
		  }
		| {
				trait_type: "tags";
				value: string; // comma-delimited
		  }
		| {
				trait_type: "width";
				value: number;
		  }
		| {
				trait_type: "height";
				value: number;
		  }
		| {
				trait_type: "taken_on";
				value: UnixTimestamp;
		  }
	>;
	description: string;
	image: IpfsUrl;
	name: string;
};

export type ArticlePostMetadataSchema = {
	attributes: Array<
		| {
				trait_type: "post_type";
				value: "article";
		  }
		| {
				trait_type: "location";
				value: string;
		  }
		| {
				trait_type: "tags";
				value: string; // comma-delimited
		  }
		| {
				trait_type: "cover_image_post_id";
				value: PostId;
		  }
		| {
				trait_type: "body";
				value: IpfsUrl;
		  }
	>;
	description?: string;
	name: string;
};
