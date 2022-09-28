import { Worker } from "bullmq";
import type { Job } from "bullmq";
import type { EventData } from "web3-eth-contract";
import { initRedis } from "./redis.loader";

export const initEventQueue = async <EventType = EventData>(
	queueName: string,
	jobHandler: (job: Job<EventType>) => Promise<void>,
) => {
	try {
		const redisConnection = await initRedis();
		if (!redisConnection) throw new Error("Redis failed to connect");

		console.log(`Worker for "${queueName}" created.`);

		return new Worker<EventType>(queueName, jobHandler, {
			connection: redisConnection,
		}).on("error", (error) => {
			console.error("Worker threw error:", error);
		});
	} catch (error) {
		console.error("error caught in initEventQueue try/catch:", error);
		return;
	}
};
