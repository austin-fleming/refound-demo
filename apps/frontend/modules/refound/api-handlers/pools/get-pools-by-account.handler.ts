import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import { isString } from "@utils/data-helpers/is-string";
import { queries as poolQueries } from "../../repo/refound-pool-contract.repo";
import type { PoolAggregate } from "@modules/refound/models/pool.aggregate";

export async function getPoolsByAccountHandler(
	req: NextApiRequest,
	res: NextApiResponse<PoolAggregate[]>,
) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { accountAddress, requester } = req.query;

	if (!isString(accountAddress) || !accountAddress) return res.status(400).end();
	// if (!isString(requester) || !requester) return res.status(403).end();

	const web3 = new Web3(config.contracts.rpcUrl);
	const coreContract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);
	const poolContract = new web3.eth.Contract(
		config.contracts.postContract.abi,
		config.contracts.postContract.address,
	);

	return (await poolQueries.getPoolsByOwner(coreContract, poolContract, accountAddress)).match({
		ok: (pools) => res.status(200).json(pools),
		fail: (err) => {
			console.error(err);
			return res.status(404).end();
		},
	});
}
