import type { Nullable, Result } from "@utils/monads";
import { Option, result } from "@utils/monads";
import { option } from "@utils/monads";
import { config } from "config/config";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@services/toast/toast";
import { useAuth } from "@modules/auth/hooks/use-auth";
import type { Profile } from "./profile";
import { profileMapper } from "./profile.mapper";
import type { Contract } from "web3-eth-contract";
import { useCelo } from "@celo/react-celo";
import type { Post } from "../use-refound-post-contract/post";
import { postMapper } from "../use-refound-post-contract/post.mapper";
import type { ImagePostContractSchema, PostDTO, PostId } from "../use-storage/schema";

interface IUseRefoundContract {
	getProfileByAddress: (address: string) => Promise<Result<Profile>>;
	putProfile: (profile: Profile) => Promise<Result<Profile>>;
	createPost: (post: Post) => Promise<Result<Post>>;
	createImagePost: (imagePostData: ImagePostContractSchema) => Promise<Result<string>>;
	getPostById: (postId: string) => Promise<Result<Post>>;
}

/**
 * This is an internal hook. Use "useRefound" instead.
 *
 * This hook provides access to the root refound contract (refound.sol).
 */
export const useRefoundContract = (): IUseRefoundContract => {
	const { kit } = useCelo();
	const { isLoggedIn, walletAddress } = useAuth();
	const [contract, setContract] = useState<Nullable<Contract>>(null);

	useEffect(() => {
		const instance: Contract = new kit.connection.web3.eth.Contract(
			config.contracts.refound.abi,
			config.contracts.refound.address,
		);
		setContract(instance);
	}, [kit, isLoggedIn]);

	const getProfileByAddress: IUseRefoundContract["getProfileByAddress"] = useCallback(
		async (address) => {
			if (!contract) {
				console.warn("Must connect to contract before fetching profiles.");
				return option.none();
			}

			try {
				const [ok, maybeProfileData, profileId] = await contract.methods
					.getRefoundProfile(address)
					.call();

				if (!ok) {
					toast.warning("Profile does not exist.");
					return option.none();
				}

				return profileMapper.dsoToModel(maybeProfileData, profileId).match({
					ok: (parsedProfile) => {
						console.log({ parsedProfile });
						return option.some(parsedProfile);
					},
					fail: (err) => {
						console.error(err);
						toast.error("Failed to parse profile.");
						return option.none();
					},
				});
			} catch (err) {
				console.error(err);
				toast.error("Failed to get profile");
				return option.none();
			}
		},
		[contract],
	);

	/**
	 * If profile already exists, it's updated. Otherwise, a new profile is created.
	 */
	const putProfile: IUseRefoundContract["putProfile"] = async (profile) => {
		// TODO: currently no way to check for duplicate usernames.
		if (!contract) {
			console.warn("Must connect to contract before creating profile.");
			return option.none();
		}
		if (!isLoggedIn || !walletAddress) {
			console.warn("Must be logged in to edit profile.");
			return option.none();
		}

		try {
			const profileDso = profileMapper.modelToDso(profile).unwrapOrElse((err) => {
				throw err;
			});

			const profileAlreadyExists = (await getProfileByAddress(walletAddress)).isSome(); // TODO: use lighter method
			const profileId = profileAlreadyExists
				? // create new profile
				  await contract.methods
						.makeRefoundProfile(profileDso.handle, profileDso.profileData)
						.send({ from: walletAddress })
				: // update existing profile
				  await contract.methods
						.updateRefoundProfile(profileDso.handle, profileDso.profileData)
						.send({ from: walletAddress });

			if (!profileId || profileId === "0") console.warn("Profile update may have failed.");

			return await getProfileByAddress(walletAddress);
		} catch (err) {
			console.error(err);
			toast.error("Could not update profile.");
			return option.none();
		}
	};

	const createPost: IUseRefoundContract["createPost"] = async (post) => {
		if (!contract) {
			console.warn("Must connect to contract before creating post.");
			return option.none();
		}
		if (!walletAddress) {
			console.warn("Must be logged in to post.");
			return option.none();
		}

		try {
			const postDso = postMapper.modelToDso(post).unwrapOrElse((err) => {
				throw err;
			});

			// TODO: Account context needs to have profileId
			const profileId = "1";
			const postId = await contract.methods.makeRefoundPost(profileId, postDso.postData);

			if (!postId || postId === "0") console.warn("Post creation may have failed.");

			// TODO: Get Post
		} catch (err) {
			console.error(err);
			toast.error("Failed to create post.");
			return option.none();
		}
	};

	return { getProfileByAddress, putProfile };
};
