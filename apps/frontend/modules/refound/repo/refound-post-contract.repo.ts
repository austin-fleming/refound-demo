import type { Result } from "@utils/monads";
import type { Contract } from "web3-eth-contract";
import type { PostId } from "../models/post.model";
import type { PostInteraction, PostInteractionList } from "../models/interactions.model";
import { PostType } from "../models/post.model";
import type { ProfileOwnerAddress } from "../models/profile.model";
import { result } from "@utils/monads";
import { postParser } from "../parsers/post.parser";
import { queries as ipfsQueries } from "./ipfs.repo";
import { LicenseType } from "../models/license.model";
import type {
	ArticlePostAggregate,
	ImagePostAggregate,
	PostAggregate,
} from "../models/post.aggregate";
import type { LicenseContractDTO } from "../models/license.dto";
import type { LicenseAggregate } from "../models/license.aggregate";
import { unixTimestamp } from "@utils/unix-timestamp";
import { throwFieldError } from "../parsers/utils/throw-field-error";
import { isString } from "@utils/data-helpers/is-string";
import { interactionParser } from "../parsers/interaction.parser";

/* 
----------------
QUERIES
----------------
*/
const getPostInteractions = async (
	postContract: Contract,
	postId: PostId,
): Promise<Result<PostInteractionList>> => {
	try {
		// 1. get everyone who has interacted
		const interactionAddress: string[] = await postContract.methods
			.getContentInteractionAddresses(postId)
			.call();
		console.log({ interactionAddress, postId });
		// 2. get interactions for each address
		const interactions = result
			.sequence(
				await Promise.all(
					interactionAddress.map(async (address) => {
						const interactionCode = await postContract.methods
							.getContentInteractions(postId, address)
							.call();
						return interactionParser.codeToValue(interactionCode);
					}),
				),
			)
			.unwrapOrElse((err) => {
				throw err;
			});
		console.log({ interactions });
		// 3. reduce into interactions list
		const interactionList: PostInteractionList = interactions.reduce(
			(last, current) => ({
				...last,
				[current]: last[current] + 1,
			}),
			{ None: 0, UpVote: 0, DownVote: 0, Report: 0 },
		);

		return result.ok(interactionList);
	} catch (error) {
		return result.fail(error as Error);
	}
};
const getPost = async (
	coreContract: Contract,
	postContract: Contract,
	postId: PostId,
): Promise<Result<PostAggregate>> => {
	try {
		const rawUri = await postContract.methods.tokenURI(postId).call();

		if (!rawUri) throw new Error(`No uri returned for postId "${postId}"`);

		const postDto = postParser.contractDataToDto(rawUri).unwrapOrElse((err) => {
			throw err;
		});

		const metadata = (
			await ipfsQueries.getPostMetadata(postDto.postData.cid, postDto.postData.metadataPath)
		).unwrapOrElse((err) => {
			throw err;
		});

		return postParser.dtoToAggregate(coreContract, postContract, postDto, metadata);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getAllPosts = async (
	coreContract: Contract,
	postContract: Contract,
): Promise<Result<PostAggregate[]>> => {
	try {
		const rawUris = await postContract.methods.getAllPosts().call();

		if (!Array.isArray(rawUris)) throw new Error("Expected array from contract");

		const posts = await Promise.all(
			rawUris.map(async (postUri) => {
				const postDto = postParser.contractDataToDto(postUri).unwrapOrElse((err) => {
					throw err;
				});

				const metadata = (
					await ipfsQueries.getPostMetadata(
						postDto.postData.cid,
						postDto.postData.metadataPath,
					)
				).unwrapOrElse((err) => {
					throw err;
				});

				return postParser.dtoToAggregate(coreContract, postContract, postDto, metadata);
			}),
		);

		return result.sequence(posts.reverse());
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getAllImagePosts = async (
	coreContract: Contract,
	postContract: Contract,
): Promise<Result<ImagePostAggregate[]>> => {
	try {
		const rawUris = await postContract.methods.getAllPosts().call();

		if (!Array.isArray(rawUris)) throw new Error("Expected array from contract");

		const dtos = rawUris.map((uri) =>
			postParser.contractDataToDto(uri).unwrapOrElse((err) => {
				throw err;
			}),
		);
		const imageDtos = dtos.filter((dto) => dto.postData.postType === PostType.IMAGE);

		const posts = (await Promise.all(
			imageDtos.map(async (imageDto) => {
				const metadata = (
					await ipfsQueries.getPostMetadata(
						imageDto.postData.cid,
						imageDto.postData.metadataPath,
					)
				).unwrapOrElse((err) => {
					throw err;
				});

				return postParser.dtoToAggregate(coreContract, postContract, imageDto, metadata);
			}),
		)) as Result<ImagePostAggregate>[];

		return result.sequence(posts.reverse());
	} catch (err) {
		return result.fail(err as Error);
	}
};
const getAllArticlePosts = async (
	coreContract: Contract,
	postContract: Contract,
): Promise<Result<ArticlePostAggregate[]>> => {
	try {
		const rawUris = await postContract.methods.getAllPosts().call();

		if (!Array.isArray(rawUris)) throw new Error("Expected array from contract");

		const dtos = rawUris.map((uri) =>
			postParser.contractDataToDto(uri).unwrapOrElse((err) => {
				throw err;
			}),
		);
		const articleDtos = dtos.filter((dto) => dto.postData.postType === PostType.ARTICLE);

		const posts = (await Promise.all(
			articleDtos.map(async (articleDto) => {
				const metadata = (
					await ipfsQueries.getPostMetadata(
						articleDto.postData.cid,
						articleDto.postData.metadataPath,
					)
				).unwrapOrElse((err) => {
					throw err;
				});

				return postParser.dtoToAggregate(coreContract, postContract, articleDto, metadata);
			}),
		)) as Result<ArticlePostAggregate>[];

		return result.sequence(posts.reverse());
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getPostsByProfile = async (
	coreContract: Contract,
	postContract: Contract,
	address: ProfileOwnerAddress,
): Promise<Result<PostAggregate[]>> => {
	try {
		const postIds = await postContract.methods.getPostIDs(address).call();

		if (!Array.isArray(postIds)) throw new Error("Expected array from contract");

		const posts = await Promise.all(
			postIds.map(async (postId) => {
				const rawPost = await postContract.methods.tokenURI(postId).call();

				const postDto = postParser.contractDataToDto(rawPost).unwrapOrElse((err) => {
					throw err;
				});

				const metadata = (
					await ipfsQueries.getPostMetadata(
						postDto.postData.cid,
						postDto.postData.metadataPath,
					)
				).unwrapOrElse((err) => {
					throw err;
				});

				return postParser.dtoToAggregate(coreContract, postContract, postDto, metadata);
			}),
		);

		return result.sequence(posts);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getImagePostsByOwner = async (
	baseContract: Contract,
	postContract: Contract,
	address: ProfileOwnerAddress,
): Promise<Result<ImagePostAggregate[]>> =>
	(await getPostsByProfile(baseContract, postContract, address)).mapOk(
		(posts) => posts.filter((post) => post.postType === PostType.IMAGE) as ImagePostAggregate[],
	);

const getArticlePostsByOwner = async (
	baseContract: Contract,
	postContract: Contract,
	address: ProfileOwnerAddress,
): Promise<Result<ArticlePostAggregate[]>> =>
	(await getPostsByProfile(baseContract, postContract, address)).mapOk(
		(posts) =>
			posts.filter((post) => post.postType === PostType.ARTICLE) as ArticlePostAggregate[],
	);

const getLicensesByAddress = async (
	coreContract: Contract,
	postContract: Contract,
	walletAddress: ProfileOwnerAddress,
): Promise<Result<LicenseAggregate[]>> => {
	try {
		const rawLicenses: LicenseContractDTO[] = await postContract.methods
			.getLicensesByAddress(walletAddress)
			.call();

		const licenses: LicenseAggregate[] = await Promise.all(
			rawLicenses.map(async (rawLicense) => {
				const postId = rawLicense.postID;

				const rawLicenseType = rawLicense.Ltype;
				if (!isString(rawLicenseType) || !(rawLicenseType in LicenseType))
					throwFieldError("licenseType");
				const licenseType = LicenseType[rawLicenseType as keyof typeof LicenseType];

				const purchaseDate = unixTimestamp
					.toDate(rawLicense.purchaseDate)
					.unwrapOrElse((err) => {
						throw err;
					});

				const post = (await getPost(coreContract, postContract, postId)).unwrapOrElse(
					(err) => {
						throw err;
					},
				);

				return {
					postId,
					licenseType,
					purchaseDate,
					post,
				};
			}),
		);

		return result.ok(licenses);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getLicensePrices = async (contract: Contract) => {
	try {
		const pricingList = contract.methods.prices().call();

		if (
			!pricingList ||
			!Array.isArray(pricingList) ||
			pricingList.length !== Object.keys(LicenseType).length
		)
			throwFieldError("prices");

		const table: Record<LicenseType, string | number> = {
			Outright: pricingList[0],
			WebLicense: pricingList[1],
			PrintLicense: pricingList[2],
			SingleUse: pricingList[3],
		};

		return result.ok(table);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getLikedPostsByAccount = async (
	coreContract: Contract,
	postContract: Contract,
	accountAddress: ProfileOwnerAddress,
): Promise<Result<PostAggregate[]>> => {
	try {
		// 1. Get all posts to start
		const allPostUris: string[] = await postContract.methods.getAllPosts().call();

		// 2. Find posts with a like interaction
		const dtosWithIsLiked = await Promise.all(
			allPostUris.map(async (uri) => {
				// parse from string to dto object
				const dto = postParser.contractDataToDto(uri).unwrapOrElse((err) => {
					throw err;
				});
				// find interactions by the user
				const interaction: number = await postContract.methods
					.getContentInteractions(dto.postId, accountAddress)
					.call();
				// see if it's a like
				const isLiked = interactionParser.codeToValue(interaction).extract() === "UpVote";

				return { ...dto, isLiked };
			}),
		);

		// 3. filter out only liked posts
		const likedDtos = dtosWithIsLiked.filter(({ isLiked }) => isLiked);

		// 4. convert to aggregates
		const aggregates = await Promise.all(
			likedDtos.map(async ({ isLiked, ...dto }) => {
				const metadata = (
					await ipfsQueries.getPostMetadata(dto.postData.cid, dto.postData.metadataPath)
				).unwrapOrElse((err) => {
					throw err;
				});

				return await postParser.dtoToAggregate(coreContract, postContract, dto, metadata);
			}),
		);

		// 5. clean up
		return result.sequence(aggregates);
	} catch (err) {
		return result.fail(err as Error);
	}
};

/* 
----------------
COMMANDS
----------------
*/
const purchaseLicense = async (
	postContract: Contract,
	walletAddress: ProfileOwnerAddress,
	postId: PostId,
	licenseType: LicenseType,
): Promise<Result<true>> => {
	try {
		const receipt = postContract.methods
			.purchaseLicense(postId, licenseType)
			.send({ from: walletAddress });

		if (!receipt)
			throw new Error(`Purchase of post ${postId} by "${walletAddress}" likely failed.`);

		return result.ok(true);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const interactWithPost = async (
	postContract: Contract,
	walletAddress: ProfileOwnerAddress,
	postId: PostId,
	interaction: PostInteraction,
): Promise<Result<true>> => {
	console.log({ interaction });
	try {
		const interactionCode = interactionParser.valueToCode(interaction).unwrapOrElse((err) => {
			throw err;
		});
		console.log({ interactionCode });
		await postContract.methods
			.interactWithContent(postId, interactionCode)
			.send({ from: walletAddress });

		return result.ok(true);
	} catch (err) {
		return result.fail(err as Error);
	}
};

export const queries = {
	getPost,
	getAllPosts,
	getAllImagePosts,
	getAllArticlePosts,
	getPostsByProfile,
	getLicensesByAddress,
	getLicensePrices,
	getImagePostsByOwner,
	getArticlePostsByOwner,
	getLikedPostsByAccount,
	getPostInteractions,
};

export const commands = {
	purchaseLicense,
	interactWithPost,
};
