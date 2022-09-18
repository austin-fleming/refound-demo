import type { ProfileCreationProperties } from "@modules/refound/models/profile.dto";
import type {
	Profile,
	ProfileId,
	ProfileOwnerAddress,
	ProfileUsername,
} from "@modules/refound/models/profile.model";
import { profileParser } from "@modules/refound/parsers/profile.parser";
import { isString } from "@utils/data-helpers/is-string";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import toast from "react-hot-toast";
import type { Contract } from "web3-eth-contract";
import type { Web3Storage } from "web3.storage";
import type { PostCreationProperties } from "../models/post.dto";
import type { PostId, PostType } from "../models/post.model";
import { postParser } from "../parsers/post.parser";
import { commands as ipfsCommands } from "./ipfs.repo";
import { jsonFileFromObject } from "./utils/json-file-from-object";

/* 
----------------
QUERIES
----------------
*/

const getProfileByUsername = async (
	contract: Contract,
	username: ProfileUsername,
): Promise<Result<Profile>> => {
	try {
		const profileId = await contract.methods.getProfileIdByHandle(username).call();
		const rawUri = await contract.methods.tokenURI(profileId);

		return profileParser.uriToModel(profileId, rawUri);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getProfileByAddress = async (
	contract: Contract,
	address: ProfileOwnerAddress,
): Promise<Result<Profile>> => {
	try {
		const profileId = await contract.methods.ProfileIdByAddress(address).call();
		const profileUri = await contract.methods.tokenURI(profileId).call();

		console.log({ profileUri });
		if (!profileUri || !isString(profileUri))
			throw new Error("getProfileByAddress did not return profileUri");

		return profileParser.uriToModel(profileId, profileUri);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getAllProfiles = async (contract: Contract): Promise<Result<Profile[]>> => {
	try {
		const profileDtos = await contract.methods.getAllRefoundProfiles().call();

		if (!profileDtos || !Array.isArray(profileDtos))
			throw new Error("getAllProfiles did not return array");

		const profiles = profileDtos.map((dto, idx) => {
			const profileId = idx + 1;
			return profileParser.uriToModel(`${profileId}`, dto).unwrapOrElse((err) => {
				throw err;
			});
		});

		return result.ok(profiles);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const getProfileById = async (
	contract: Contract,
	profileId: ProfileId,
): Promise<Result<Profile>> => {
	try {
		const profileUri = await contract.methods.tokenURI(profileId).call();

		if (!profileId) throw new Error(`Profile with profileId "${profileId}" does not exist`);

		return profileParser.uriToModel(profileId, profileUri);
	} catch (err) {
		return result.fail(err as Error);
	}
};

/* 
----------------
COMMANDS
----------------
*/
const createProfile = async (
	contract: Contract,
	walletAddress: string,
	profileData: ProfileCreationProperties,
): Promise<Result<string>> => {
	try {
		const storageObject = profileParser
			.creationPropsToContractDso(walletAddress, profileData)
			.unwrapOrElse((err) => {
				throw err;
			});

		const profileId = await contract.methods
			.makeRefoundProfile(storageObject.handle, storageObject.profileData)
			.send({ from: walletAddress });

		return result.ok(profileId as string);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const updateProfile = async (
	contract: Contract,
	walletAddress: string,
	profileData: ProfileCreationProperties,
): Promise<Result<string>> => {
	try {
		const storageObject = profileParser
			.creationPropsToContractDso(walletAddress, profileData)
			.unwrapOrElse((err) => {
				throw err;
			});

		const profileId = await contract.methods
			.updateRefoundProfile(storageObject.handle, storageObject.profileData)
			.send({ from: walletAddress });

		return result.ok(profileId as string);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const createPost = async (
	contract: Contract,
	ipfsClient: Web3Storage,
	walletAddress: ProfileOwnerAddress,
	postType: PostType,
	metadata: PostCreationProperties,
	imageFile?: File,
): Promise<Result<PostId>> => {
	try {
		const { profileId } = (await getProfileByAddress(contract, walletAddress)).unwrapOrElse(
			(err) => {
				throw err;
			},
		);

		const storageSchema = postParser
			.creationPropsToStorageSchema(walletAddress, profileId, postType, metadata)
			.unwrapOrElse((err) => {
				throw err;
			});

		const metadataFile = jsonFileFromObject("metadata.json", storageSchema);

		const files = [metadataFile];
		if (imageFile) {
			files.push(imageFile);
		}
		const directoryName = `${walletAddress.slice(-8)} | ${metadata.title}`;

		// upload to ipfs
		const { cid, paths } = (
			await ipfsCommands.uploadFiles(
				ipfsClient,
				files,
				directoryName,
				(cid) => {
					console.log(`Upload cid: ${cid}`);
				},
				(combinedSize) => (chunkSize) => {
					toast.success(`Upload ${Math.ceil(chunkSize / combinedSize)}% complete`);
				},
			)
		).unwrapOrElse((err) => {
			throw err;
		});

		const contractSchema = postParser
			.creationPropsToContractDso(cid, paths, postType)
			.unwrapOrElse((err) => {
				throw err;
			});

		console.log({ postCreationData: { profileId, contractSchema } });
		// write to contract
		const postId = await contract.methods
			.makeRefoundPost(Number.parseInt(profileId), contractSchema)
			.send({ from: walletAddress });

		if (!postId) throw new Error("Post creation likely failed when writing to contract.");

		return result.ok(postId);
	} catch (err) {
		return result.fail(err as Error);
	}
};

/* 
These are segregated because commands are called in the UI while queries are in API routes.
This requires using separate contract instances. The simpler contract provided by Web3.js does not work
well with commands:
- frontend uses contract made by react-celo
- backend uses contract made directly from web3.js
*/

export const commands = {
	createPost,
	createProfile,
	updateProfile,
};

export const queries = {
	getProfileByUsername,
	getProfileByAddress,
	getAllProfiles,
	getProfileById,
};
