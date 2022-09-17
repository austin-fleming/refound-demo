import { isObject } from "@utils/data-helpers/is-object";
import { isString } from "@utils/data-helpers/is-string";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import { unixTimestamp } from "@utils/unix-timestamp";
import type Web3 from "web3";
import type {
	ArticleMetadataStorageSchema,
	ArticlePostContractSchema,
	ArticlePostCreationProps,
	BasePostContractSchema,
	BaseStorageSchema,
	ImageMetadataStorageSchema,
	ImagePostContractSchema,
	ImagePostCreationProps,
	PostContractDTO,
	PostCreationProperties,
	PostStorageSchema,
} from "../models/post.dto";
import type { ArticlePost, BasePost, ImagePost, Post } from "../models/post.model";
import { DataHost } from "../models/post.model";
import { NftType } from "../models/post.model";
import { PostType } from "../models/post.model";
import { queries as refoundQueries } from "../repo/refound-contract.repo";
import { queries as refoundPostQueries } from "../repo/refound-post-contract.repo";
import { createGatewayUrl } from "../repo/utils/create-gateway-url";
import { throwFieldError } from "./utils/throw-field-error";
import type { Contract } from "web3-eth-contract";
import type { ProfileId, ProfileOwnerAddress } from "../models/profile.model";

/*
--------
PARSERS
--------
*/
// eslint-disable-next-line sonarjs/cognitive-complexity
const contractDataToDto = (contractData: string): Result<PostContractDTO> => {
	console.log({ contractDataToDto: contractData });
	try {
		if (!contractData || !isString(contractData)) throw new Error("contractData is invalid");

		const parsed = JSON.parse(contractData);
		if (!parsed || !isObject(parsed)) throw new Error("failed to parsed contract data");

		const postRoot: Omit<PostContractDTO, "postData"> = {
			posterId: (parsed.posterId as string) || throwFieldError("posterId"),
			postId: parsed.postId as number,
			createdAt: (parsed.createdAt as string) || throwFieldError("createdAt"),
		};

		const postData = parsed.postData;
		if (!isObject(postData)) throw new Error("postData is missing");

		// if image post
		if (postData.postType === PostType.IMAGE) {
			const postDto: PostContractDTO = {
				...postRoot,
				postData: {
					type: NftType.POST,
					cid: (postData.cid as string) || throwFieldError("cid"),
					host: (postData.host as string) || throwFieldError("host"),
					postType: (postData.postType as string) || throwFieldError("postType"),
					metadataPath:
						(postData.metadataPath as string) || throwFieldError("metadataPath"),
					imagePath: (postData.imagePath as string) || throwFieldError("imagePath"),
				},
			};

			return result.ok(postDto);
		}
		// if article post
		if (postData.postType === PostType.ARTICLE) {
			const postDto: PostContractDTO = {
				...postRoot,
				postData: {
					type: NftType.POST,
					cid: (postData.cid as string) || throwFieldError("cid"),
					host: (postData.host as string) || throwFieldError("host"),
					postType: (postData.postType as string) || throwFieldError("postType"),
					metadataPath:
						(postData.metadataPath as string) || throwFieldError("metadataPath"),
				},
			};

			return result.ok(postDto);
		}

		throw new Error(`Unknown post type: "${postData.postType}"`);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const dtoToModel = async (
	contract: Contract,
	contractDto: PostContractDTO,
	storageDto: PostStorageSchema,
): Promise<Result<Post>> => {
	try {
		const createdAt = unixTimestamp.toDate(contractDto.createdAt).unwrapOrElse((err) => {
			throw err;
		});

		const basePost: BasePost = {
			type: NftType.POST,
			creatorId: contractDto.posterId,
			creatorAddress: storageDto.originalCreatorAddress,
			postId: contractDto.postId,
			createdAt,
			title: storageDto.title,
			tags: storageDto.tags,
			location: storageDto.location,
		};

		// if image post
		if (contractDto.postData.postType === PostType.IMAGE) {
			const postData = contractDto.postData as ImagePostContractSchema;
			const metadata = storageDto as ImageMetadataStorageSchema;

			const dateTaken = metadata.dateTaken
				? unixTimestamp.toDate(metadata.dateTaken).unwrapOrElse((err) => {
						throw err;
				  })
				: undefined;

			const post: ImagePost = {
				...basePost,
				postType: PostType.IMAGE,
				imageSource: createGatewayUrl(postData.cid, postData.imagePath),
				description: metadata.description,
				width: metadata.width,
				height: metadata.height,
				dateTaken,
			};

			return result.ok(post as Post);
		}

		// if article post
		if (contractDto.postData.postType === PostType.ARTICLE) {
			const metadata = storageDto as ArticleMetadataStorageSchema;

			const image = metadata.coverImageId
				? ((await refoundPostQueries.getPost(contract, metadata.coverImageId)).unwrapOrElse(
						(err) => {
							throw err;
						},
				  ) as ImagePost)
				: undefined;

			const post: ArticlePost = {
				...basePost,
				postType: PostType.ARTICLE,
				body: metadata.body,
				coverImage: image,
			};

			return result.ok(post as Post);
		}

		throw new Error(`${contractDto.postData.postType} does not match any parser`);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const creationPropsToContractDso = (
	cid: string,
	paths: string[],
	postType: PostType,
): Result<string> => {
	try {
		if (!cid) throwFieldError("cid");
		if (!paths || !Array.isArray(paths) || !paths[0]) throwFieldError("paths");
		if (!postType) throwFieldError("postType");

		const baseProps: BasePostContractSchema = {
			type: NftType.POST,
			cid,
			host: DataHost.IPFS,
		};

		if (postType === PostType.IMAGE) {
			if (!paths[1]) throwFieldError("imagePath");

			const imageProps: ImagePostContractSchema = {
				...baseProps,
				postType,
				metadataPath: paths[0],
				imagePath: paths[1],
			};

			return result.ok(JSON.stringify(imageProps));
		}

		if (postType === PostType.ARTICLE) {
			const articleProps: ArticlePostContractSchema = {
				...baseProps,
				postType,
				metadataPath: paths[0],
			};

			return result.ok(JSON.stringify(articleProps));
		}

		throw new Error(`postType "${postType}" does not match any parser`);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const creationPropsToStorageSchema = (
	creatorAddress: ProfileOwnerAddress,
	creatorId: ProfileId,
	postType: PostType,
	creationProps: PostCreationProperties,
	// eslint-disable-next-line sonarjs/cognitive-complexity
): Result<PostStorageSchema> => {
	try {
		if (!creatorAddress || !isString(creatorAddress)) throwFieldError("creatorAddress");
		if (!creatorId || !isString(creatorId)) throwFieldError("creatorId");

		const title = creationProps.title;
		if (!title || !isString(title)) throwFieldError("title");

		const tags = creationProps.tags || [];
		if (!tags || !Array.isArray(tags)) throwFieldError("tags");

		const location = creationProps.location;

		const baseSchema: BaseStorageSchema = {
			type: NftType.POST,
			originalCreatorAddress: creatorAddress,
			originalCreatorProfileId: creatorId,
			title,
			tags,
			location,
		};

		if (postType === PostType.IMAGE) {
			const { description, width, height } = creationProps as ImagePostCreationProps;

			if (!width) throwFieldError("width");
			if (!height) throwFieldError("height");

			const imageSchema: ImageMetadataStorageSchema = {
				...baseSchema,
				postType: PostType.IMAGE,
				description,
				width,
				height,
			};

			return result.ok(imageSchema as PostStorageSchema);
		}

		if (postType === PostType.ARTICLE) {
			const { body, coverImageId } = creationProps as ArticlePostCreationProps;

			if (!body || !isString(body)) throwFieldError("body");
			if (coverImageId && !isString(coverImageId)) throwFieldError("coverImageId");

			const articleSchema: ArticleMetadataStorageSchema = {
				...baseSchema,
				postType: PostType.ARTICLE,
				body,
				coverImageId,
			};

			return result.ok(articleSchema as PostStorageSchema);
		}

		throw new Error(`postType "${postType}" does not match any parser.`);
	} catch (err) {
		return result.fail(err as Error);
	}
};

export const postParser = {
	contractDataToDto,
	dtoToModel,
	creationPropsToContractDso,
	creationPropsToStorageSchema,
};
