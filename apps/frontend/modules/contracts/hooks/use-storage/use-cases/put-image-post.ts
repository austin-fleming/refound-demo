import type { Nullable, Result } from "@utils/monads";
import { isNothing, result } from "@utils/monads";
import type { Web3Storage } from "web3.storage";
import type { ImageMetadataStorageSchema, ImagePostContractSchema } from "../schema";
import { DataHost } from "../schema";
import { NftType, PostType } from "../schema";
import { toast } from "@services/toast/toast";
import { unixTimestamp } from "@utils/unix-timestamp";
import { jsonFileFromObject } from "../helpers/json-file-from-object";
import { config } from "config/config";

const createImageMetadataFile = (
	fileName: string,
	metadata: Partial<ImageMetadataStorageSchema>,
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

		const originalCreatorProfileId = metadata.originalCreatorProfileId;
		if (!originalCreatorProfileId) throw new Error("originalCreatorProfileId is missing");

		const postType = metadata.postType;
		if (postType !== PostType.IMAGE) throw new Error(`PostType must be ${PostType.IMAGE}`);

		const description = metadata.description;

		const width = metadata.width;
		if (!width) throw new Error("width is missing");

		const height = metadata.height;
		if (!height) throw new Error("height is missing");

		const location = metadata.location;

		const dateTaken = metadata.dateTaken ? unixTimestamp.fromDate(metadata.dateTaken) : "";
		if (isNothing(dateTaken)) throw new Error("Could not parse dateTaken");

		const dataToStore: Omit<ImageMetadataStorageSchema, "dateTaken"> & { dateTaken: string } = {
			type,
			title,
			tags,
			originalCreatorAddress,
			originalCreatorProfileId,
			postType,
			description,
			width,
			height,
			location,
			dateTaken,
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

export const putImagePost =
	(ipfsClient: Nullable<Web3Storage>) =>
	async (
		imageFile: File,
		metadata: ImageMetadataStorageSchema,
	): Promise<Result<ImagePostContractSchema>> => {
		try {
			if (!ipfsClient) {
				throw new Error("Must connect to ipfs before uploading post.");
			}

			const metadataFileName = "metadata.json";
			const imageFileName = imageFile.name;

			const metadataFile = createImageMetadataFile(metadataFileName, metadata).unwrapOrElse(
				(err) => {
					console.error("Failed to create metadata file");
					throw err;
				},
			);

			const cid = await ipfsClient.put([imageFile, metadataFile], {
				name: `${metadata.originalCreatorAddress.slice(-10)} | ${metadata.title}`,
				maxRetries: config.storage.web3storage.maxRetries,
				onRootCidReady: handleRootCidReady,
				onStoredChunk: makeHandleStoredChunk(imageFile.size + metadataFile.size),
			});

			if (!cid) throw new Error("No CID created. Upload likely failed.");

			toast.success("🎉 Image upload complete! 🎉");

			const nftData: ImagePostContractSchema = {
				type: NftType.POST,
				cid,
				host: DataHost.IPFS,
				postType: PostType.IMAGE,
				metadataPath: metadataFileName,
				imagePath: imageFileName,
			};

			console.log(`Image URI: ipfs://${nftData.cid}/${nftData.imagePath}`);
			console.log(`Metadata URI: ipfs://${nftData.cid}/${nftData.metadataPath}`);
			console.log(
				`Image Gateway: https://${nftData.cid}.ipfs.dweb.link/${encodeURIComponent(
					nftData.imagePath,
				)}`,
			);
			console.log(
				`Metadata Gateway: https://${nftData.cid}.ipfs.dweb.link/${encodeURIComponent(
					nftData.metadataPath,
				)}`,
			);

			return result.ok(nftData);
		} catch (err) {
			toast.error("Image upload failed.");
			console.error(err);

			if (err instanceof Error) {
				return result.fail(err);
			}

			return result.fail(new Error("Image upload failed"));
		}
	};
