import { result } from "@repo/common/utils/monads";
import { buildIpfsUrl } from "@repo/common/utils/ipfs";
import type { Web3Storage } from "web3.storage";
import { config } from "config/config";
import type { IIpfsRepo } from "./ipfs.repo";

export const makeW3sRepo = ({ w3sClient }: { w3sClient: Web3Storage }): IIpfsRepo => ({
	uploadFile: async ({ file, tagName, onRootCidReady, onStoredChunk }) => {
		try {
			const cid = await w3sClient.put([file], {
				name: tagName,
				maxRetries: config.web3storage.maxRetries,
				wrapWithDirectory: false,
				...(onRootCidReady && { onRootCidReady: onRootCidReady }),
				...(onStoredChunk && { onStoredChunk: onStoredChunk(file.size) }),
			});

			if (!cid) return result.fail(new Error("Upload did not produce a CID"));

			const ipfsUrl = buildIpfsUrl(cid);

			return result.ok(ipfsUrl);
		} catch (err) {
			return result.fail(err as Error);
		}
	},
});
