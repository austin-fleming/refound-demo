/* eslint-disable sort-keys-fix/sort-keys-fix, sort-keys */
import coreArtifacts from "./contracts/Refound.sol/Refound.json";
import postArtifacts from "./contracts/RefoundPost.sol/RefoundPost.json";
import poolArtifacts from "./contracts/FundingPool.sol/FundingPool.json";
import rusdArtifacts from "./contracts/RefoundUSD.sol/RefoundUSD.json";
import fusdcArtifacts from "./contracts/FakeUSDC.sol/fakeUSDC.json";
import type { AbiItem } from "web3-utils";

export const contractConfig = {
	core: {
		abi: coreArtifacts.abi as AbiItem[],
		address: "0x690E4af747596d839d09265af443bff8f56b2998",
	},
	post: {
		abi: postArtifacts.abi as AbiItem[],
		address: "0x27c71A5225c1CaFe71437d91099000CC762c8b92",
	},
	pool: {
		abi: poolArtifacts.abi as AbiItem[],
		address: "0x123a46fBFb69F8DC145c127Dfa924053125Ebbbd",
	},
	rusd: {
		abi: rusdArtifacts.abi as AbiItem[],
		address: "0x4181162C17A897812E5a319AD3888286B97650b5",
	},
	fusdc: {
		abi: fusdcArtifacts.abi as AbiItem[],
		address: "0x617D7B58813269a4DB9ae6e0bb6c680681294270",
	},
};
