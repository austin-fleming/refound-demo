/* eslint-disable sort-keys-fix/sort-keys-fix, sort-keys */
import * as coreArtifacts from "./contracts/Refound.sol/Refound.json";
import * as postArtifacts from "./contracts/RefoundPost.sol/RefoundPost.json";
import * as poolArtifacts from "./contracts/FundingPool.sol/FundingPool.json";
import * as rusdArtifacts from "./contracts/RefoundUSD.sol/RefoundUSD.json";
import * as fusdcArtifacts from "./contracts/FakeUSDC.sol/fakeUSDC.json";
import type { AbiItem } from "web3-utils";

export const contractConfig = {
	core: {
		abi: coreArtifacts.abi as AbiItem[],
		address: "0x4369537Fd031f0934db8613Fcb2B40CB89aDF55A",
	},
	post: {
		abi: postArtifacts.abi as AbiItem[],
		address: "0xf14977bFe94EeEc8d130eba413E941B9637Fb10e",
	},
	pool: {
		abi: poolArtifacts.abi as AbiItem[],
		address: "0x0A78b1EdC257158394A0424Ed89B8DC3f5693600",
	},
	rusd: {
		abi: rusdArtifacts.abi as AbiItem[],
		address: "0xCcc26609a3a893a0294d14430121bAc57eEF942b",
	},
	fusdc: {
		abi: fusdcArtifacts.abi as AbiItem[],
		address: "0x05cE1fAE8Fb5275CC0258c990FB2E97Adf77A5AA",
	},
};
