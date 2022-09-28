import { sleep } from "@repo/common/utils/control-flow";
import Web3 from "web3";
import type { Queue } from "bullmq";
import type { AbiItem } from "web3-utils";
import type { EventData } from "web3-eth-contract";

const formatEventDataForQueue = (eventData: EventData) => ({
	data: eventData,
	jobId: `${eventData.transactionHash}-${eventData.logIndex}`,
	name: eventData.event,
});

export const publishPastEvents = async ({
	contractAbi,
	contractAddress,
	rpcEndpoint,
	eventQueue,
}: {
	contractAbi: AbiItem[];
	contractAddress: string;
	eventQueue: Queue;
	rpcEndpoint: string;
}): Promise<boolean> => {
	console.log(`> publishing past events for "${contractAddress}"`);

	const provider = new Web3.providers.HttpProvider(rpcEndpoint);
	const web3 = new Web3(provider);
	const contract = new web3.eth.Contract(contractAbi, contractAddress);

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

	if (!events) return false;

	const jobs = await eventQueue.addBulk(events.map(formatEventDataForQueue));

	console.log("< done");
	return true;
};

// move startPublisher into this and rename to start publisher
export const initPublisher = ({
	eventQueue,
	contractAbi,
	contractAddress,
	websocketEndpoint,
}: {
	contractAbi: AbiItem[];
	contractAddress: string;
	eventQueue: Queue;
	websocketEndpoint: string;
}) => {
	// Do I want this?
	let lastSeenBlock: null | number = null;

	const startPublisher = () => {
		let setupNewProvider = false;
		// Keeps track of the number of times we've retried to set up a new provider
		// and subs without a successful header
		let sequentialRetryCount = 0;

		const setupNewProviderAndSubs = async () => {
			// To prevent us from retrying too aggressively, wait a little if
			// we try setting up multiple times in a row
			const sleepTimeMs = sequentialRetryCount * 100;
			console.log("sleeping", sleepTimeMs);
			await sleep(sleepTimeMs);
			sequentialRetryCount++;
			// To avoid a situation where multiple error events are triggered
			if (!setupNewProvider) {
				setupNewProvider = true;
				startPublisher();
			}
		};

		const provider = new Web3.providers.WebsocketProvider(websocketEndpoint);
		const web3 = new Web3(provider);
		const contract = new web3.eth.Contract(contractAbi, contractAddress);

		// @ts-expect-error: need to await, but isn't typed for an async callback
		provider.on("error", async (error) => {
			console.log("WebsocketProvider encountered an error", error);
			await setupNewProviderAndSubs();
		});
		provider.on("end", async () => {
			console.log("WebsocketProvider has ended, will restart");
			await setupNewProviderAndSubs();
		});

		web3.eth.subscribe("newBlockHeaders").on("data", function (blockHeader) {
			if (sequentialRetryCount > 0) {
				sequentialRetryCount = 0;
			}
			lastSeenBlock = blockHeader.number;
		});

		const contractEventListener = contract.events.allEvents(
			{
				fromBlock: lastSeenBlock,
			},
			(error: unknown, event: EventData) => {
				if (error as unknown) console.error(error);
				if (event) console.log(event);
			},
		);

		contractEventListener
			.on("connected", (subscriptionId: string) => {
				console.log(
					`Subscription "${subscriptionId}" established for contract "${contract.options.address}"`,
				);
			})
			.on("data", (eventData: EventData) => {
				const jobData = formatEventDataForQueue(eventData);
				eventQueue.add(jobData.name, jobData.data, { jobId: jobData.jobId });
			})
			.on("error", async (error: unknown) => {
				console.error(
					`Error occurred in allEvents listener for contract: "${contract.options.address}": error`,
				);
				console.error(error);
				contractEventListener.unsubscribe();

				await setupNewProviderAndSubs();
			});
	};

	startPublisher();
};
