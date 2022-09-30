/* eslint-disable typescript-sort-keys/interface, no-mixed-spaces-and-tabs */

type WalletAddress = string;
type Timestamp = string;
type Uuid = string;
type Amount = number;

export type ProfileTable = {
	id: number;
	username: string;
	wallet_address: WalletAddress;
	joined_on: Timestamp;
	bio?: string;
	avatar_url?: string;
};

export type ProfileVerificationLevelTable = {
	id: ProfileTable["id"];
	level: number;
};

export type HoldingAccountTable = {
	owner_address: WalletAddress;
	profile_id: ProfileTable["id"];
	balance: number;
	is_locked: boolean;
};

export type HoldingAccountBeneficiaryTable = {
	beneficiary?: WalletAddress;
	account: HoldingAccountTable["owner_address"];
	claim_placed: boolean;
	release_date: Timestamp;
	is_deleted: boolean;
};

export type HoldingAccountActionTable = {
	id: Uuid;
	account: HoldingAccountTable["owner_address"];
	account_action:
		| "WITHDRAW"
		| "DEPOSIT"
		| "BENEFICIARY_CLAIM"
		| "BENEFICIARY_CANCEL"
		| "BENEFICIARY_WITHDRAW";
	amount: Amount;
	performed_by: WalletAddress;
	completion_date?: Timestamp;
};

export type SubscriptionPlanTable = {
	id: Uuid;
	account: HoldingAccountTable["owner_address"];
	start_time: Timestamp;
};

export type SubscriptionTable = {
	plan_id: SubscriptionPlanTable["id"];
	subscriber: ProfileTable["id"];
	amount?: Amount;
};

type PostTableBase = {
	id: number;
	creator: ProfileTable["id"];
	owner?: string;
	title: string;
	created_at: Timestamp;
	tags: string[];
	location?: string;
};

export type PostTable =
	| ({
			post_type: "IMAGE";
			description: string;
			width?: number;
			height?: number;
			image_link: string;
			taken_on?: Timestamp;
	  } & PostTableBase)
	| ({
			post_type: "ARTICLE";
			body: string;
			description?: string;
			cover_image?: PostTable["id"];
	  } & PostTableBase);

export type PostTableImage = Extract<PostTable, { post_type: "IMAGE" }>;
export type PostTableArticle = Extract<PostTable, { post_type: "ARTICLE" }>;

/* 
TODO: Add this table

export type PostTagTable
*/

export type PostInteractionTable = {
	post_id: PostTable["id"];
	interactor: ProfileTable["id"];
	interaction_type: number;
};

export type LicenseTable = {
	id: Uuid;
	post_id: PostTable["id"];
	license_type: number;
	owner_address: WalletAddress;
	purchase_price: Amount;
	purchase_date?: Timestamp;
};

export type PoolTable = {
	id: number;
	creator: ProfileTable["id"];
	goal: number;
	total_pledged: number;
	title: string;
	summary: string;
	cover_image?: PostTable["id"];
	start_at: Timestamp;
	end_at: Timestamp;
	claimed: boolean;
	cancelled: boolean;
};

export type PoolPledgerTable = {
	pledger_id: ProfileTable["id"];
	pool_id: PoolTable["id"];
	total_pledge: Amount;
	inserted_at: Timestamp;
};

export type PoolPledgeEventTable = {
	id: Uuid;
	pledger_id: ProfileTable["id"];
	pool_id: PoolTable["id"];
	event_type: "PLEDGE" | "UNPLEDGE" | "REFUND";
	amount: Amount;
	transaction_date: Timestamp;
};
