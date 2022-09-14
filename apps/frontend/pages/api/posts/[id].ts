// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { config } from "config/config";
import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";

type Data = {
	name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id } = req.query;

	const web3 = new Web3(config.contracts.rpcUrl);

	const refoundContract = new web3.eth.Contract(
		config.contracts.refound.abi,
		config.contracts.refound.address,
	);
}
