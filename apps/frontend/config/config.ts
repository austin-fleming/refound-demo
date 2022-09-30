import { contractConfig } from "@repo/common/refound-contracts/contract-config";

export const config = {
	celo: {
		rpcEndpoint: process.env.CELO_NODE_RPC_ENDPOINT as string,
		websocketEndpoint: process.env.CELO_NODE_WEBSOCKET_ENDPOINT as string,
		chainId: 44787,
	},
	contracts: contractConfig,
	web3storage: {
		token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN as string,
		maxRetries: 5,
	},
	supabase: {
		publicToken: process.env.NEXT_PUBLIC_SUPABASE_ANON_PUBLIC as string,
		url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	},
	site: {
		content: {
			defaultResultCount: 10,
		},
	},
} as const;
