/* eslint-disable unicorn/no-await-expression-member */
import type { PostEvent } from "@repo/common/refound-contracts/event-types";
import type {
	ArticlePostMetadataSchema,
	ImagePostMetadataSchema,
} from "@repo/common/refound-contracts/contract-types";
import type {
	LicenseTable,
	PostInteractionTable,
	PostTable,
} from "@repo/common/db/cache/cache-tables";
import { unixTimestamp } from "@repo/common/utils/time";
import type { SupabaseClient } from "@supabase/supabase-js";
import type Web3 from "web3";
import type { Contract } from "web3-eth-contract";
import { postParser } from "./post-parser";

export const makePostJobHandlers = ({
	rpcClient,
	postContract,
	coreContract,
	supabaseClient,
}: {
	coreContract: Contract;
	postContract: Contract;
	rpcClient: Web3;
	supabaseClient: SupabaseClient;
}) => ({
	contentInteracted: async (event: Extract<PostEvent, { event: "ContentInteracted" }>) => {
		try {
			const { interactionType, interactor, postId } = event.returnValues;

			const { data: interactorProfileId, error: interactorError } = await supabaseClient
				.from<{ id: number; wallet_address: string }>("profile")
				.select("wallet_address,id")
				.eq("wallet_address", interactor.toLowerCase())
				.single();
			if (interactorError) throw interactorError;

			const interactionRow: PostInteractionTable = {
				interaction_type: interactionType,
				interactor: interactorProfileId.id,
				post_id: postId,
			};

			const { data, error } = await supabaseClient
				.from<PostInteractionTable>("post_interaction")
				.upsert(interactionRow);

			if (error) throw error;
			if (!data || data.length === 0)
				throw new Error(
					`Upsert for contentInteraction on "${postId}" from "${interactor}" appears to have failed.`,
				);
			if (data.length > 1)
				throw new Error(
					`Upsert for contentInteraction on "${postId}" from "${interactor}" appears to have mutated ${data.length} rows. Expected (1)`,
				);
		} catch (error) {
			console.error(`Error in contentInteracted caught in try/catch`);
			console.error(error);
			throw error;
		}
	},
	licensePurchased: async (event: Extract<PostEvent, { event: "LicensePurchased" }>) => {
		try {
			const { amount, from, licenseType, postId, to } = event.returnValues;

			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const purchaseDate = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.unwrapOrElse(() => {
					throw new Error(
						`Could not parse purchaseDate for license for post "${postId}" by "${to}"`,
					);
				});

			const license: Omit<LicenseTable, "id"> = {
				license_type: licenseType,
				owner_address: to.toLowerCase(),
				post_id: postId,
				purchase_date: purchaseDate,
				purchase_price: amount,
			};

			const { data, error } = await supabaseClient
				.from<LicenseTable>("license")
				.insert(license);

			if (error) throw error;

			if (!data || data.length === 0)
				throw new Error(
					`It appears insert for license failed for post "${postId}" by "${to}"`,
				);
			if (data.length > 1)
				throw new Error(
					`Insert for post "${postId}" by "${to}" mutated "${data.length}" rows. Expected (1)`,
				);
		} catch (error) {
			console.error(`Error in licensePurchased caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	postCreated: async (event: Extract<PostEvent, { event: "PostCreated" }>) => {
		try {
			const { metadata, postID, profileID } = event.returnValues;

			const { timestamp } = await rpcClient.eth.getBlock(event.blockNumber);
			const createdAt = unixTimestamp
				.toDate(timestamp)
				.mapOk((date) => date.toISOString())
				.unwrapOrElse(() => {
					throw new Error(`Could not parsed createdAt for "${profileID}"`);
				});

			const parsedMetadata = JSON.parse(metadata) as
				| ImagePostMetadataSchema
				| ArticlePostMetadataSchema;

			const post = (
				await postParser({
					createdAt: createdAt,
					creatorId: profileID,
					data: parsedMetadata,
					postId: postID,
				})
			).unwrapOrElse((error) => {
				throw error;
			});

			const { data, error } = await supabaseClient.from<PostTable>("post").insert(post);

			if (error) throw error;

			if (!data || data.length === 0)
				throw new Error(`Post "${postID}" likely didn't write to cache.`);

			if (data.length > 1)
				throw new Error(`Multiple items returned for insert of post ${postID}`);
		} catch (error) {
			console.error(`Error in postCreated caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
	transfer: async (event: Extract<PostEvent, { event: "Transfer" }>) => {
		try {
			const { tokenId: id, to: owner } = event.returnValues;

			const { data, error } = await supabaseClient
				.from<PostTable>("post")
				.update({ owner: owner.toLowerCase() })
				.eq("id", id)
				.single();

			if (error) throw error;

			if (!data) throw new Error(`Transfer of post "${id}" likely didn't write to cache.`);
		} catch (error) {
			console.error(`Error in transfer caught in try/catch:`);
			console.error(error);
			throw error;
		}
	},
});
