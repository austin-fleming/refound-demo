import type {
	CoreEvent,
	PoolEvent,
	PostEvent,
	RusdEvent,
} from "@repo/common/refound-contracts/event-types";
import type { SupabaseClient } from "@supabase/supabase-js";
import config from "@transformer/config";
import type { Job } from "bullmq";
import Web3 from "web3";
import { makeCoreJobHandlers } from "./handlers/core-job-handlers";
import { makePoolJobHandlers } from "./handlers/pool-job-handlers";
import { makePostJobHandlers } from "./handlers/post-job-handlers";
import { makeRusdJobHandlers } from "./handlers/rusd-job-handlers";

export const makeCoreJobHandler = (supabaseClient: SupabaseClient) => {
	const provider = new Web3.providers.HttpProvider(config.celo.rpcEndpoint);
	const rpcClient = new Web3(provider);
	const coreContract = new rpcClient.eth.Contract(
		config.contracts.core.abi,
		config.contracts.core.address,
	);

	const coreJobHandlers = makeCoreJobHandlers({ coreContract, rpcClient, supabaseClient });

	return async (job: Job<CoreEvent>) => {
		const { data } = job;
		switch (data.event) {
			case "ProfileCreated":
				return coreJobHandlers.profileCreated(data);
			case "ProfileUpdated":
				return coreJobHandlers.profileUpdated(data);
			case "VerificationLevelChanged":
				return coreJobHandlers.verificationLevelChanged(data);
			case "PostCreated":
				console.log("PostCreated event in post handled by core");
				return;
			case "AddressChange":
			case "Approval":
			case "ApprovalForAll":
			case "OwnershipTransferred":
			case "Transfer":
				console.warn(`Unused core event ${data.event}`);
				return;
			default:
				console.error(`Unknown eventType in coreJobHandler "${(data as any).event}"`);
		}
	};
};

export const makePostJobHandler = (supabaseClient: SupabaseClient) => {
	const provider = new Web3.providers.HttpProvider(config.celo.rpcEndpoint);
	const rpcClient = new Web3(provider);
	const postContract = new rpcClient.eth.Contract(
		config.contracts.post.abi,
		config.contracts.post.address,
	);
	const coreContract = new rpcClient.eth.Contract(
		config.contracts.core.abi,
		config.contracts.core.address,
	);

	const postJobHandlers = makePostJobHandlers({
		coreContract,
		postContract,
		rpcClient,
		supabaseClient,
	});

	return async (job: Job<PostEvent>) => {
		const { data } = job;
		switch (data.event) {
			case "PostCreated":
				return postJobHandlers.postCreated(data);
			case "ContentInteracted":
				return postJobHandlers.contentInteracted(data);
			case "LicensePurchased":
				return postJobHandlers.licensePurchased(data);
			case "Transfer":
				return postJobHandlers.transfer(data);
			case "Approval":
			case "ApprovalForAll":
			case "ContractURIUpdated":
			case "OwnershipTransferred":
			case "PriceUpdated":
				console.warn(`Unused post event ${data.event}`);
				return;
			default:
				console.error(`Unknown eventType in postJobHandler "${(data as any).event}"`);
		}
	};
};
export const makePoolJobHandler = (supabaseClient: SupabaseClient) => {
	const provider = new Web3.providers.HttpProvider(config.celo.rpcEndpoint);
	const rpcClient = new Web3(provider);
	const poolContract = new rpcClient.eth.Contract(
		config.contracts.pool.abi,
		config.contracts.pool.address,
	);

	const poolJobHandlers = makePoolJobHandlers({
		poolContract,
		rpcClient,
		supabaseClient,
	});

	return async (job: Job<PoolEvent>) => {
		const { data } = job;
		switch (data.event) {
			case "Launch":
				return poolJobHandlers.launch(data);
			case "Cancel":
				return poolJobHandlers.cancel(data);
			case "Claim":
				return poolJobHandlers.claim(data);
			case "Pledge":
				return poolJobHandlers.pledge(data);
			case "Unpledge":
				return poolJobHandlers.unpledge(data);
			case "Refund":
				return poolJobHandlers.refund(data);
			default:
				console.error(`Unknown eventType in poolJobHandler "${(data as any).event}"`);
		}
	};
};

export const makeRusdJobHandler = (supabaseClient: SupabaseClient) => {
	const provider = new Web3.providers.HttpProvider(config.celo.rpcEndpoint);
	const rpcClient = new Web3(provider);
	const rusdContract = new rpcClient.eth.Contract(
		config.contracts.rusd.abi,
		config.contracts.rusd.address,
	);

	const rusdJobHandlers = makeRusdJobHandlers({
		rpcClient,
		rusdContract,
		supabaseClient,
	});

	return async (job: Job<RusdEvent>) => {
		const { data } = job;
		switch (data.event) {
			case "BeneficiaryAdded":
				return rusdJobHandlers.beneficiaryAdded(data);
			case "BeneficiaryClaimCancelled":
				return rusdJobHandlers.beneficiaryClaimCancelled(data);
			case "BeneficiaryClaimStart":
				return rusdJobHandlers.beneficiaryClaimStart(data);
			case "BeneficiaryRemoved":
				return rusdJobHandlers.beneficiaryRemoved(data);
			case "BeneficiaryWithdraw":
				return rusdJobHandlers.beneficiaryWithdraw(data);
			case "Deposit":
				return rusdJobHandlers.deposit(data);
			case "Withdraw":
				return rusdJobHandlers.withdraw(data);
			case "Approval":
			case "NewSubscriber":
			case "NewSubscriptionReceiver":
			case "OwnershipTransferred":
			case "SubscriberUnsubscribed":
			case "SubscriptionPeriodIncremented":
			case "Transfer":
			case "UnsubscribedInsufficientFunds":
				console.warn(`Unused post event ${data.event}`);
				return;
			default:
				console.error(`Unknown eventType in rusdJobHandler "${(data as any).event}"`);
		}
	};
};
