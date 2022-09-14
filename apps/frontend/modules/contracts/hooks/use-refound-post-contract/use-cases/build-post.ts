import type { Nullable, Result } from "@utils/monads";
import { result } from "@utils/monads";
import { unixTimestamp } from "@utils/unix-timestamp";
import axios from "axios";
import type { Contract } from "web3-eth-contract";
import { createGatewayUrl } from "../../use-storage/helpers/create-gateway-url";
import type {
	ArticleMetadataStorageSchema,
	ArticlePost,
	BasePost,
	ImageMetadataStorageSchema,
	ImagePost,
	Post,
	PostDTO,
} from "../../use-storage/schema";
import { makeGetPost } from "./get-post";

export const buildPost =
	(contract: Nullable<Contract>) =>
	async (post: PostDTO): Promise<Result<Post>> => {
		try {
			const metadataUrl = createGatewayUrl(post.postData.cid, post.postData.metadataPath);

			const metadata = await axios
				.get<ImageMetadataStorageSchema | ArticleMetadataStorageSchema>(metadataUrl)
				.then((response) => response.data)
				.catch((err) => {
					console.error(err);
					throw new Error("Failed to fetch metadata");
				});

			console.log({ metadata });

			const createdAt = unixTimestamp.toDate(post.createdAt);
			if (!createdAt) throw new Error("timestamp is invalid");

			const basePost: BasePost = {
				type: post.postData.type,
				creatorId: post.posterID,
				creatorAddress: metadata.originalCreatorAddress,
				postId: post.postId,
				createdAt: createdAt,
				title: metadata.title,
				tags: metadata.tags,
				location: metadata.location,
			};

			if (post.postData.postType === "IMAGE" && metadata.postType === "IMAGE") {
				const imagePost: ImagePost = {
					...basePost,
					postType: post.postData.postType,
					imageSource: createGatewayUrl(post.postData.cid, post.postData.imagePath),
					description: metadata.description,
					width: metadata.width,
					height: metadata.height,
					dateTaken: metadata.dateTaken,
				};

				return result.ok(imagePost as Post);
			}

			if (post.postData.postType === "ARTICLE" && metadata.postType === "ARTICLE") {
				let coverImage: ImagePost | undefined = undefined;
				if (metadata.coverImageId) {
					console.log("...fetching cover image");
					const fetchedCoverImage = await makeGetPost(contract)(metadata.coverImageId);
					coverImage = fetchedCoverImage.unwrapOrElse((err) => {
						throw err;
					}) as ImagePost;
				}

				const articlePost: ArticlePost = {
					...basePost,
					postType: post.postData.postType,
					body: metadata.body,
					...(coverImage && { coverImage: coverImage }),
				};

				return result.ok(articlePost as Post);
			}

			throw new Error(
				`No parser exists for postType "${post.postData.postType}","${metadata.postType}"`,
			);
		} catch (err) {
			console.error("Could not build post from dto");
			return result.fail(err as Error);
		}
	};
