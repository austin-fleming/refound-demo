import type { CoreEvent } from "@repo/common/refound-contracts/event-types";
import type { ProfileMetadataSchema } from "@repo/common/refound-contracts/contract-types";
import type {
	HoldingAccountTable,
	ProfileTable,
	ProfileVerificationLevelTable,
} from "@repo/common/db/cache/cache-tables";
import { unixTimestamp } from "@repo/common/utils/time";
import type { SupabaseClient } from "@supabase/supabase-js";
import type Web3 from "web3";
import type { Contract } from "web3-eth-contract";

export const makeCoreJobHandlers = ({
	rpcClient,
	coreContract,
	supabaseClient,
}: {
	coreContract: Contract;
	rpcClient: Web3;
	supabaseClient: SupabaseClient;
}) => ({
	// PROFILE CREATED
	profileCreated: async (event: Extract<CoreEvent, { event: "ProfileCreated" }>) => {
		try {
			const { profileID, handle, caller } = event.returnValues;

			const profileURI = JSON.parse(
				await coreContract.methods.tokenURI(profileID).call(),
			) as ProfileMetadataSchema;

			if (!profileURI)
				throw new Error(`Could not parse the tokenURI for "${event.event}" event`);

			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const joinedOn = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.unwrapOrElse((error) => {
					throw new Error(`Could not parsed joinedOn for "${profileID}"`);
				});

			const profileData: ProfileTable = {
				avatar_url: profileURI?.image,
				bio: profileURI?.description,
				id: profileID,
				joined_on: joinedOn,
				username: handle,
				wallet_address: caller.toLowerCase(),
			};

			console.log({ profileData });

			const { data, error } = await supabaseClient
				.from<ProfileTable>("profile")
				.insert(profileData);

			if (error) {
				console.error(`Error occurred at upsert in profileCreatedHandler:`);
				throw error;
			}

			if (!data || data.length === 0) {
				throw new Error(`Failed to upsert in profileCreatedHandler: ${event}`);
			}

			const { data: verificationLevelData, error: verificationLevelError } =
				await supabaseClient
					.from<ProfileVerificationLevelTable>("profile_verification_level")
					.insert({
						id: profileData.id,
						level: 0,
					});

			if (verificationLevelError) {
				throw new Error(
					`Error creating verificationLevel entry for new profile: ${verificationLevelError}`,
				);
			}

			const { data: holdingAccount, error: holdingAccountError } = await supabaseClient
				.from<HoldingAccountTable>("holding_account")
				.insert({
					balance: 0,
					is_locked: false,
					owner_address: profileData.wallet_address.toLowerCase(),
					profile_id: profileData.id,
				});

			if (holdingAccountError) {
				throw new Error(
					`Error creating holdingAccount entry for new profile: ${holdingAccountError}`,
				);
			}
		} catch (error) {
			console.error(`Error in profileCreated caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	// PROFILE UPDATED
	profileUpdated: async (event: Extract<CoreEvent, { event: "ProfileUpdated" }>) => {
		const profileURI = JSON.parse(
			await coreContract.methods.tokenURI(event.returnValues.profileID).call(),
		) as ProfileMetadataSchema;

		console.log({
			profileCreatedJob: {
				profileURI,
			},
		});

		const profileUpdateFields: Omit<ProfileTable, "id" | "joined_on" | "wallet_address"> = {
			avatar_url: profileURI?.image,
			bio: profileURI?.description,
			username: event.returnValues.handle.toLowerCase(),
		};

		const { data, error } = await supabaseClient
			.from<ProfileTable>("profile")
			.update(profileUpdateFields)
			.eq("id", event.returnValues.profileID);

		if (error) {
			throw new Error(`Error occurred at update in profileUpdated: ${error}`);
		}

		if (!data || data.length === 0) {
			throw new Error(`Failed to update in profileUpdated: ${event}`);
		}

		if (data.length !== 1)
			console.warn(
				`Multiple profiles were updated for the id "${event.returnValues.profileID}"`,
			);
	},
	verificationLevelChanged: async (
		event: Extract<CoreEvent, { event: "VerificationLevelChanged" }>,
	) => {
		const { level, profileId } = event.returnValues;

		const { data, error } = await supabaseClient
			.from<ProfileVerificationLevelTable>("profile_verification_level")
			.update({ level })
			.eq("id", profileId);

		if (error) {
			throw new Error(`Error occurred at update in verificationLevelChanged: ${error}`);
		}
		if (!data || data.length === 0) {
			throw new Error(`Failed to update in verificationLevelChanged: ${event}`);
		}
		if (data.length !== 1)
			console.warn(`Multiple verificationLevels were updated for the id "${profileId}"`);
	},
});
