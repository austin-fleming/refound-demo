import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import type { Profile } from "@modules/refound/models/profile.model";
import { isString } from "@utils/data-helpers/is-string";
import { queries } from "../../repo/refound-core-contract.repo";

// Get user by wallet address
export async function getProfileByAccountHandler(
	req: NextApiRequest,
	res: NextApiResponse<Profile>,
) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	const { accountAddress, requester } = req.query;

	if (!isString(accountAddress) || !accountAddress) return res.status(400).end();
	// if (!isString(requester) || !requester) return res.status(403).end();

	const web3 = new Web3(config.contracts.rpcUrl);
	const contract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);

	return (await queries.getProfileByAddress(contract, accountAddress)).match({
		ok: (profile) => {
			console.log({ profileRoute: profile });
			res.status(200).json(profile);
		},
		fail: (err) => {
			console.error(err);
			res.status(404).end();
		},
	});
}
