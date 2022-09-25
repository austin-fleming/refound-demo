/* eslint-disable typescript-sort-keys/interface */

import type { UnixTimestamp } from "@modules/common/domain/unix-timestamp.vo";

export type Uuid = string;
export type AccountOwnerWallet = string; // Celo wallet address
export type WalletAddress = string;

export type RusdAccount = {
	accountOwner: AccountOwnerWallet;
	balance: number;
	isLocked: boolean;
};

export type RusdAccountBeneficiary = {
	accountOwner: AccountOwnerWallet;
	beneficiary: WalletAddress;
	claimPlaced: boolean;
	releaseDate?: UnixTimestamp; // only if claimPlaced is true
};

type ActionType =
	| "WITHDRAW"
	| "DEPOSIT"
	| "BENEFICIARY_CLAIM"
	| "BENEFICIARY_CANCEL"
	| "BENEFICIARY_WITHDRAW";

export type RusdAccountAction = {
	id: Uuid;
	timestamp: UnixTimestamp;
	accountOwner: AccountOwnerWallet; // RusdAccount.owner
	action: ActionType;
};
