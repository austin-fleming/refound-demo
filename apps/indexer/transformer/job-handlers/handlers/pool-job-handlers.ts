/* eslint-disable unicorn/no-await-expression-member, sonarjs/no-duplicate-string */
import type { PoolEvent } from "@repo/common/refound-contracts/event-types";
import type {
	PoolPledgeEventTable,
	PoolPledgerTable,
	PoolTable,
	ProfileTable,
} from "@repo/common/db/cache/cache-tables";
import { unixTimestamp } from "@repo/common/utils/time";
import type { SupabaseClient } from "@supabase/supabase-js";
import type Web3 from "web3";
import type { Contract } from "web3-eth-contract";
import { stringToNumber } from "@repo/common/utils/transformers";

export const makePoolJobHandlers = ({
	rpcClient,
	poolContract,
	coreContract,
	supabaseClient,
}: {
	coreContract: Contract;
	poolContract: Contract;
	rpcClient: Web3;
	supabaseClient: SupabaseClient;
}) => ({
	cancel: async (event: Extract<PoolEvent, { event: "Cancel" }>) => {
		try {
			const { poolId } = event.returnValues;

			const { data, error } = await supabaseClient
				.from<PoolTable>("pool")
				.update({ cancelled: true })
				.eq("id", poolId)
				.single();

			if (error) throw error;
			if (!data) throw new Error(`Pool "${poolId}" likely failed to update to "cancelled"`);
		} catch (error) {
			console.error(`Error in cancel caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	claim: async (event: Extract<PoolEvent, { event: "Claim" }>) => {
		try {
			const { poolId } = event.returnValues;

			const { data, error } = await supabaseClient
				.from<PoolTable>("pool")
				.update({ claimed: true })
				.eq("id", poolId)
				.single();

			if (error) throw error;
			if (!data) throw new Error(`Pool "${poolId}" likely failed to update to "claimed"`);
		} catch (error) {
			console.error(`Error in claim caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	launch: async (event: Extract<PoolEvent, { event: "Launch" }>) => {
		try {
			const {
				creator: creatorAddress,
				description,
				endAt: endAtUnixTimestamp,
				goal,
				id,
				imageLink,
				startAt: startAtUnixTimestamp,
				title,
			} = event.returnValues;

			// 1. GET PROFILE ID OF CREATOR
			const { data: creatorData, error: creatorIdError } = await supabaseClient
				.from<Pick<ProfileTable, "id" | "wallet_address">>("profile")
				.select("id, wallet_address")
				.eq("wallet_address", creatorAddress.toLowerCase())
				.single();
			if (creatorIdError) throw creatorIdError;
			if (!creatorData?.id)
				throw new Error(
					`For pool "${id}" could not find profileId of creator with address "${creatorAddress}"`,
				);

			// 2. PARSE COVER IMAGE ID, IF EXISTS, OR RETURN UNDEFINED IF UNPARSEABLE
			const coverImage = stringToNumber(imageLink)
				.effectFail((error) => {
					console.warn(
						`Failed to get postId number from imageLink in pool "${id}":`,
						error,
					);
				})
				.extract();

			// 3. PARSE END AT DATE, OR NOW IF FAILS
			const endAt = unixTimestamp
				.toDate(endAtUnixTimestamp)
				.mapOk((date) => date.toISOString())
				.unwrapOrElse((error) => {
					console.warn(`Failed to get endAt in pool "${id}":`, error);

					// HACK: falling back to now if doesn't exist.
					return new Date().toISOString();
				});

			// 4. PARSE START AT DATE, OR NOW IF FAILS
			const startAt = unixTimestamp
				.toDate(startAtUnixTimestamp)
				.mapOk((date) => date.toISOString())
				.unwrapOrElse((error) => {
					console.warn(`Failed to get startAt in pool "${id}":`, error);

					// HACK: falling back to now if doesn't exist.
					return new Date().toISOString();
				});

			// 5. BUILD TABLE
			const pool: PoolTable = {
				cancelled: false,
				claimed: false,
				cover_image: coverImage,
				creator: creatorData.id,
				end_at: endAt,
				goal,
				id,
				start_at: startAt,
				summary: description,
				title,
				total_pledged: 0,
			};

			// 6. WRITE TO CACHE
			const { data, error } = await supabaseClient
				.from<PoolTable>("pool")
				.insert(pool)
				.single();

			if (error) throw error;
			if (!data) throw new Error(`Pool "${id}" failed to write.`);
		} catch (error) {
			console.error(`Error in launch caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	pledge: async (event: Extract<PoolEvent, { event: "Pledge" }>) => {
		try {
			const { amount, caller, poolId, callerTotal, poolTotal } = event.returnValues;

			// 1. UPDATE POOL
			const { data: pool, error: poolError } = await supabaseClient
				.from<PoolTable>("pool")
				.upsert({ id: poolId, total_pledged: poolTotal })
				.single();
			if (poolError) throw poolError;
			if (!pool)
				throw new Error(
					`Pool "${poolId}" failed to upsert pledge event changes from "${caller}"`,
				);

			// 2. GET REFOUND PROFILE OF PLEDGER
			const { data: profiles, error: profilesError } = await supabaseClient
				.from<Pick<ProfileTable, "id" | "wallet_address">>("profile")
				.select("id, wallet_address")
				.eq("wallet_address", caller.toLowerCase());
			if (profilesError) throw profilesError;
			if (profiles.length === 0)
				throw new Error(
					`Pool "${poolId}" pledge event for pledger "${caller}" has no refound profile.`,
				);

			// 3. UPSERT THE UPDATED POOL PLEDGER ROW
			const { data: updatedPledger, error: updatedPledgerError } = await supabaseClient
				.from<PoolPledgerTable>("pool_pledger")
				.upsert({
					pledger_id: profiles[0].id,
					pool_id: poolId,
					total_pledge: callerTotal,
				})
				.single();
			if (updatedPledgerError) console.error(updatedPledgerError);
			if (!updatedPledger)
				console.error(
					`Pool "${poolId}" pledger with profile "${profiles[0].id}" failed to upsert poolPledger row`,
				);

			// 4. GET TRANSACTION TIMESTAMP
			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const transactionDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.unwrapOrElse(() => {
					throw new Error(
						`Could not parse transactionDate for pledgeEvent for pool "${poolId}" by "${caller}"`,
					);
				});

			// 5. CREATE POOL EVENT
			const { data: poolPledge, error: poolPledgeError } = await supabaseClient
				.from<PoolPledgeEventTable>("pool_pledge_event")
				.insert({
					amount,
					event_type: "PLEDGE",
					pledger_id: updatedPledger?.pledger_id,
					pool_id: poolId,
					transaction_date: transactionDate,
				});
			if (poolPledgeError) throw poolPledgeError;
		} catch (error) {
			console.error(`Error in pledge caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	refund: async (event: Extract<PoolEvent, { event: "Refund" }>) => {
		try {
			const { amount, caller, poolId } = event.returnValues;

			// 1. GET REFOUND PROFILE OF PLEDGER
			const { data: profiles, error: profilesError } = await supabaseClient
				.from<Pick<ProfileTable, "id" | "wallet_address">>("profile")
				.select("id, wallet_address")
				.eq("wallet_address", caller.toLowerCase());
			if (profilesError) throw profilesError;
			if (profiles.length === 0)
				throw new Error(
					`Pool "${poolId}" refund event for pledger "${caller}" has no refound profile.`,
				);

			// 2. UPSERT THE UPDATED POOL PLEDGER ROW
			const { data: updatedPledger, error: updatedPledgerError } = await supabaseClient
				.from<PoolPledgerTable>("pool_pledger")
				.upsert({
					pledger_id: profiles[0].id,
					pool_id: poolId,
					total_pledge: 0,
				})
				.single();
			if (updatedPledgerError) console.error(updatedPledgerError);
			if (!updatedPledger)
				console.error(
					`Pool "${poolId}" pledger with profile "${profiles[0].id}" failed to upsert poolPledger row`,
				);

			// 3. GET TRANSACTION TIMESTAMP
			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const transactionDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.unwrapOrElse(() => {
					throw new Error(
						`Could not parse transactionDate for refund for pool "${poolId}" by "${caller}"`,
					);
				});

			// 4. CREATE POOL EVENT
			const { data: poolRefund, error: poolRefundError } = await supabaseClient
				.from<PoolPledgeEventTable>("pool_pledge_event")
				.insert({
					amount,
					event_type: "REFUND",
					pledger_id: updatedPledger?.pledger_id,
					pool_id: poolId,
					transaction_date: transactionDate,
				});
			if (poolRefundError) throw poolRefundError;
		} catch (error) {
			console.error(`Error in refund caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	unpledge: async (event: Extract<PoolEvent, { event: "Unpledge" }>) => {
		try {
			const { amount, caller, id: poolId, callerTotal, poolTotal } = event.returnValues;

			// 1. UPDATE POOL
			const { data: pool, error: poolError } = await supabaseClient
				.from<PoolTable>("pool")
				.upsert({ id: poolId, total_pledged: poolTotal })
				.single();
			if (poolError) throw poolError;
			if (!pool)
				throw new Error(
					`Pool "${poolId}" failed to upsert unpledge event changes from "${caller}"`,
				);

			// 2. GET REFOUND PROFILE OF PLEDGER
			const { data: profiles, error: profilesError } = await supabaseClient
				.from<Pick<ProfileTable, "id" | "wallet_address">>("profile")
				.select("id, wallet_address")
				.eq("wallet_address", caller.toLowerCase());
			if (profilesError) throw profilesError;
			if (profiles.length === 0)
				throw new Error(
					`Pool "${poolId}" unpledge event for pledger "${caller}" has no refound profile.`,
				);

			// 3. UPSERT THE UPDATED POOL PLEDGER ROW
			const { data: updatedPledger, error: updatedPledgerError } = await supabaseClient
				.from<PoolPledgerTable>("pool_pledger")
				.upsert({
					pledger_id: profiles[0].id,
					pool_id: poolId,
					total_pledge: callerTotal,
				})
				.single();
			if (updatedPledgerError) console.error(updatedPledgerError);
			if (!updatedPledger)
				console.error(
					`Pool "${poolId}" pledger with profile "${profiles[0].id}" failed to upsert poolPledger row`,
				);

			// 4. GET TRANSACTION TIMESTAMP
			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const transactionDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.unwrapOrElse(() => {
					throw new Error(
						`Could not parse transactionDate for unpledgeEvent for pool "${poolId}" by "${caller}"`,
					);
				});

			// 5. CREATE POOL EVENT
			const { data: poolUnpledge, error: poolUnpledgeError } = await supabaseClient
				.from<PoolPledgeEventTable>("pool_pledge_event")
				.insert({
					amount,
					event_type: "UNPLEDGE",
					pledger_id: updatedPledger?.pledger_id,
					pool_id: poolId,
					transaction_date: transactionDate,
				});
			if (poolUnpledgeError) throw poolUnpledgeError;
		} catch (error) {
			console.error(`Error in unpledge caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
});
