import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import { queries } from "../../repo/refound-post-contract.repo";
import type { ImagePostAggregate } from "../../models/post.aggregate";

export async function getImagePostsHandler(
	req: NextApiRequest,
	res: NextApiResponse<ImagePostAggregate[]>,
) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	const { requester } = req.query;
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

	return (await queries.getAllImagePosts(coreContract, postContract)).match({
		ok: (posts) => {
			res.status(200).json(posts);
		},
		fail: (err) => {
			console.error(err);
			res.status(404).end();
		},
	});
}
