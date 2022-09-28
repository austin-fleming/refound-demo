/* eslint-disable sort-keys-fix/sort-keys-fix, sort-keys */
import "dotenv/config";
import { contractConfig } from "@repo/common/refound-contracts/contract-config";

export default {
	celo: {
		rpcEndpoint: process.env.CELO_NODE_RPC_ENDPOINT as string,
		websocketEndpoint: process.env.CELO_NODE_WEBSOCKET_ENDPOINT as string,
	},
	contractEventQueue: {
		/* redisHost:
			process.env.NODE_ENV === "production"
				? (process.env.REDIS_PROD_HOST as string)
				: (process.env.REDIS_DEV_HOST as string),
		redisPort: Number.parseInt(process.env.REDIS_PORT as string), */
		redis: {
			/* host: process.env.REDIS_PROD_HOST as string,
			port: Number.parseInt(process.env.REDIS_PROD_PORT as string),
			username: process.env.REDIS_PROD_USERNAME as string,
			password: process.env.REDIS_PROD_PASSWORD as string, */
			connectionString: process.env.REDIS_PROD_DIGITALOCEAN as string,
		},
	},
	contracts: contractConfig,
	web3Storage: {
		token: process.env.WEB3_STORAGE_API_TOKEN as string,
	},
	supabase: {
		url: process.env.POSTGREST_URL as string,
		token: process.env.POSTGREST_SERVICE_ROLE as string,
	},
};
