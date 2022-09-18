import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import { isString } from "@utils/data-helpers/is-string";
import { queries } from "../repo/refound-post-contract.repo";
import type { PostAggregate } from "../models/post.aggregate";

// Get all posts
export async function getAllPostsHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostAggregate[]>,
) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	const { requester } = req.query;

	if (!isString(requester) || !requester) return res.status(403).end();

	const web3 = new Web3(config.contracts.rpcUrl);
	const contract = new web3.eth.Contract(
		config.contracts.postContract.abi,
		config.contracts.postContract.address,
	);

	return (await queries.getAllPosts(contract)).match({
		ok: (posts) => {
			res.status(200).json(posts);
		},
		fail: (err) => {
			console.error(err);
			res.status(404).end();
		},
	});
}
