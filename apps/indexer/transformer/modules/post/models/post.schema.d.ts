// https://docs.opensea.io/docs/metadata-standards

/* eslint-disable typescript-sort-keys/interface */
import type { IpfsUrl } from "@modules/common/domain/ipfs-url.vo";
import type { UnixTimestamp } from "@modules/common/domain/unix-timestamp.vo";

export type PostId = number;

export type ImagePostMetadataSchema = {
	name: string;
	description: string;
	image: IpfsUrl;
	attributes: [
		{
			trait_type: "post_type";
			value: "image";
		},
		{
			trait_type: "location";
			value: string;
		},
		{
			trait_type: "tags";
			value: string; // comma-delimited
		},
		{
			trait_type: "width";
			value: number;
		},
		{
			trait_type: "height";
			value: number;
		},
		{
			trait_type: "taken_on";
			value: UnixTimestamp;
		},
	];
};

export type ArticlePostMetadataSchema = {
	name: string;
	description?: string;
	attributes: [
		{
			trait_type: "post_type";
			value: "article";
		},
		{
			trait_type: "location";
			value: string;
		},
		{
			trait_type: "tags";
			value: string; // comma-delimited
		},
		{
			trait_type: "cover_image_post_id";
			value: PostId;
		},
		{
			trait_type: "body";
			value: IpfsUrl;
		},
	];
};
