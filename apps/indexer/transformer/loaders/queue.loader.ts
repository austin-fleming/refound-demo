import config from "@transformer/config";
import { Worker } from "bullmq";
import type { Job } from "bullmq";
import type IoRedis from "ioredis";
import type { EventData } from "web3-eth-contract";

export const initEventQueue = async <EventType = EventData>(
	queueName: string,
	redis: IoRedis,
	jobHandler: (job: Job<EventType>) => Promise<void>,
) => {
	try {
		return new Worker<EventType>(queueName, jobHandler, {
			connection: redis,
		}).on("error", (error) => {
			console.error("Worker threw error:", error);
		});
	} catch (error) {
		console.error("error caught in initEventQueue try/catch:", error);
		return;
	}
};
