import { Queue } from "bullmq";
import type IoRedis from "ioredis";

export const initEventQueue = async (redis: IoRedis) => {
	try {
		return new Queue("event-queue", {
			connection: redis,
		});
	} catch (error) {
		console.error("error caught in initEventQueue try/catch:", error);
		return;
	}
};
