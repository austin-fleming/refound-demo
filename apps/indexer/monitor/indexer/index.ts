import type { Contract, EventData } from "web3-eth-contract";
import type { Log } from "web3-core";
import type { Queue } from "bullmq";
import Web3 from "web3";
import config from "@common/config";

const formatEventDataForQueue = (eventData: EventData) => ({
	data: eventData,
	jobId: `${eventData.transactionHash}-${eventData.logIndex}`,
	name: eventData.event,
});

export const publishPastEvents = async (contract: Contract, queue: Queue) => {
	console.log(`> publishing past events for "${contract.options.address}"`);

	const events = await contract
		.getPastEvents("allEvents", {
			fromBlock: "earliest",
			toBlock: "latest",
		})
		.then((logs) => {
			console.log({ logs });

			return logs;
		})
		.catch((error) => {
			console.error(error);
		});

	if (!events) return;

	const jobs = await queue.addBulk(events.map(formatEventDataForQueue));

	console.log("< done");
};

export const startPublisher = async (contract: Contract, queue: Queue) => {
	console.log(`> starting contract events listener for "${contract.options.address}"`);

	contract.events
		.allEvents(
			{
				fromBlock: "earliest",
			},
			(error: unknown, event: EventData) => {
				if (error as unknown) console.error(error);
				if (event) console.log(event);
			},
		)
		.on("connected", (subscriptionId: string) => {
			console.log(
				`Subscription "${subscriptionId}" established for contract "${contract.options.address}"`,
			);
		})
		.on("data", (eventData: EventData) => {
			const jobData = formatEventDataForQueue(eventData);
			queue.add(jobData.name, jobData.data, { jobId: jobData.jobId });
		})
		.on("error", (error: unknown) => {
			console.error(
				`Error occurred in allEvents listener for contract: ${contract.options.address}`,
			);
			console.error(error);
		});
};
