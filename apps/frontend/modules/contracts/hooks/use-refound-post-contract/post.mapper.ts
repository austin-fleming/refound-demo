import { isObject } from "@utils/data-helpers/is-object";
import { isString } from "@utils/data-helpers/is-string";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import { unixTimestamp } from "@utils/unix-timestamp";
import axios from "axios";
import { createGatewayUrl } from "../use-storage/helpers/create-gateway-url";
import type {
	ArticleMetadataStorageSchema,
	ArticlePost,
	ImageMetadataStorageSchema,
	ImagePost,
	ImagePostContractSchema,
	Post,
	PostDTO,
} from "../use-storage/schema";
import { DataHost, NftType } from "../use-storage/schema";
import { PostType } from "../use-storage/schema";

interface IPostMapper {
	modelToDso: (model: Post) => Result<PostContrac>;
	dsoToBaseModel: (dso: string) => Result<BasePost>;
	rawDtoToDto: (postId: string, rawDto: string) => Result<PostDTO>;
	dtoToModel: (dto: PostDTO) => Result<Post>;
}

export const postMapper: IPostMapper = {
	modelToDso: (model) => {
		try {
			const dataShape: PostContractSchema = {
				posterID: model.creatorId,
				postData: {
					postType: model.postType,
					assetCid: model.assetCid,
					creatorAddress: model.creatorAddress,
				},
			};

			return result.ok({
				posterID: JSON.stringify(dataShape.posterID),
				postData: JSON.stringify(dataShape.postData),
			});
		} catch (err) {
			console.error(err);
			return result.fail(new Error("Error occurred when formatting post to save."));
		}
	},
	// generic
	dsoToBaseModel: (rawDso) => {
		try {
			if (!rawDso) throw new Error("Missing post data");
			const dso = JSON.parse(rawDso);

			const creatorId = dso?.posterID;
			if (!creatorId) throw new Error("Missing posterId");

			const postData = dso?.postData;
			if (!postData) throw new Error("Missing postData");

			const createdAt = unixTimestamp.toDate(dso?.createdAt);
			if (!createdAt) throw new Error("Missing createdAt");

			const creatorAddress = dso.postData?.creatorAddress;
			if (!creatorAddress) throw new Error("Missing creatorAddress");

			const assetCid = dso.postData?.assetCid;
			if (!assetCid) throw new Error("Missing assetCid");

			const assetUrl = `https://ipfs.io/ipfs/${assetCid}`;

			const parsedPost: BasePost = {
				type: "POST",
				creatorId,
				creatorAddress,
				assetCid,
				assetUrl,
				createdAt,
			};

			return result.ok(parsedPost);
		} catch (err) {
			console.error(err);
			return result.fail(new Error("Error occurred while parsing post."));
		}
	},
	// eslint-disable-next-line sonarjs/cognitive-complexity
	rawDtoToDto: (postId: string, rawDTO: string): Result<PostDTO> => {
		try {
			if (!postId || !isString(postId)) throw new Error("postId is invalid");

			if (!rawDTO) throw new Error("No post provided");

			const parsedDTO = JSON.parse(rawDTO).catch(() => {
				throw new Error(`Parsing failed`);
			});

			if (!isObject(parsedDTO)) throw new Error("Parsed post is empty");

			// posterId
			const posterID = parsedDTO.posterID;
			if (!posterID || !isString(posterID)) throw new Error("posterId is invalid");

			// createdAt
			const createdAt = parsedDTO.createdAt;
			if (!createdAt || !isString(createdAt)) throw new Error("createdAt is invalid");

			const postData = parsedDTO.postData;
			if (!isObject(postData)) throw new Error("postData is missing");

			// type
			const rawType = postData.type;
			if (!isString(rawType) || !(rawType in NftType)) throw new Error("type is invalid");
			const type = NftType[rawType as keyof typeof NftType];

			// cid
			const cid = postData.cid;
			if (!cid || !isString(cid)) throw new Error("cid is invalid");

			// host
			const rawHost = postData.host;
			if (!isString(rawHost) || !(rawHost in DataHost)) throw new Error("host is invalid");
			const host = DataHost[rawHost as keyof typeof DataHost];

			// post type
			const rawPostType = postData.postType;
			if (!isString(rawPostType) || !(rawPostType in PostType))
				throw new Error("postType is invalid");
			const postType = PostType[rawPostType as keyof typeof PostType];

			// image post
			if (postType === PostType.IMAGE) {
				const metadataPath = postData.metadataPath;
				if (!metadataPath || !isString(metadataPath))
					throw new Error("metadataPath is invalid");

				const imagePath = postData.imagePath;
				if (!imagePath || !isString(imagePath)) throw new Error("imagePath is invalid");

				const postDto: PostDTO = {
					postId,
					posterID,
					createdAt,
					postData: {
						type,
						cid,
						host,
						postType,
						metadataPath,
						imagePath,
					},
				};

				return result.ok(postDto);
			}

			// article post
			if (postType === PostType.ARTICLE) {
				const metadataPath = postData.metadataPath;
				if (!metadataPath || !isString(metadataPath))
					throw new Error("metadataPath is invalid");

				const postDto: PostDTO = {
					postId,
					posterID,
					createdAt,
					postData: {
						type,
						cid,
						host,
						postType,
						metadataPath,
					},
				};

				return result.ok(postDto);
			}

			throw new Error(`postType "${postType}" does not match any parser.`);
		} catch (err) {
			return result.fail(err as Error);
		}
	},
	dtoToModel: (dto) => {
		const metadataUrl = createGatewayUrl(post.postData.cid, post.postData.metadataPath);
	},
};
