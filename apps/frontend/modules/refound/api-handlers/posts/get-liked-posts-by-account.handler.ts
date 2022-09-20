import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import { isString } from "@utils/data-helpers/is-string";
import { queries } from "../../repo/refound-post-contract.repo";
import type { PostAggregate } from "@modules/refound/models/post.aggregate";

// Get user by wallet address
export async function getLikedPostsByAccountHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostAggregate[]>,
) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	const { accountAddress, requester } = req.query;

	console.log({ getLikedPostsByAccountHandler: { accountAddress, requester } });

	if (!isString(accountAddress) || !accountAddress) return res.status(400).end();
	// if (!isString(requester) || !requester) return res.status(403).end();

	const web3 = new Web3(config.contracts.rpcUrl);
	const coreContract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);
	const postContract = new web3.eth.Contract(
		config.contracts.postContract.abi,
		config.contracts.postContract.address,
	);

	return (await queries.getLikedPostsByAccount(coreContract, postContract, accountAddress)).match(
		{
			ok: (posts) => {
				console.log({ likePosts: posts });
				res.status(200).json(posts);
			},
			fail: (err) => {
				console.error(err);
				res.status(404).end();
			},
		},
	);
}
