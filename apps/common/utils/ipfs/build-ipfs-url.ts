import type { IpfsUrl } from "./ipfs-url";

export const buildIpfsUrl = (cid: string): IpfsUrl => `ipfs://${cid}`;
