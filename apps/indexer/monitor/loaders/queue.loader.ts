import { Queue } from "bullmq";
import type IoRedis from "ioredis";
import type { EventData } from "web3-eth-contract";

export const initEventQueue = async <QueueDataType = EventData>(
	queueName: string,
	redis: IoRedis,
) => {
	return new Queue<QueueDataType>(queueName, {
		connection: redis,
		defaultJobOptions: {
			removeOnComplete: false,
			removeOnFail: 1000,
		},
	});
};
