// HELPERS
type ProfileId = string;

type UnixTimestamp = string;

type Cid = string;

/* type PostType = "IMAGE" | "ARTICLE"; */
enum PostType {
	IMAGE = "IMAGE",
	ARTICLE = "ARTICLE",
}

type PostId = string;

type ProfileId = number;

type LicenseType = "Outright" | "WebLicense" | "PrintLicense" | "SingleUse";

type ImageType = "image/jpeg" | "image/png" | "image/gif" | "image/svg";

type License = {
	postId: string;
	licenseType: LicenseType;
	purchaseData: string;
};

// MODELS

type BasePost = {
	type: "POST";
	creatorAddress: string;
	creatorId: string;
	assetUrl: string;
	assetCid: Cid;
	createdAt: Date;
};

export type ImagePost = {
	postType: PostType.IMAGE;
	description: string;
	location: string;
} & BasePost;

export type ArticlePost = {
	postType: PostType.ARTICLE;
	summary: string;
	body: string; // md
} & BasePost;

export type Post = ImagePost | ArticlePost;

export type OwnedPost = Post & { license: License };

// FILE COIN
export type ImageStorageSchema = {
	postType: PostType.IMAGE;
	imageFile: File;
	contentType: ImageType;
	width: number;
	height: number;
	title: string;
	description: string;
	tags: string[];
};

export type ArticleStorageSchema = {
	postType: PostType.ARTICLE;
	title: string;
	body: string;
	coverImageCid?: string; // Link to ImageAssetDSO
	tags: string[];
};

export type PostStorageSchema = ImageStorageSchema | ArticleStorageSchema;

// CONTRACT
export type PostContractSchema = {
	posterID: ProfileId;
	postData: {
		postType: PostType;
		assetCid: Cid;
		creatorAddress: string;
	};
};

export type PostContractDSO = {
	posterID: string;
	postData: string;
};

// Asset on IPFS

// NFT on chain

// NFT contract

// NFT on frontend

// Item owned in account
