/* eslint-disable sonarjs/cognitive-complexity */
import type { PostTable } from "@repo/common/db/cache/cache-tables";
import type {
	ArticlePostMetadataSchema,
	ImagePostMetadataSchema,
} from "@repo/common/refound-contracts/contract-types";
import type { Nullable } from "@repo/common/utils/helper-types";
import { ipfsToW3sGateway } from "@repo/common/utils/ipfs";
import type { Result } from "@repo/common/utils/monads";
import { result } from "@repo/common/utils/monads";
import { unixTimestamp } from "@repo/common/utils/time";
import { isNothing, isNumber, isString, isZero } from "@repo/common/utils/validation";
import { stringToNumber } from "@repo/common/utils/transformers";
import axios from "axios";

type ImagePostAttribute<trait = string> = Extract<
	ImagePostMetadataSchema["attributes"][number],
	{ trait_type: trait }
>;

type ArticlePostAttribute<trait = string> = Extract<
	ArticlePostMetadataSchema["attributes"][number],
	{ trait_type: trait }
>;

const parseImagePost = ({
	data,
	postId,
	creatorId,
	createdAt,
}: {
	createdAt: string;
	creatorId: number;
	data: ImagePostMetadataSchema;
	postId: number;
}): Extract<PostTable, { postType: "IMAGE" }> => {
	const { name, image, description, attributes } = data;

	if (isNothing(name)) throw new Error(`Name could not be parsed for post ${postId}`);
	if (isNothing(image)) throw new Error(`Image could not be parsed for post ${postId}`);
	if (isNothing(description))
		throw new Error(`Description could not be parsed for post ${postId}`);

	// TAGS
	const tagsTrait = attributes.find(
		(attribute) => attribute.trait_type === "tags",
	) as ImagePostAttribute<"tags">;

	const tags = isString(tagsTrait?.value) ? tagsTrait.value.toLowerCase().split(",") : [];

	// LOCATION
	const locationTrait = attributes.find(
		(attribute) => attribute.trait_type === "location",
	) as ImagePostAttribute<"location">;

	const location = isString(locationTrait?.value) ? locationTrait.value.toLowerCase() : undefined;

	// WIDTH + HEIGHT
	const widthTrait = attributes.find((attribute) => attribute.trait_type === "width") as Nullable<
		ImagePostAttribute<"width">
	>;

	const heightTrait = attributes.find(
		(attribute) => attribute.trait_type === "height",
	) as Nullable<ImagePostAttribute<"height">>;

	const maybeWidth =
		isNumber(widthTrait?.value) && !isZero(widthTrait?.value) ? widthTrait?.value : undefined;
	const maybeHeight =
		isNumber(heightTrait?.value) && !isZero(heightTrait?.value) ? widthTrait?.value : undefined;

	// only cache if both are defined and not zero.
	const width = maybeHeight && maybeWidth ? maybeWidth : undefined;
	const height = maybeWidth && maybeHeight ? maybeHeight : undefined;

	// TAKEN_ON
	const takenOnTrait = attributes.find(
		(attribute) => attribute.trait_type === "taken_on",
	) as Nullable<ImagePostAttribute<"taken_on">>;

	const takenOn =
		isString(takenOnTrait?.value) || isNumber(takenOnTrait?.value)
			? unixTimestamp
					.toDate(takenOnTrait!.value)
					.mapOk((date) => date.toISOString())
					.extract()
			: undefined;

	// IMAGE LINK
	const imageLink = ipfsToW3sGateway(image).extract();
	if (!imageLink)
		throw new Error(
			`Failed to convert ipfs link "${image}" for post "${postId}" into usable link.`,
		);

	// POST
	const post: PostTable = {
		created_at: createdAt,
		creator: creatorId,
		description,
		height,
		id: postId,
		image_link: imageLink,
		location,
		post_type: "IMAGE",
		tags,
		taken_on: takenOn,
		title: name,
		width,
	};

	return post;
};

const parseArticlePost = async ({
	data,
	postId,
	creatorId,
	createdAt,
}: {
	createdAt: string;
	creatorId: number;
	data: ArticlePostMetadataSchema;
	postId: number;
}): Promise<Extract<PostTable, { postType: "ARTICLE" }>> => {
	const { name, description, attributes } = data;

	if (isNothing(name)) throw new Error(`Name could not be parsed for post ${postId}`);

	// TAGS
	const tagsTrait = attributes.find(
		(attribute) => attribute.trait_type === "tags",
	) as ArticlePostAttribute<"tags">;

	const tags = isString(tagsTrait?.value) ? tagsTrait.value.toLowerCase().split(",") : [];

	// LOCATION
	const locationTrait = attributes.find(
		(attribute) => attribute.trait_type === "location",
	) as ArticlePostAttribute<"location">;

	const location = isString(locationTrait?.value) ? locationTrait.value.toLowerCase() : undefined;

	// COVER_IMAGE
	const coverImageTrait = attributes.find(
		(attribute) => attribute.trait_type === "cover_image_post_id",
	) as ArticlePostAttribute<"cover_image_post_id">;

	const coverImageId =
		isString(coverImageTrait?.value) || isNumber(coverImageTrait?.value)
			? stringToNumber(coverImageTrait.value).extract()
			: undefined;

	// BODY
	const bodyTrait = attributes.find(
		(attribute) => attribute.trait_type === "body",
	) as ArticlePostAttribute<"body">;

	if (!bodyTrait?.value || !isString(bodyTrait.value))
		throw new Error(`Body could not be parsed for post "${postId}"`);
	const bodyIpfsGateway = ipfsToW3sGateway(bodyTrait.value).unwrapOrElse(() => {
		throw new Error(`Could not build gateway url for body of post "${postId}"`);
	});
	const body = await axios
		.get<string>(bodyIpfsGateway)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
			throw new Error(`Failed to fetch body for post "${postId}" at "${bodyIpfsGateway}"`);
		});

	const post: PostTable = {
		body,
		cover_image: coverImageId,
		created_at: createdAt,
		creator: creatorId,
		description,
		id: postId,
		location,
		post_type: "ARTICLE",
		tags,
		title: name,
	};

	return post;
};

export const postParser = async ({
	data,
	postId,
	creatorId,
	createdAt,
}: {
	createdAt: string;
	creatorId: number;
	data: ImagePostMetadataSchema | ArticlePostMetadataSchema;
	postId: number;
}): Promise<Result<PostTable>> => {
	try {
		if (isNothing(data)) throw new Error(`No data provided for post "${postId}"`);
		if (isNothing(postId)) throw new Error(`No postId provided for post`);
		if (isNothing(creatorId)) throw new Error(`No creatorId provided for post "${creatorId}"`);
		if (isNothing(createdAt)) throw new Error(`No createdAt provided for post "${creatorId}"`);

		// @ts-expect-error: this is hard for TS to discriminate
		const postType = data.attributes.find((value) => value.trait_type === "post_type");
		if (isNothing(postType))
			throw new Error(`PostType could not be parsed for post "${postId}"`);

		if (postType === "image") {
			const imagePost = parseImagePost({
				createdAt,
				creatorId,
				data: data as ImagePostMetadataSchema,
				postId,
			});

			return result.ok(imagePost as PostTable);
		}

		if (postType === "article") {
			const articlePost = await parseArticlePost({
				createdAt,
				creatorId,
				data: data as ArticlePostMetadataSchema,
				postId,
			});

			return result.ok(articlePost as PostTable);
		}

		throw new Error(`Could not parse unrecognized postType "${postType}" in postParser.`);
	} catch (error) {
		return result.fail(error as Error);
	}
};
