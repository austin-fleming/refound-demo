import { refoundPostAbi } from "contracts/refound-post.abi";
import { refoundAbi } from "contracts/refound.abi";

export const config = {
	contracts: {
		rpcUrl: "https://alfajores-forno.celo-testnet.org",
		chainId: 44787,
		refound: {
			address: process.env.NEXT_PUBLIC_REFOUND_CONTRACT_ADDRESS as string,
			abi: refoundAbi,
		},
		refoundPost: {
			address: process.env.NEXT_PUBLIC_REFOUNDPOST_CONTRACT_ADDRESS as string,
			abi: refoundPostAbi,
		},
	},
	storage: {
		web3storage: {
			apiToken: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN as string,
			maxRetries: 5,
		},
	},
} as const;
