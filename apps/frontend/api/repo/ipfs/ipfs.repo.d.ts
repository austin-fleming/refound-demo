import type { IpfsUrl } from "@repo/common/utils/ipfs";
import type { Result } from "@repo/common/utils/monads";

export interface IIpfsRepo {
	uploadFile: ({
		file,
		tagName,
		onRootCidReady,
		onStoredChunk,
	}: {
		file: File;
		tagName: string;
		onRootCidReady?: (cid: string) => void;
		onStoredChunk?: (totalSize: number) => (chunkSize: number) => void;
	}) => Promise<Result<IpfsUrl>>;
}
