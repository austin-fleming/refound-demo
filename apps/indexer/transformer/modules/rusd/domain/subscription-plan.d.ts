/* eslint-disable typescript-sort-keys/interface */
import type { UnixTimestamp } from "@modules/common/domain/unix-timestamp.vo";
import type { AccountOwnerWallet, WalletAddress } from "./account";

export type SubscriptionPlan = {
	accountOwner: AccountOwnerWallet;
	startTime: UnixTimestamp;
};

export type Subscription = {
	plan: AccountOwnerWallet;
	subscriber: WalletAddress;
	amount: number;
};
