/* 
This is a wrapper context for refound's various services.

These include:
- Refound Contract
- Refound Post Contract
- Storage (ipfs) provider

This is the hook that should be called on the frontend.
*/

import { useAuth } from "@modules/auth/hooks/use-auth";
import { toast } from "@services/toast/toast";
import type { SimpleResult } from "@utils/helper-types/simple-result";
import { Nullable, result } from "@utils/monads";
import { useEffect } from "react";
import type { Profile } from "../use-refound-contract/profile";
import { useRefoundContract } from "../use-refound-contract/use-refound-contract";
import { useRefoundPostContract } from "../use-refound-post-contract/use-refound-post-contract";
import type {
	ImageMetadataStorageSchema,
	License,
	PostId,
	ProfileId,
	Post,
} from "../use-storage/schema";
import { useStorage } from "../use-storage/use-storage";

// needs contract
interface IUseRefoundQueries {
	// getProfile: (profileId: string) => Promise<SimpleResult<Profile>>;
	getProfileByAddress: (address: string) => Promise<SimpleResult<Profile>>;
	getAllProfiles: () => Promise<SimpleResult<Profile[]>>;
	getPost: (postId: string) => Promise<SimpleResult<Post>>;
	getAllPosts: () => Promise<SimpleResult<Post[]>>;
	getPostsByProfile: (profileId: string) => Promise<SimpleResult<Post[]>>;
	getLicensesByProfile: (address: string) => Promise<SimpleResult<License[]>>;
	getPostsOwnedByProfile: (address: string) => Promise<SimpleResult<Post[]>>;
}

// needs contract, auth, storage
interface IUseRefoundCommands {
	createProfile: (profileData: Record<string, any>) => Promise<SimpleResult<ProfileId>>;
	createImagePost: (postData: Record<string, any>) => Promise<SimpleResult<PostId>>; // makeImageProps -> postId
	createArticlePost: (postData: Record<string, any>) => Promise<SimpleResult<PostId>>; // makeArticleProps -> postId
	purchaseLicense: (props: any) => Promise<SimpleResult<string>>; // purchaseProps -> nftId
	purchaseOutright: (props: any) => Promise<SimpleResult<string>>; // purchaseProps -> nftId
	// payUser: (address: string) => Promise<boolean> // payeeAccountAddress -> successConfirmation
	// addBeneficiary: (address: string) => Promise<boolean> // beneficiaryAddress -> successConfirmation
	// getBenficiary: () => Promise<SimpleResult<string>> // -> beneficiaryAddress
	// beneficiaryClaimStart: (address: string) => Promise<boolean> // addressToClaim -> successConfirmation
	// beneficiaryClaimCancel: () => Promise<boolean> // -> successConfirmation
	// depositFunds: () => Promise<boolean> // -> successConfimation
	// withdrawFunds: () => Promise<SimpleResult<number>> // -> fundsWithdrawn
}

/**
 * This is a wrapper context for refound's various services.
 *
 * These include:
 * - Refound Contract
 * - Refound Post Contract
 * - Storage (ipfs) provider
 */
export const useRefound = () => {
	const { isLoggedIn, walletAddress } = useAuth();
	const { uploadImagePost, uploadArticlePost } = useStorage();
	const { createPost, createImagePost, getProfileByAddress, putProfile } = useRefoundContract();
	const { getPostById } = useRefoundPostContract();

	useEffect(() => {
		console.log("using refound 💃");
	}, []);

	const authGuard = (methodName: string) => {
		if (!isLoggedIn) throw new Error(`Unauthorized method "${methodName}"`);
	};

	const makeImagePost = async (
		imageFile: File,
		metadata: ImageMetadataStorageSchema,
	): Promise<SimpleResult<string>> => {
		try {
			authGuard("makeImagePost");

			const data = await (
				await uploadImagePost(imageFile, metadata)
			).unwrapOrElse((err) => {
				throw err;
			});

			const postId = await (
				await createImagePost(data)
			).unwrapOrElse((err) => {
				throw err;
			});

			toast.success("Created post!");

			return { ok: true, result: postId };
		} catch (err) {
			console.error(err);
			toast.error("Could not create image post");
			return { ok: false, result: undefined };
		}
	};

	const getPost = async (postId: string): Promise<SimpleResult<Post>> =>
		(await getPostById(postId)).match({
			ok: (post) => ({ ok: true, result: post }),
			fail: (err) => {
				console.error(err);
				toast.error("Could not get post.");
				return { ok: false, result: undefined };
			},
		});

	const getProfile = async (address: string): Promise<SimpleResult<Profile>> =>
		(await getProfileByAddress(address)).match({
			ok: (profile) => ({ ok: true, result: profile }),
			fail: (err) => {
				console.error(err);
				toast.error("Could not get profile.");
				return { ok: false, result: undefined };
			},
		});

	return {
		makeImagePost,
		getPost,
		getProfile,
	};
};
