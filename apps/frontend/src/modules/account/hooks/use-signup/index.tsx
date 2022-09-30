import type { CoreContractRepo } from "@api/repo/core-contract/core-contract.repo";
import { makeCoreContractRepo } from "@api/repo/core-contract/core-contract.repo";
import type { IIpfsRepo } from "@api/repo/ipfs/ipfs.repo";
import { makeW3sRepo } from "@api/repo/ipfs/w3s.repo";
import { useCelo } from "@celo/react-celo";
import type { Result } from "@repo/common/utils/monads";
import { result } from "@repo/common/utils/monads";
import { toast } from "@services/toast/toast";
import { config } from "config/config";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Web3Storage } from "web3.storage";
import { useAuth } from "../auth-context";
import type { ProfileMetadataSchema } from "@repo/common/refound-contracts/contract-types";
import { usePublicRefoundQueries } from "@modules/common/hooks/public-refound-context";
import { useAccount } from "../use-account";
import { useRouter } from "next/router";

export const useSignup = () => {
	const router = useRouter();
	const { kit } = useCelo();
	const { address, hasProfile } = useAccount();
	const [coreContractRepo, setCoreContractRepo] = useState<CoreContractRepo | undefined>();
	const { profileExists } = usePublicRefoundQueries();

	const w3sRepo = useMemo(
		() =>
			makeW3sRepo({
				w3sClient: new Web3Storage({ token: config.web3storage.token }),
			}),
		[config.web3storage.token, address],
	);

	useEffect(() => {
		// @ts-expect-error: this is a valid Web3 instance, but celo added a prop
		setCoreContractRepo(makeCoreContractRepo(kit.connection.web3));
	}, [kit.connection.web3]);

	useEffect(() => {
		if (address && hasProfile) {
			router.push("/discover");
		}
	});

	const validateAccount = useCallback(
		async ({
			image,
			username,
			bio,
			acceptedTerms,
		}: {
			image?: File;
			username?: string;
			bio?: string;
			acceptedTerms: boolean;
		}) => {
			try {
				if (!w3sRepo) {
					throw new Error("Could not connect to image host. Try refreshing.");
				}
				if (!address) {
					throw new Error("Please connect your wallet before completing signup");
				}

				// VERIFY AGREED TO TERMS
				if (!acceptedTerms) throw new Error("Please accept terms.");

				// VALIDATE USERNAME
				const hasProfileAlready = (await profileExists(address!)).extract();
				if (hasProfileAlready) throw new Error("Username is taken");

				if (!username) throw new Error("username is missing");
				const trimmedUsername = username.toLowerCase().trim();
				if (trimmedUsername.length > 15 || trimmedUsername.length < 3)
					throw new Error("username must be 3-15 characters long.");
				const rxIsHandle = /^[a-z0-9_-]{3,15}$/i;
				if (!rxIsHandle.test(trimmedUsername))
					throw new Error("username can only use a-z, 0-9, _, and -");

				const cleanedBio = bio?.trim() || undefined;
				const cleanedImage = image || undefined;

				return result.ok({
					username: trimmedUsername,
					bio: cleanedBio,
					image: cleanedImage,
				});
			} catch (err) {
				return result.fail(err as Error);
			}
		},
		[address, coreContractRepo, profileExists],
	);

	const createAccount = async ({
		image,
		username,
		bio,
	}: {
		image?: File;
		username: string;
		bio?: string;
	}): Promise<Result<true>> => {
		try {
			if (!w3sRepo) {
				throw new Error("Could not connect to image host. Try refreshing.");
			}
			if (!coreContractRepo) {
				throw new Error(
					"Could not connect to contracts. Make sure your wallet is connected or try refreshing.",
				);
			}
			if (!address) {
				throw new Error("Please connect your wallet before completing signup");
			}

			let ipfsUrl = undefined;
			if (image) {
				toast.message("uploading profile picture", "profileCreate");

				ipfsUrl = (
					await w3sRepo.uploadFile({ file: image, tagName: `pfp-${username}` })
				).unwrapOrElse((error) => {
					console.error(error);
					throw new Error("Could not upload file to image host.");
				});
			}

			toast.message("Saving profile to the blockchain", "profileCreate");

			const metadata: ProfileMetadataSchema = {
				attributes: [],
				description: bio,
				name: username,
				image: ipfsUrl,
			};

			const stringifiedMetadata = JSON.stringify(metadata);

			const confirmation = (
				await coreContractRepo.makeRefoundProfile({
					callerAddress: address,
					handle: username,
					profileData: stringifiedMetadata,
				})
			).unwrapOrElse((error) => {
				console.error(error);
				throw new Error("Was not able to create profile on the blockchain.");
			});

			toast.message("Account created!", "profileCreate");
			return result.ok(confirmation);
		} catch (err) {
			toast.error((err as Error).message, "profileCreate");
			return result.fail(err as Error);
		}
	};

	return { createAccount, validateAccount };
};
