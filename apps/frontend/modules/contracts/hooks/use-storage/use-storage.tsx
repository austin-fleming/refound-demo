import type { Nullable, Result } from "@utils/monads";
import { useCallback, useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";
import { config } from "config/config";
import { toast } from "@services/toast/toast";
import { useAuth } from "@modules/auth/hooks/use-auth";
import { putImagePost } from "./use-cases/put-image-post";
import type {
	ArticleMetadataStorageSchema,
	ArticlePostContractSchema,
	ImageMetadataStorageSchema,
	ImagePostContractSchema,
} from "./schema";
import { putArticlePost } from "./use-cases/put-article-post";

interface IUseStorage {
	uploadImagePost: (
		imageFile: File,
		metadata: ImageMetadataStorageSchema,
	) => Promise<Result<ImagePostContractSchema>>;
	uploadArticlePost: (
		metadata: ArticleMetadataStorageSchema,
	) => Promise<Result<ArticlePostContractSchema>>;
}

/**
 * This is an internal hook. Use "useRefound" instead.
 *
 * Provides access to the storage provider (web3.storage)
 */
export const useStorage = (): IUseStorage => {
	const { isLoggedIn } = useAuth();
	const [ipfs, setIpfs] = useState<Nullable<Web3Storage>>(null);

	useEffect(() => {
		// TODO: this needs to be private.
		const client = new Web3Storage({ token: config.storage.web3storage.apiToken });

		if (!client) {
			toast.error("Could not connect to storage provider.");
			console.error("Failed to connect to web3Storage");
			return;
		}

		if (!isLoggedIn) {
			console.log("Must be logged in to use storage provider.");
			return;
		}

		setIpfs(client);
	}, [isLoggedIn]);

	const uploadImagePost = useCallback(putImagePost(ipfs), [ipfs]);
	const uploadArticlePost = useCallback(putArticlePost(ipfs), [ipfs]);

	return { uploadImagePost, uploadArticlePost };
};
