import type { ProfileCreationProperties } from "@modules/refound/models/profile.dto";
import type { Profile, ProfileOwnerAddress } from "@modules/refound/models/profile.model";
import type { Result } from "@utils/monads";
import type { AbiItem } from "web3-utils";
import { useCelo } from "@celo/react-celo";
import { result } from "@utils/monads";
import { refoundAbi } from "config/abis";
import { config } from "config/config";
import { commands as refoundCommands } from "../repo/refound-contract.repo";
import { commands as refoundPostCommands } from "../repo/refound-post-contract.repo";
import { Web3Storage } from "web3.storage";
import type { Post, PostId } from "../models/post.model";
import { PostType } from "../models/post.model";
import type { ArticlePostCreationProps, ImagePostCreationProps } from "../models/post.dto";
import type { LicenseType } from "../models/license.model";
import { fetchWithAddress } from "./utils/fetch-with-address";
import { useAuth } from "./use-auth";

export const useRefoundContracts = () => {
	const { kit, address } = useCelo();
	const { walletAddress } = useAuth();

	const ipfsClient = new Web3Storage({ token: config.storage.web3storage.apiToken });

	const refoundContract = new kit.connection.web3.eth.Contract(
		refoundAbi as AbiItem[],
		config.contracts.refound.address,
	);
	const refoundPostContract = new kit.connection.web3.eth.Contract(
		refoundAbi as AbiItem[],
		config.contracts.refound.address,
	);

	/* 
	COMMANDS
	*/
	const createProfile = async (profileData: ProfileCreationProperties): Promise<Result<string>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: // @ts-expect-error: web3 and celo provide slightly different "Contract" types
			  refoundCommands.createProfile(refoundContract, walletAddress, profileData);

	const updateProfile = async (profileData: ProfileCreationProperties): Promise<Result<string>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: // @ts-expect-error: web3 and celo provide slightly different "Contract" types
			  refoundCommands.updateProfile(refoundContract, walletAddress, profileData);

	const createImagePost = async (
		imageFile: File,
		metadata: ImagePostCreationProps,
	): Promise<Result<PostId>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: refoundCommands.createPost(
					// @ts-expect-error: web3 and celo provide slightly different "Contract" types
					refoundContract,
					ipfsClient,
					walletAddress,
					PostType.IMAGE,
					metadata,
					imageFile,
			  );

	const createArticlePost = async (metadata: ArticlePostCreationProps): Promise<Result<PostId>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: refoundCommands.createPost(
					// @ts-expect-error: web3 and celo provide slightly different "Contract" types
					refoundContract,
					ipfsClient,
					walletAddress,
					PostType.ARTICLE,
					metadata,
			  );

	const purchaseLicense = async (
		postId: PostId,
		licenseType: LicenseType,
	): Promise<Result<true>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: refoundPostCommands.purchaseLicense(
					// @ts-expect-error: web3 and celo provide slightly different "Contract" types
					refoundPostContract,
					walletAddress,
					postId,
					licenseType,
			  );
	/* 
	QUERIES
	*/
	const getProfile = async (address: ProfileOwnerAddress): Promise<Result<Profile>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Profile>(`/api/users/${address}`, walletAddress);

	const getAllProfiles = async (): Promise<Result<Profile[]>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Profile[]>(`/api/users/`, walletAddress);

	const getPostsCreatedByProfile = async (
		address: ProfileOwnerAddress,
	): Promise<Result<Post[]>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Post[]>(`/api/users/${address}/posts`, walletAddress);

	const getPost = async (postId: PostId): Promise<Result<Post>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Post>(`/api/posts/${postId}`, walletAddress);

	const getAllPosts = async (): Promise<Result<Post[]>> =>
		!walletAddress
			? result.fail(new Error("No wallet connected"))
			: fetchWithAddress<Post[]>(`/api/posts`, walletAddress);

	return {
		createProfile,
		updateProfile,
		createImagePost,
		createArticlePost,
		purchaseLicense,
		getProfile,
		getAllProfiles,
		getPostsCreatedByProfile,
		getPost,
		getAllPosts,
	};
};
