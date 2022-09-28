import { cid } from "is-ipfs";

export const isValidCid = (maybeCid: string) => cid(maybeCid);
