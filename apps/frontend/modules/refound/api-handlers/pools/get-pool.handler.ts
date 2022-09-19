import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "config/config";
import Web3 from "web3";
import { isString } from "@utils/data-helpers/is-string";
import { queries } from "../../repo/refound-pool-contract.repo";
import type { PoolAggregate } from "@modules/refound/models/pool.aggregate";

export async function getPoolHandler(req: NextApiRequest, res: NextApiResponse<PoolAggregate>) {
	res.setHeader("Cache-Control", `s-maxage=5, stale-while-revalidate`);
	const { poolId, requester } = req.query;

	if (!isString(poolId) || !poolId) return res.status(400).end();
	// if (!isString(requester) || !requester) return res.status(403).end();

	const web3 = new Web3(config.contracts.rpcUrl);
	const coreContract = new web3.eth.Contract(
		config.contracts.coreContract.abi,
		config.contracts.coreContract.address,
	);
	const poolContract = new web3.eth.Contract(
		config.contracts.poolContract.abi,
		config.contracts.poolContract.address,
	);

	return (await queries.getPool(coreContract, poolContract, poolId)).match({
		ok: (pool) => {
			res.status(200).json(pool);
		},
		fail: (err) => {
			console.error(err);
			res.status(404).end();
		},
	});
}
