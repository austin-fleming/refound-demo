import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import type { Profile } from "@modules/refound/models/profile.model";
import { queries } from "../../repo/refound-core-contract.repo";
import { initSupabase } from "@modules/shared/repo/cache/init-supabase";

/* 
TODO: paginate
*/

// Get all profiles
export async function getProfilesHandler(req: NextApiRequest, res: NextApiResponse<Profile[]>) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	const { requester } = req.query;

	const cacheClient = initSupabase();

	const { data, error } = await cacheClient
		.from<{
			id: number;
			walletAddress: string;
			username: string;
			joinedOn: string;
			bio?: string;
			avatarUrl?: string;
		}>("profile")
		.select("*");

	if (error) {
		console.error(error);
		return res.status(500).end();
	}

	return res.status(200).json(data);
}
