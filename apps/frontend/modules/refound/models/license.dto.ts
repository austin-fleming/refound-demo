import type { UnixTimestamp } from "@modules/shared/models/unix-timestamp.vo";
import type { LicenseType } from "./license.model";

/* 
What the contract will return
*/
export type LicenseContractDTO = {
	postID: string | number;
	Ltype: LicenseType;
	purchaseDate: UnixTimestamp;
};
