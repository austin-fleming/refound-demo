import commonConfig from "@common/config";
import "dotenv/config";

export default {
	...commonConfig,
	apiRoot: "/api/v1",
	cors: {
		origins: ["*"],
	},
	host:
		process.env.NODE_ENV === "production"
			? (process.env.TRANSFORMER_PROD_HOST as string)
			: (process.env.TRANSFORMER_DEV_HOST as string),
	port: process.env.TRANSFORMER_PORT,
};
