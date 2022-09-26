import type {
	CoreEvent,
	PoolEvent,
	PostEvent,
	RefoundEvent,
	RusdEvent,
} from "@common/event-types/event-types";
import type { Job } from "bullmq";
import type { EventData } from "web3-eth-contract";

export const coreJobHandler = async (job: Job<CoreEvent>) => {
	const { event, returnValues } = job.data;
	console.log({ coreJob: job });
	switch (event) {
		case "AddressChange":
			console.log("AddressChange");
			return;
		case "Approval":
			console.log("Approval");
			return;
		case "ApprovalForAll":
			console.log("ApprovedForAll");
			return;
		case "OwnershipTransferred":
			return;
		case "PostCreated":
			return;
		case "ProfileCreated":
			return;
		case "ProfileUpdated":
			return;
		case "Transfer":
			return;
		case "VerificationLevelChanged":
			return;
		default:
			console.error(`Unknown eventType in coreJobHandler "${event}"`);
	}
};

export const postJobHandler = async (job: Job<PostEvent>) => {
	const { event, returnValues } = job.data;
	console.log({ postJob: job });
	switch (event) {
		case "Approval":
			return;
		case "ApprovalForAll":
			return;
		case "ContentInteracted":
			return;
		case "ContractURIUpdated":
			return;
		case "LicensePurchased":
			return;
		case "OwnershipTransferred":
			return;
		case "PostCreated":
			return;
		case "PriceUpdated":
			return;
		case "Transfer":
			return;
		default:
			console.error(`Unknown eventType in postJobHandler "${event}"`);
	}
};

export const poolJobHandler = async (job: Job<PoolEvent>) => {
	console.log({ poolJob: job });
};

export const rusdJobHandler = async (job: Job<RusdEvent>) => {
	console.log({ rusdJob: job });
};
