import config from "@common/config";
import IoRedis from "ioredis";

export const initRedis = async () => {
	try {
		return new IoRedis({
			host: config.contractEventQueue.redisHost,
			port: config.contractEventQueue.redisPort,
		})
			.on("error", (error) => {
				console.error("Something went wrong with redis connection:", error);
			})
			.on("exit", () => {
				console.log("exiting redis");
			});
	} catch (error) {
		console.error("error in initRedis caught in try/catch:", error);
		return;
	}
};
