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
			address: "0xb731F5D97116852786F39B41D30735f7a704c6eB",
			abi: refoundCoreContract.abi as AbiItem[],
		},
		postContract: {
			address: "0x8031088b6d5069A7295a91a69C2bdE0F7b04fd65",
			abi: refoundPostContract.abi as AbiItem[],
		},
		poolContract: {
			address: "0x6A83d1818b18706E25D2500D4A284315D1A323Ae",
			abi: refoundPoolContract.abi as AbiItem[],
		},
		refoundUsdContract: {
			address: "0x2909663198b9939A291280F36A4a532D79B6078A",
			abi: refoundRusdContract.abi as AbiItem[],
		},
		fakeUsdcContract: {
			address: "0x704F43c8C3E7E7B19C37F7E83176c2fD207078A3",
			abi: refoundFakeUsdcContract.abi as AbiItem[],
		},
	},
	storage: {
		web3storage: {
			apiToken:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZiMEVjRTFFMjBFMjgwZmFBNWUxMTQ5QTI0MDhkMjU0RjQ1MDVFQ2UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4NjgxNDc4ODksIm5hbWUiOiJSZWZvdW5kV2ViM1N0b3JhZ2UifQ.CYS2krAPhgwEn5SP9lWh-kMtxiClr8Vdm6wu_eUaFr8",
			maxRetries: 5,
		},
	},
} as const;
