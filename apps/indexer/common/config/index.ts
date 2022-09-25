/* eslint-disable sort-keys-fix/sort-keys-fix, sort-keys */
import "dotenv/config";
import type { AbiItem } from "web3-utils";
import * as coreArtifacts from "./contracts/Refound.sol/Refound.json";
import * as postArtifacts from "./contracts/RefoundPost.sol/RefoundPost.json";
import * as poolArtifacts from "./contracts/FundingPool.sol/FundingPool.json";
import * as rusdArtifacts from "./contracts/RefoundUSD.sol/RefoundUSD.json";
import * as fusdcArtifacts from "./contracts/FakeUSDC.sol/fakeUSDC.json";

export default {
	celo: {
		rpcEndpoint: process.env.CELO_NODE_RPC_ENDPOINT as string,
		websocketEndpoint: process.env.CELO_NODE_WEBSOCKET_ENDPOINT as string,
	},
	contractEventQueue: {
		redisHost:
			process.env.NODE_ENV === "production"
				? (process.env.REDIS_PROD_HOST as string)
				: (process.env.REDIS_DEV_HOST as string),
		redisPort: Number.parseInt(process.env.REDIS_PORT as string),
	},
	contracts: {
		core: {
			abi: coreArtifacts.abi as AbiItem[],
			address: process.env.REFOUNDCONTRACT_CORE as string,
		},
		post: {
			abi: postArtifacts.abi as AbiItem[],
			address: process.env.REFOUNDCONTRACT_POST as string,
		},
		pool: {
			abi: poolArtifacts.abi as AbiItem[],
			address: process.env.REFOUNDCONTRACT_POOL as string,
		},
		rusd: {
			abi: rusdArtifacts.abi as AbiItem[],
			address: process.env.REFOUNDCONTRACT_RUSD as string,
		},
		fusdc: {
			abi: fusdcArtifacts.abi as AbiItem[],
			address: process.env.REFOUNDCONTRACT_FUSDC as string,
		},
	},
	web3Storage: {
		token: process.env.WEB3_STORAGE_API_TOKEN as string,
	},
};
