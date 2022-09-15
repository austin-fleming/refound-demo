import type { Result } from "@utils/monads";
import type { Contract } from "web3-eth-contract";
import type { Post, PostId } from "../models/post.model";
import type { ProfileId, ProfileOwnerAddress } from "../models/profile.model";
import { result } from "@utils/monads";
import { postParser } from "../parsers/post.parser";
import { queries as ipfsQueries } from "./ipfs.repo";
import type { LicenseType } from "../models/license.model";

/* 
----------------
QUERIES
----------------
*/
const getPost = async (contract: Contract, postId: PostId): Promise<Result<Post>> => {
	try {
		const rawUri = await contract.methods.tokenURI(postId).call();

		if (!rawUri) throw new Error(`No uri returned for postId "${postId}"`);

		const postDto = postParser.contractDataToDto(rawUri).unwrapOrElse((err) => {
			throw err;
		});

		const metadata = (
			await ipfsQueries.getPostMetadata(postDto.postData.cid, postDto.postData.metadataPath)
		).unwrapOrElse((err) => {
			throw err;
		});

		return postParser.dtoToModel(contract, postDto, metadata);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getAllPosts = async (contract: Contract): Promise<Result<Post[]>> => {
	try {
		const rawUris = await contract.methods.getAllPosts().call();

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

				return postParser.dtoToModel(contract, postDto, metadata);
			}),
		);

		return result.sequence(posts);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getPostsByProfile = async (
	contract: Contract,
	profileId: ProfileId,
): Promise<Result<Post[]>> => {
	try {
		const rawUris = await contract.methods.getPostsByCreator(profileId).call();

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

				return postParser.dtoToModel(contract, postDto, metadata);
			}),
		);

		return result.sequence(posts);
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
	contract: Contract,
	walletAddress: ProfileOwnerAddress,
	postId: PostId,
	licenseType: LicenseType,
): Promise<Result<true>> => {
	try {
		const receipt = contract.methods
			.purchaseLicense(postId, licenseType)
			.send({ from: walletAddress });

		if (!receipt)
			throw new Error(`Purchase of post ${postId} by "${walletAddress}" likely failed.`);

		return result.ok(true);
	} catch (err) {
		return result.fail(err as Error);
	}
};

export const queries = {
	getPost,
	getAllPosts,
	getPostsByProfile,
};

export const commands = {
	purchaseLicense,
};
