import type { AbiItem } from "web3-utils";
import refoundCoreContract from "./contracts/Refound.sol/Refound.json";
import refoundPostContract from "./contracts/RefoundPost.sol/RefoundPost.json";
import refoundPoolContract from "./contracts/FundingPool.sol/FundingPool.json";
import refoundRusdContract from "./contracts/RefoundUSD.sol/RefoundUSD.json";
import refoundFakeUsdcContract from "./contracts/FakeUSDC.sol/fakeUSDC.json";

export const config = {
	contracts: {
		rpcUrl: "https://alfajores-forno.celo-testnet.org",
		chainId: 44787,
		coreContract: {
			address: process.env.NEXT_PUBLIC_REFOUNDCONTRACT_CORE as string,
			abi: refoundCoreContract.abi as AbiItem[],
		},
		postContract: {
			address: process.env.NEXT_PUBLIC_REFOUNDCONTRACT_POST as string,
			abi: refoundPostContract.abi as AbiItem[],
		},
		poolContract: {
			address: process.env.NEXT_PUBLIC_REFOUNDCONTRACT_POOL as string,
			abi: refoundPoolContract.abi as AbiItem[],
		},
		refoundUsdContract: {
			address: process.env.NEXT_PUBLIC_REFOUNDCONTRACT_RUSD as string,
			abi: refoundRusdContract.abi as AbiItem[],
		},
		fakeUsdcContract: {
			address: process.env.NEXT_PUBLIC_REFOUNDCONTRACT_FUSDC as string,
			abi: refoundFakeUsdcContract.abi as AbiItem[],
		},
	},
	storage: {
		web3storage: {
			apiToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN as string,
			maxRetries: 5,
		},
	},
} as const;
