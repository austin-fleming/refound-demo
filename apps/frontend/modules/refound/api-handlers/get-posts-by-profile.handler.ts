import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import { isString } from "@utils/data-helpers/is-string";
import { queries as refoundPostQueries } from "../repo/refound-post-contract.repo";
import { queries as refoundQueries } from "../repo/refound-contract.repo";
import type { PostAggregate } from "../models/post.aggregate";

// Get posts created by wallet address
export async function getPostsByProfileHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostAggregate[]>,
) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	try {
		const { profileAddress, requester } = req.query;

		console.log({ getPostsByProfileHandler: { profileAddress, requester } });

		if (!isString(profileAddress) || !profileAddress) return res.status(400).end();
		if (!isString(requester) || !requester) return res.status(403).end();

		const web3 = new Web3(config.contracts.rpcUrl);
		const contract = new web3.eth.Contract(
			config.contracts.coreContract.abi,
			config.contracts.coreContract.address,
		);
		const postContract = new web3.eth.Contract(
			config.contracts.postContract.abi,
			config.contracts.postContract.address,
		);

		const profile = (
			await refoundQueries.getProfileByAddress(contract, profileAddress)
		).unwrapOrElse((err) => {
			throw err;
		});

		const posts = (
			await refoundPostQueries.getPostsByProfile(postContract, profile.profileId)
		).unwrapOrElse((err) => {
			throw err;
		});

		return res.status(200).json(posts);
	} catch (err) {
		console.error(err);
		return res.status(404).end();
	}
}
