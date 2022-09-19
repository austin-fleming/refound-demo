import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import { isString } from "@utils/data-helpers/is-string";
import { queries as refoundPostQueries } from "../../repo/refound-post-contract.repo";
import { queries as refoundQueries } from "../../repo/refound-core-contract.repo";
import type { ArticlePostAggregate } from "../../models/post.aggregate";

// Get posts created by wallet address
export async function getArticlePostsByUsernameHandler(
	req: NextApiRequest,
	res: NextApiResponse<ArticlePostAggregate[]>,
) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	try {
		const { username, requester } = req.query;

		console.log({ getPostsByProfileHandler: { username, requester } });

		if (!isString(username) || !username) return res.status(400).end();
		// if (!isString(requester) || !requester) return res.status(403).end();

		const web3 = new Web3(config.contracts.rpcUrl);
		const baseContract = new web3.eth.Contract(
			config.contracts.coreContract.abi,
			config.contracts.coreContract.address,
		);
		const postContract = new web3.eth.Contract(
			config.contracts.postContract.abi,
			config.contracts.postContract.address,
		);

		const profile = (
			await refoundQueries.getProfileByUsername(baseContract, username)
		).unwrapOrElse((err) => {
			throw err;
		});

		console.log({ getPostsByProfileHandler: { profile } });

		const posts = (
			await refoundPostQueries.getArticlePostsByOwner(
				baseContract,
				postContract,
				profile.address,
			)
		).unwrapOrElse((err) => {
			throw err;
		});

		return res.status(200).json(posts);
	} catch (err) {
		console.error(err);
		return res.status(404).end();
	}
}
