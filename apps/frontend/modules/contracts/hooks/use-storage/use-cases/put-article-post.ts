import { toast } from "@services/toast/toast";
import { result } from "@utils/monads";
import type { Result, Nullable } from "@utils/monads";
import type { Web3Storage } from "web3.storage";
import type { ArticleMetadataStorageSchema, ArticlePostContractSchema } from "../schema";
import { DataHost } from "../schema";
import { NftType, PostType } from "../schema";
import { jsonFileFromObject } from "../helpers/json-file-from-object";
import { config } from "config/config";

const createArticleMetadataFile = (
	fileName: string,
	metadata: Partial<ArticleMetadataStorageSchema>,
): Result<File> => {
	try {
		const type = metadata.type;
		if (type !== NftType.POST) throw new Error(`NftType must be ${NftType.POST}`);

		const title = metadata.title;
		if (!title) throw new Error("Title is missing");

		const tags = metadata.tags;
		if (!tags) throw new Error("Tags are missing");
		tags.forEach((tag) => {
			if (!tag) throw new Error("Empty tag found.");
		});

		const originalCreatorAddress = metadata.originalCreatorAddress;
		if (!originalCreatorAddress) throw new Error("originalCreatorAddress is missing");

		// TODO: should verify it exists
		const originalCreatorProfileId = metadata.originalCreatorProfileId;
		if (!originalCreatorProfileId) throw new Error("originalCreatorProfileId is missing");

		const postType = metadata.postType;
		if (postType !== PostType.ARTICLE) throw new Error(`PostType must be ${PostType.ARTICLE}`);

		// TODO: should verify/sanitize markdown here
		// TODO: should have minimum length?
		const body = metadata.body;
		if (!body) throw new Error("Body is missing");

		// TODO: should check it actually exists
		const coverImageId = metadata.coverImageId;

		const location = metadata.location;

		const dataToStore: ArticleMetadataStorageSchema = {
			type,
			title,
			tags,
			originalCreatorAddress,
			originalCreatorProfileId,
			postType,
			body,
			coverImageId,
			location,
		};

		const file = jsonFileFromObject(fileName, dataToStore);

		return result.ok(file);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const handleRootCidReady = (rootCid: string) => {
	console.log(`Uploading to locally generated CID: ${rootCid}`);
};

const makeHandleStoredChunk = (totalBytes: number) => (uploadedChunkSize: number) => {
	toast.message(`${Math.floor(uploadedChunkSize / totalBytes)}% uploaded`);
};

export const putArticlePost =
	(ipfsClient: Nullable<Web3Storage>) =>
	async (metadata: ArticleMetadataStorageSchema): Promise<Result<ArticlePostContractSchema>> => {
		try {
			if (!ipfsClient) {
				throw new Error("Must connect to ipfs before uploading post.");
			}

			const metadataFileName = "metadata.json";

			const metadataFile = createArticleMetadataFile(metadataFileName, metadata).unwrapOrElse(
				(err) => {
					console.error("Failed to create metadata file");
					throw err;
				},
			);

			const cid = await ipfsClient.put([metadataFile], {
				name: `${metadata.originalCreatorAddress.slice(-10)} | ${metadata.title}`,
				maxRetries: config.storage.web3storage.maxRetries,
				onRootCidReady: handleRootCidReady,
				onStoredChunk: makeHandleStoredChunk(metadataFile.size),
			});

			if (!cid) throw new Error("No CID created. Upload likely failed.");

			toast.success("🎉 Image upload complete! 🎉");

			const nftData: ArticlePostContractSchema = {
				type: NftType.POST,
				cid,
				host: DataHost.IPFS,
				postType: PostType.ARTICLE,
				metadataPath: metadataFileName,
			};

			console.log(`Metadata URI: ipfs://${nftData.cid}/${nftData.metadataPath}`);
			console.log(
				`Metadata Gateway: https://${nftData.cid}.ipfs.dweb.link/${encodeURIComponent(
					nftData.metadataPath,
				)}`,
			);

			return result.ok(nftData);
		} catch (err) {
			toast.error("Article upload failed.");
			console.error(err);

			if (err instanceof Error) {
				return result.fail(err);
			}

			return result.fail(new Error("Article upload failed"));
		}
	};
