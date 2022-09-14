// HELPERS
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

type Cid = string;

type FileName = string;

type Markdown = string;

type PostId = string;

type ProfileId = string;

type WalletAddress = string;

type UnixTimestamp = string;

// METADATA SCHEMA: what gets stored on IPFS
type BaseStorageSchema = {
	type: NftType.POST;
	title: string;
	tags: string[];
	location?: string;
	originalCreatorAddress: WalletAddress;
	originalCreatorProfileId: ProfileId;
};

export type ImageMetadataStorageSchema = {
	postType: PostType.IMAGE;
	description?: string;
	width: number;
	height: number;
	dateTaken?: Date;
} & BaseStorageSchema;

export type ArticleMetadataStorageSchema = {
	postType: PostType.ARTICLE;
	body: Markdown;
	coverImageId?: PostId;
} & BaseStorageSchema;

// CONTRACT SCHEMA: What gets stored on the chain. This is what should be in POST requests. Get requests will be different.
type BasePostContractSchema = {
	type: NftType.POST;
	cid: Cid;
	host: DataHost;
};

export type ImagePostContractSchema = {
	postType: PostType.IMAGE;
	metadataPath: FileName;
	imagePath: FileName;
} & BasePostContractSchema;

export type ArticlePostContractSchema = {
	postType: PostType.ARTICLE;
	metadataPath: FileName;
} & BasePostContractSchema;

// CONTRACT DTO: What the contract will return when called
export type PostDTO = {
	posterID: ProfileId;
	postId: PostId;
	createdAt: UnixTimestamp;
	postData: ImagePostContractSchema | ArticlePostContractSchema;
};

// MODELS: What will be passed around in application
type BasePost = {
	type: NftType.POST;
	creatorId: ProfileId;
	creatorAddress: WalletAddress;
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
};

export type Post = ImagePost | ArticlePost;

// Post License
enum LicenseType {
	Outright = "Outright",
	WebLicense = "WebLicense",
	PrintLicense = "PrintLicense",
	SingleUse = "SingleUse",
}

export type LicenseDTO = {
	postID: string;
	Ltype: string;
	purchaseDate: UnixTimestamp;
};

export type License = {
	postId: string;
	license: LicenseType;
	purchaseDate: Date;
};
