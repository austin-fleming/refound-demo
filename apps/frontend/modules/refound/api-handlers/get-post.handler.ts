import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import { isString } from "@utils/data-helpers/is-string";
import { queries } from "../repo/refound-post-contract.repo";
import type { Post } from "../models/post.model";

// Get user by wallet address
export async function getPostHandler(req: NextApiRequest, res: NextApiResponse<Post>) {
	const { postId, requester } = req.query;

	if (!isString(postId) || !postId) return res.status(400).end();
	if (!isString(requester) || !requester) return res.status(403).end();

	const web3 = new Web3(config.contracts.rpcUrl);
	const contract = new web3.eth.Contract(
		config.contracts.refound.abi,
		config.contracts.refound.address,
	);

	return (await queries.getPost(contract, postId)).match({
		ok: (post) => {
			res.status(200).json(post);
		},
		fail: (err) => {
			console.error(err);
			res.status(404).end();
		},
	});
}
