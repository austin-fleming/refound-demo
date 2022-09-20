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
import { commands as refoundCoreCommands } from "../repo/refound-core-contract.repo";
import { commands as refoundPostCommands } from "../repo/refound-post-contract.repo";
import { commands as celoCommands } from "../repo/celo.repo";
import { Web3Storage } from "web3.storage";
import type { Post, PostId, PostInteraction } from "../models/post.model";
import { PostType } from "../models/post.model";
import type { ArticlePostCreationProps, ImagePostCreationProps } from "../models/post.dto";
import type { LicenseType } from "../models/license.model";
import { fetchWithAddress } from "./utils/fetch-with-address";
import type {
	ArticlePostAggregate,
	ImagePostAggregate,
	PostAggregate,
} from "../models/post.aggregate";
import type { PoolAggregate } from "../models/pool.aggregate";
import type { LicenseAggregate } from "../models/license.aggregate";
import { useAccount } from "@modules/account/state/use-account";
import type { PoolId } from "../models/pool.model";
import Web3 from "web3";
import { valueToBigNumber } from "@celo/contractkit/lib/wrappers/BaseWrapper";
import { toast } from "@services/toast/toast";
import BigNumber from "bignumber.js";

export const useRefoundContracts = () => {
	const { kit, getConnectedKit } = useCelo();
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
			: refoundCoreCommands.createPost(
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
			: refoundCoreCommands.createPost(
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

	const interactWithPost = async (
		postId: PostId,
		interaction: PostInteraction,
	): Promise<Result<true>> =>
		!account.address
			? result.fail(new Error("No wallet connected"))
			: refoundPostCommands.interactWithPost(
					// @ts-expect-error: web3 and celo provide slightly different "Contract" types
					postContract,
					account.address,
					postId,
					interaction,
			  );

	const sendBonus = async (receiverAddress: ProfileOwnerAddress) => {
		if (!account.address) {
			return result.fail(new Error("No wallet connected"));
		}

		try {
			const amount = "0.5";

			toast.message("Sending bonus...");
			const kit = await getConnectedKit();
			const cUSD = await kit.contracts.getStableToken();
			await cUSD
				.transfer(receiverAddress, Web3.utils.toWei(amount, "ether"))
				.sendAndWaitForReceipt({
					from: kit.connection.defaultAccount,
					gasPrice: kit.connection.defaultGasPrice,
				});

			toast.success("Transaction sent!");
			return result.ok(true);
		} catch (err) {
			toast.error("Transaction failed");
			console.error(err);
			return result.fail(err as Error);
		}
	};

	/* 
	QUERIES
	*/

	const getProfileByUsername = async (username: ProfileUsername): Promise<Result<Profile>> =>
		fetchWithAddress<Profile>(`/api/users/${username}`, account.address);

	const getProfileByAddress = async (address: ProfileOwnerAddress): Promise<Result<Profile>> =>
		fetchWithAddress<Profile>(`/api/users/account/${address}`, account.address);

	const getAllProfiles = async (): Promise<Result<Profile[]>> =>
		fetchWithAddress<Profile[]>(`/api/users/`, account.address);

	const getPostsByProfile = async (username: ProfileUsername): Promise<Result<PostAggregate[]>> =>
		fetchWithAddress<PostAggregate[]>(`/api/users/${username}/posts`, account.address);

	const getImagePostsByProfile = async (
		username: ProfileUsername,
	): Promise<Result<ImagePostAggregate[]>> =>
		fetchWithAddress<ImagePostAggregate[]>(
			`/api/users/${username}/posts/images`,
			account.address,
		);

	const getArticlePostsByProfile = async (
		username: ProfileUsername,
	): Promise<Result<ArticlePostAggregate[]>> =>
		fetchWithAddress<ArticlePostAggregate[]>(
			`/api/users/${username}/posts/articles`,
			account.address,
		);

	const getPost = async (postId: PostId): Promise<Result<PostAggregate>> =>
		fetchWithAddress<PostAggregate>(`/api/posts/${postId}`, account.address);

	const getAllPosts = async (): Promise<Result<PostAggregate[]>> =>
		fetchWithAddress<PostAggregate[]>(`/api/posts`, account.address);

	const getAllImagePosts = async (): Promise<Result<ImagePostAggregate[]>> =>
		fetchWithAddress<ImagePostAggregate[]>(`/api/posts/images`, account.address);

	const getAllArticlePosts = async (): Promise<Result<ArticlePostAggregate[]>> =>
		fetchWithAddress<ArticlePostAggregate[]>(`/api/posts/articles`, account.address);

	const getPool = async (poolId: PoolId): Promise<Result<PoolAggregate>> =>
		fetchWithAddress<PoolAggregate>(`/api/pools/${poolId}`, account.address);

	const getPools = async (): Promise<Result<PoolAggregate[]>> =>
		fetchWithAddress<PoolAggregate[]>(`/api/pools`, account.address);

	const getPoolsByAccount = async (
		accountAddress: ProfileOwnerAddress,
	): Promise<Result<PoolAggregate[]>> =>
		fetchWithAddress<PoolAggregate[]>(
			`/api/users/account/${accountAddress}/pools`,
			account.address,
		);

	const getPoolsByUsername = async (
		username: ProfileUsername,
	): Promise<Result<PoolAggregate[]>> =>
		fetchWithAddress<PoolAggregate[]>(`/api/users/${username}/pools`, account.address);

	const getLikedPostsByAccount = async (accountAddress: ProfileOwnerAddress) =>
		fetchWithAddress(`/api/users/account/${accountAddress}/likes`, account.address);

	const getLicensesByProfile = async (
		profileAddress: ProfileOwnerAddress,
	): Promise<Result<LicenseAggregate[]>> => {};

	return {
		getLikedPostsByAccount,
		getPool,
		getPools,
		getPoolsByAccount,
		getPoolsByUsername,
		createProfile,
		updateProfile,
		createImagePost,
		createArticlePost,
		purchaseLicense,
		getProfileByUsername,
		getProfileByAddress,
		getAllProfiles,
		getPostsByProfile,
		getImagePostsByProfile,
		getArticlePostsByProfile,
		getLicensesByProfile,
		getPost,
		getAllPosts,
		getAllImagePosts,
		getAllArticlePosts,
		interactWithPost,
		sendBonus,
	};
};
