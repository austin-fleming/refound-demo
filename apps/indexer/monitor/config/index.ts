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
			? (process.env.MONITOR_PROD_HOST as string)
			: (process.env.MONITOR_DEV_HOST as string),
	port: process.env.MONITOR_PORT,
};
