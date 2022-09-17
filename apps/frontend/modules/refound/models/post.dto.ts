import type { Expand } from "@utils/helper-types/expand";
import type { PostId, PostType } from "./post.model";
import type { ProfileId, ProfileOwnerAddress } from "./profile.model";

/* 
IPFS DTO

This is what should be written/read from ipfs.
*/
export type BaseStorageSchema = {
	type: string;
	title: string;
	tags: string[];
	location?: string;
	originalCreatorAddress: string;
	originalCreatorProfileId: string;
};

export type ImageMetadataStorageSchema = {
	postType: string;
	description?: string;
	width: number;
	height: number;
	dateTaken?: string; // unix timestamp
} & BaseStorageSchema;

export type ArticleMetadataStorageSchema = {
	postType: string;
	body: string;
	coverImageId?: string;
} & BaseStorageSchema;

export type PostStorageSchema = ImageMetadataStorageSchema | ArticleMetadataStorageSchema;

/* 
CONTRACT DTO

This is what the contract will return when called.
*/
export type BasePostContractSchema = {
	type: string;
	cid: string;
	host: string;
};

export type ImagePostContractSchema = {
	postType: string;
	metadataPath: string;
	imagePath: string;
} & BasePostContractSchema;

export type ArticlePostContractSchema = {
	postType: string;
	metadataPath: string;
} & BasePostContractSchema;

// CONTRACT DTO: What the contract will return when called
export type PostContractDTO = {
	posterId: string;
	postId: number;
	createdAt: string; // unix timestamp
	postData: ImagePostContractSchema | ArticlePostContractSchema;
};

// CREATION PROPERTIES
export type BaseCreationProps = {
	title: string;
	tags?: string[];
	location?: string;
};

export type ImagePostCreationProps = Expand<
	{
		description?: string;
		width: number;
		height: number;
	} & BaseCreationProps
>;

export type ArticlePostCreationProps = {
	coverImageId?: PostId;
	body: string;
} & BaseCreationProps;

export type PostCreationProperties = ImagePostCreationProps | ArticlePostCreationProps;
