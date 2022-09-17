import type { Markdown } from "@modules/shared/models/markdown.vo";
import type { ProfileId, ProfileOwnerAddress } from "./profile.model";

export enum NftType {
	POST = "POST",
}

export enum PostType {
	IMAGE = "IMAGE",
	ARTICLE = "ARTICLE",
}

export enum DataHost {
	IPFS = "IPFS",
}

export type PostId = number | string;

export type BasePost = {
	type: NftType.POST;
	creatorId: ProfileId;
	creatorAddress: ProfileOwnerAddress;
	postId: PostId;
	createdAt: Date;
	title: string;
	tags: string[];
	location?: string;
};

export type ImagePost = {
	postType: PostType.IMAGE;
	imageSource: string;
	description?: string;
	width: number;
	height: number;
	dateTaken?: Date;
} & BasePost;

export type ArticlePost = {
	postType: PostType.ARTICLE;
	body: Markdown;
	coverImage?: ImagePost;
} & BasePost;

export type Post = ImagePost | ArticlePost;
