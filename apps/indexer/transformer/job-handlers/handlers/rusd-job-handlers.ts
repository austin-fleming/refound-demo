/* eslint-disable unicorn/no-await-expression-member, sonarjs/no-duplicate-string */
import type { RusdEvent } from "@repo/common/refound-contracts/event-types";
import type {
	HoldingAccountActionTable,
	HoldingAccountBeneficiaryTable,
	HoldingAccountTable,
} from "@repo/common/db/cache/cache-tables";
import { unixTimestamp } from "@repo/common/utils/time";
import type { SupabaseClient } from "@supabase/supabase-js";
import type Web3 from "web3";
import type { Contract } from "web3-eth-contract";

export const makeRusdJobHandlers = ({
	rpcClient,
	rusdContract,
	supabaseClient,
}: {
	rpcClient: Web3;
	rusdContract: Contract;
	supabaseClient: SupabaseClient;
}) => ({
	beneficiaryAdded: async (event: Extract<RusdEvent, { event: "BeneficiaryAdded" }>) => {
		try {
			const { beneficiary, primary } = event.returnValues;

			const { data, error } = await supabaseClient
				.from<HoldingAccountBeneficiaryTable>("holding_account_beneficiary")
				.upsert({
					account: primary.toLowerCase(),
					beneficiary: beneficiary.toLowerCase(),
					claim_placed: false,
				})
				.single();

			if (error) throw error;

			if (!data)
				throw new Error(
					`beneficiaryAccount of "${primary}" likely failed adding beneficiary "${beneficiary}"`,
				);
		} catch (error) {
			console.error(`Error in beneficiaryAdded caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	beneficiaryClaimCancelled: async (
		event: Extract<RusdEvent, { event: "BeneficiaryClaimCancelled" }>,
	) => {
		try {
			const { beneficiary, primary } = event.returnValues;

			// 1. GET TIMESTAMP
			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const completionDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.extract();

			// 2. CREATE ACTION ENTRY
			const { data: actionData, error: actionError } = await supabaseClient
				.from<HoldingAccountActionTable>("holding_account_action")
				.insert({
					account: primary.toLowerCase(),
					account_action: "BENEFICIARY_CANCEL",
					amount: 0,
					completion_date: completionDate,
					performed_by: primary.toLowerCase(),
				})
				.single();
			if (actionError) throw actionError;
			if (!actionData)
				throw new Error(
					`accountAction of "${primary}" likely failed cancelling beneficiary claim`,
				);

			// 3. UPDATE BENEFICIARY TABLE
			const { data: beneficiaryAccount, error: beneficiaryAccountError } =
				await supabaseClient
					.from<HoldingAccountBeneficiaryTable>("holding_account_beneficiary")
					.update({
						claim_placed: false,
						release_date: undefined,
					})
					.match({
						account: primary.toLowerCase(),
						beneficiary: beneficiary.toLowerCase(),
					})
					.single();
			if (beneficiaryAccountError) throw beneficiaryAccountError;
			if (!beneficiaryAccount)
				throw new Error(
					`accountAction of "${primary}" likely failed updating beneficiary claim to cancelled`,
				);
		} catch (error) {
			console.error(`Error in beneficiaryClaimCancelled caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	beneficiaryClaimStart: async (
		event: Extract<RusdEvent, { event: "BeneficiaryClaimStart" }>,
	) => {
		try {
			const {
				beneficiary,
				primary,
				releaseDate: releaseDateUnixTimestamp,
			} = event.returnValues;

			// 1. GET TIMESTAMP
			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const completionDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.extract();

			// 2. PARSE RELEASE DATE
			const releaseDate = unixTimestamp
				.toDate(releaseDateUnixTimestamp)
				.mapOk((date) => date.toISOString())
				.effectFail((error) => {
					console.error(
						`realeaseDate "${releaseDateUnixTimestamp}" for beneficiaryClaimStart for "${primary}" failed to parse. Falling back to undefined.`,
					);
				})
				.extract();

			// 3. CREATE ACTION ENTRY
			const { data: actionData, error: actionError } = await supabaseClient
				.from<HoldingAccountActionTable>("holding_account_action")
				.insert({
					account: primary.toLowerCase(),
					account_action: "BENEFICIARY_CLAIM",
					amount: 0,
					completion_date: completionDate,
					performed_by: beneficiary.toLowerCase(),
				})
				.single();
			if (actionError) throw actionError;
			if (!actionData)
				throw new Error(
					`accountAction of "${primary}" likely failed starting beneficiary claim`,
				);

			// 4. UPDATE BENEFICIARY TABLE
			const { data: beneficiaryAccount, error: beneficiaryAccountError } =
				await supabaseClient
					.from<HoldingAccountBeneficiaryTable>("holding_account_beneficiary")
					.update({
						claim_placed: true,
						release_date: releaseDate,
					})
					.match({
						account: primary.toLowerCase(),
						beneficiary: beneficiary.toLowerCase(),
					})
					.single();
			if (beneficiaryAccountError) throw beneficiaryAccountError;
			if (!beneficiaryAccount)
				throw new Error(
					`accountAction of "${primary}" likely failed updating beneficiary claim to started`,
				);
		} catch (error) {
			console.error(`Error in beneficiaryClaimStart caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	beneficiaryRemoved: async (event: Extract<RusdEvent, { event: "BeneficiaryRemoved" }>) => {
		try {
			const { beneficiary, primary } = event.returnValues;

			// 1. MARK BENEFICIARY TABLE AS REMOVED
			const { data: beneficiaryAccount, error: beneficiaryAccountError } =
				await supabaseClient
					.from<HoldingAccountBeneficiaryTable>("holding_account_beneficiary")
					.update({
						claim_placed: false,
						is_deleted: true,
						release_date: undefined,
					})
					.match({
						account: primary.toLowerCase(),
						beneficiary: beneficiary.toLowerCase(),
					})
					.single();
			if (beneficiaryAccountError) throw beneficiaryAccountError;
			if (!beneficiaryAccount)
				throw new Error(
					`accountAction of "${primary}" likely failed updating beneficiary claim to started`,
				);
		} catch (error) {
			console.error(`Error in beneficiaryClaimStart caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	beneficiaryWithdraw: async (event: Extract<RusdEvent, { event: "BeneficiaryWithdraw" }>) => {
		try {
			const { beneficiary, primary, amount } = event.returnValues;

			// 1. GET TIMESTAMP
			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const completionDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.extract();

			// 2. CREATE ACTION ENTRY
			const { data: actionData, error: actionError } = await supabaseClient
				.from<HoldingAccountActionTable>("holding_account_action")
				.insert({
					account: primary.toLowerCase(),
					account_action: "BENEFICIARY_WITHDRAW",
					amount: amount * -1,
					completion_date: completionDate,
					performed_by: beneficiary.toLowerCase(),
				})
				.single();
			if (actionError) throw actionError;
			if (!actionData)
				throw new Error(
					`accountAction of "${primary}" likely failed performing beneficiary withdraw`,
				);

			// 3. UPDATE HOLDING ACCOUNT
			const { data: holdingAccount, error: holdingAccountError } = await supabaseClient
				.from<HoldingAccountTable>("holding_account")
				.update({
					balance: 0,
					owner_address: primary.toLowerCase(),
				})
				.single();
			if (holdingAccountError) throw holdingAccountError;
			if (!holdingAccount)
				throw new Error(
					`holdingAccount of "${primary}" likely failed updating balance for beneficiaryWithdraw by "${beneficiary}"`,
				);
		} catch (error) {
			console.error(`Error in beneficiaryWithdraw caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	deposit: async (event: Extract<RusdEvent, { event: "Deposit" }>) => {
		try {
			const { amount, from } = event.returnValues;

			// 1. GET NEW BALANCE
			const balance = (await rusdContract.methods.balanceOf(from).call()) as number;

			// 2. GET TIMESTAMP
			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const completionDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.extract();

			// 3. CREATE ACTION ENTRY
			const { data: actionData, error: actionError } = await supabaseClient
				.from<HoldingAccountActionTable>("holding_account_action")
				.insert({
					account: from.toLowerCase(),
					account_action: "DEPOSIT",
					amount: amount,
					completion_date: completionDate,
					performed_by: from.toLowerCase(),
				})
				.single();
			if (actionError) throw actionError;
			if (!actionData)
				throw new Error(`accountAction of "${from}" likely failed performing deposit`);

			// 4. UPDATE HOLDING ACCOUNT
			const { data: holdingAccount, error: holdingAccountError } = await supabaseClient
				.from<HoldingAccountTable>("holding_account")
				.update({
					balance,
					owner_address: from.toLowerCase(),
				})
				.single();
			if (holdingAccountError) throw holdingAccountError;
			if (!holdingAccount)
				throw new Error(
					`holdingAccount of "${from}" likely failed updating balance for deposit`,
				);
		} catch (error) {
			console.error(`Error in deposit caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	withdraw: async (event: Extract<RusdEvent, { event: "Withdraw" }>) => {
		try {
			const { amount, to } = event.returnValues;

			// 1. GET NEW BALANCE
			const balance = (await rusdContract.methods.balanceOf(to).call()) as number;

			// 2. GET TIMESTAMP
			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const completionDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.extract();

			// 3. CREATE ACTION ENTRY
			const { data: actionData, error: actionError } = await supabaseClient
				.from<HoldingAccountActionTable>("holding_account_action")
				.insert({
					account: to.toLowerCase(),
					account_action: "WITHDRAW",
					amount: amount * -1,
					completion_date: completionDate,
					performed_by: to.toLowerCase(),
				})
				.single();
			if (actionError) throw actionError;
			if (!actionData)
				throw new Error(`accountAction of "${to}" likely failed performing withdraw`);

			// 4. UPDATE HOLDING ACCOUNT
			const { data: holdingAccount, error: holdingAccountError } = await supabaseClient
				.from<HoldingAccountTable>("holding_account")
				.update({
					balance,
					owner_address: to.toLowerCase(),
				})
				.single();
			if (holdingAccountError) throw holdingAccountError;
			if (!holdingAccount)
				throw new Error(
					`holdingAccount of "${to}" likely failed updating balance for withdraw`,
				);
		} catch (error) {
			console.error(`Error in withdraw caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
});
