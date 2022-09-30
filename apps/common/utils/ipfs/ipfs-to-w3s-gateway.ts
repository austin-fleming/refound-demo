import type { Result } from "../monads/result";
import { result } from "../monads";
import { extractCID } from "./extract-cid";

export const ipfsToW3sGateway = (ipfsUrl: string): Result<string> => {
	const { cid, containsCid } = extractCID(ipfsUrl);

	if (!containsCid)
		return result.fail(new Error(`IpfsUrl "${ipfsUrl}" does not contain valid CID`));

	return result.ok(`https://${cid}.ipfs.w3s.link`);
};
