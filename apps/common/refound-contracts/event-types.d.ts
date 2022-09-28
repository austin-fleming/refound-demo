/* eslint-disable no-mixed-spaces-and-tabs, unicorn/no-keyword-prefix*/
type Address = string;

type CoreEventType =
	| "AddressChange"
	| "Approval"
	| "ApprovedForAll"
	| "OwnershipTransferred"
	| "PostCreated"
	| "ProfileCreated"
	| "ProfileUpdated"
	| "Transfer"
	| "VerificationLevelChanged";

type ContractEvent<EventName, ReturnValues> = {
	address: string;
	blockNumber: number;
	event: EventName;
	returnValues: ReturnValues;
};

/* 
EVENTS
*/

export type CoreEvent =
	| ContractEvent<"AddressChange", { contractAddress: Address }>
	| ContractEvent<"Approval", { approved: Address; owner: Address; tokenId: number }>
	| ContractEvent<"ApprovalForAll", { approved: boolean; operator: Address; owner: Address }>
	| ContractEvent<"OwnershipTransferred", { newOwner: Address; previousOwner: Address }>
	| ContractEvent<"PostCreated", { from: Address; postId: number; profileId: number }>
	| ContractEvent<"ProfileCreated", { caller: Address; handle: string; profileID: number }>
	| ContractEvent<"ProfileUpdated", { caller: Address; handle: string; profileID: number }>
	| ContractEvent<"Transfer", { from: Address; to: Address; tokenId: number }>
	| ContractEvent<"VerificationLevelChanged", { level: number; profileId: number }>;

export type PostEvent =
	| ContractEvent<"Approval", { approved: Address; owner: Address; tokenId: number }>
	| ContractEvent<"ApprovalForAll", { approved: boolean; operator: Address; owner: Address }>
	| ContractEvent<
			"ContentInteracted",
			{ interactionType: number; interactor: Address; postId: number }
	  >
	| ContractEvent<"ContractURIUpdated", { contractURI: string }>
	| ContractEvent<
			"LicensePurchased",
			{ amount: number; from: Address; licenseType: number; postId: number; to: Address }
	  >
	| ContractEvent<"OwnershipTransferred", { newOwner: Address; previousOwner: Address }>
	| ContractEvent<"PostCreated", { metadata: string; postID: number; profileID: number }>
	| ContractEvent<"PriceUpdated", { licenseTypeIndex: number; price: number }>
	| ContractEvent<"Transfer", { from: Address; to: Address; tokenId: number }>;

export type PoolEvent =
	| ContractEvent<"Cancel", { caller: Address; poolId: number }>
	| ContractEvent<"Claim", { amount: number; caller: Address; poolId: number }>
	| ContractEvent<
			"Launch",
			{
				creator: Address;
				description: string;
				endAt: number;
				goal: number;
				id: number;
				imageLink: string;
				startAt: number;
				title: string;
			}
	  >
	| ContractEvent<
			"Pledge",
			{
				amount: number;
				caller: Address;
				callerTotal: number;
				poolId: number;
				poolTotal: number;
			}
	  >
	| ContractEvent<"Refund", { amount: number; caller: Address; poolId: number }>
	| ContractEvent<
			"Unpledge",
			{ amount: number; caller: Address; callerTotal: number; id: number; poolTotal: number }
	  >;

export type RusdEvent =
	| ContractEvent<"Approval", { approved: Address; owner: Address; tokenId: number }>
	| ContractEvent<"BeneficiaryAdded", { beneficiary: Address; primary: Address }>
	| ContractEvent<"BeneficiaryClaimCancelled", { beneficiary: Address; primary: Address }>
	| ContractEvent<
			"BeneficiaryClaimStart",
			{ beneficiary: Address; primary: Address; releaseDate: number }
	  >
	| ContractEvent<"BeneficiaryRemoved", { beneficiary: Address; primary: Address }>
	| ContractEvent<
			"BeneficiaryWithdraw",
			{ amount: number; beneficiary: Address; primary: Address }
	  >
	| ContractEvent<"Deposit", { amount: number; from: Address }>
	| ContractEvent<"Withdraw", { amount: number; to: Address }>
	| ContractEvent<"NewSubscriber", { amount: number; receiver: Address; subscriber: Address }>
	| ContractEvent<"NewSubscriptionReceiver", { receiverOwner: Address }>
	| ContractEvent<"OwnershipTransferred", { newOwner: Address; previousOwner: Address }>
	| ContractEvent<"SubscriberUnsubscribed", { receiver: Address; subscriber: Address }>
	| ContractEvent<"SubscriptionPeriodIncremented", { startTime: number }>
	| ContractEvent<"Transfer", { from: Address; to: Address; value: number }>
	| ContractEvent<"UnsubscribedInsufficientFunds", { receiver: Address; subscriber: Address }>;

export type RefoundEvent = CoreEvent | PostEvent | PoolEvent | RusdEvent;
