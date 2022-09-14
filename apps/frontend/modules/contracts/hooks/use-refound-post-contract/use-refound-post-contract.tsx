import { useCelo } from "@celo/react-celo";
import { useAuth } from "@modules/auth/hooks/use-auth";

import type { Nullable, Result } from "@utils/monads";

import { config } from "config/config";
import { useEffect, useState } from "react";
import type { Contract } from "web3-eth-contract";
import type { Post } from "../use-storage/schema";
import { makeGetPost } from "./use-cases/get-post";

interface IUseRefoundPostContract {
	// mintPost: (postId: string) => Promise<Nullable<ImagePost>>;
	// getOwnedPosts: (ownerAddress: string) => Promise<Nullable<OwnedPost[]>>;
	// getAllPosts: () => Promise<Nullable<ImagePost>>;
	getPostById: (postId: string) => Promise<Result<Post>>;
}

/**
 * This is an internal hook. Use "useRefound" instead.
 *
 * This hook provides access to the Refound post contract.
 */
export const useRefoundPostContract = (): IUseRefoundPostContract => {
	const { kit } = useCelo();
	const { isLoggedIn } = useAuth();
	const [contract, setContract] = useState<Nullable<Contract>>(null);

	useEffect(() => {
		const instance: Contract = new kit.connection.web3.eth.Contract(
			config.contracts.refoundPost.abi,
			config.contracts.refoundPost.address,
		);
		setContract(instance);
	}, [kit, isLoggedIn]);

	const getPostById = makeGetPost(contract);

	return { getPostById };
};
