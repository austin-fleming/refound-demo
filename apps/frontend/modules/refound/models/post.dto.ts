/* 
IPFS DTO

This is what should be written/read from ipfs.
*/
type BaseStorageSchema = {
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
type BasePostContractSchema = {
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
	postId: string;
	createdAt: string; // unix timestamp
	postData: ImagePostContractSchema | ArticlePostContractSchema;
};

// CREATION PROPERTIES
export type PostCreationProperties = {};
