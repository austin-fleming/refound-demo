import type { ProfileCreationProperties } from "@modules/refound/models/profile.dto";
import type {
	Profile,
	ProfileOwnerAddress,
	ProfileUsername,
} from "@modules/refound/models/profile.model";
import type { Result } from "@utils/monads";
import { useCelo } from "@celo/react-celo";
import { result } from "@utils/monads";
import { config } from "config/config";
import { commands as refoundCommands } from "../repo/refound-contract.repo";
import { commands as refoundPostCommands } from "../repo/refound-post-contract.repo";
import { Web3Storage } from "web3.storage";
import type { Post, PostId } from "../models/post.model";
import { PostType } from "../models/post.model";
import type { ArticlePostCreationProps, ImagePostCreationProps } from "../models/post.dto";
import type { LicenseType } from "../models/license.model";
import { fetchWithAddress } from "./utils/fetch-with-address";
import type { PostAggregate } from "../models/post.aggregate";
import type { PoolAggregate } from "../models/pool.aggregate";
import type { LicenseAggregate } from "../models/license.aggregate";
import { useAccount } from "@modules/account/state/use-account";

export const useRefoundContracts = () => {
	const { kit } = useCelo();
	const { account } = useAccount();

	const ipfsClient = new Web3Storage({ token: config.storage.web3storage.apiToken });

	const coreContract = new kit.connection.web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);
	const postContract = new kit.connection.web3.eth.Contract(
		config.contracts.postContract.abi,
		config.contracts.postContract.address,
	);

	/* 
	COMMANDS
	*/
	const createProfile = async (profileData: ProfileCreationProperties): Promise<Result<string>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: // @ts-expect-error: web3 and celo provide slightly different "Contract" types
			  refoundCommands.createProfile(coreContract, account.address, profileData);

	const updateProfile = async (profileData: ProfileCreationProperties): Promise<Result<string>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: // @ts-expect-error: web3 and celo provide slightly different "Contract" types
			  refoundCommands.updateProfile(coreContract, account.address, profileData);

	const createImagePost = async (
		imageFile: File,
		metadata: ImagePostCreationProps,
	): Promise<Result<PostId>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: refoundCommands.createPost(
					// @ts-expect-error: web3 and celo provide slightly different "Contract" types
					coreContract,
					ipfsClient,
					account.address,
					PostType.IMAGE,
					metadata,
					imageFile,
			  );

	const createArticlePost = async (metadata: ArticlePostCreationProps): Promise<Result<PostId>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: refoundCommands.createPost(
					// @ts-expect-error: web3 and celo provide slightly different "Contract" types
					coreContract,
					ipfsClient,
					account.address,
					PostType.ARTICLE,
					metadata,
			  );

	const purchaseLicense = async (
		postId: PostId,
		licenseType: LicenseType,
	): Promise<Result<true>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: refoundPostCommands.purchaseLicense(
					// @ts-expect-error: web3 and celo provide slightly different "Contract" types
					postContract,
					account.address,
					postId,
					licenseType,
			  );
	/* 
	QUERIES
	*/
	const getProfileByUsername = async (username: ProfileUsername): Promise<Result<Profile>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Profile>(`/api/users/${username}`, account.address);

	const getProfileByAddress = async (address: ProfileOwnerAddress): Promise<Result<Profile>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Profile>(`/api/users/account/${address}`, account.address);

	const getAllProfiles = async (): Promise<Result<Profile[]>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Profile[]>(`/api/users/`, account.address);

	const getPostsByProfile = async (username: ProfileUsername): Promise<Result<PostAggregate[]>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<PostAggregate[]>(`/api/users/${username}/posts`, account.address);

	const getPost = async (postId: PostId): Promise<Result<PostAggregate>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<PostAggregate>(`/api/posts/${postId}`, account.address);

	const getAllPosts = async (): Promise<Result<Post[]>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Post[]>(`/api/posts`, account.address);

	const getPoolsByProfile = async (
		profileAddress: ProfileOwnerAddress,
	): Promise<Result<PoolAggregate[]>> => {};

	const getLicensesByProfile = async (
		profileAddress: ProfileOwnerAddress,
	): Promise<Result<LicenseAggregate[]>> => {};

	return {
		createProfile,
		updateProfile,
		createImagePost,
		createArticlePost,
		purchaseLicense,
		getProfileByUsername,
		getProfileByAddress,
		getAllProfiles,
		getPostsByProfile,
		getPoolsByProfile,
		getLicensesByProfile,
		getPost,
		getAllPosts,
	};
};
