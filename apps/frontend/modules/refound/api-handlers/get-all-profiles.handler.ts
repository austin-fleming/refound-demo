import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import type { Profile } from "@modules/refound/models/profile.model";
import { isString } from "@utils/data-helpers/is-string";
import { queries } from "../repo/refound-contract.repo";

// Get all profiles
export async function getAllProfilesHandler(req: NextApiRequest, res: NextApiResponse<Profile[]>) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	const { requester } = req.query;

	if (!isString(requester) || !requester) return res.status(403).end();

	const web3 = new Web3(config.contracts.rpcUrl);
	const contract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);

	return (await queries.getAllProfiles(contract)).match({
		ok: (profiles) => {
			res.status(200).json(profiles);
		},
		fail: (err) => {
			console.error(err);
			res.status(404).end();
		},
	});
}
