import { sleep } from "@utils/sleep";
import config from "src/config";
import Web3 from "web3";

const watchedAddresses: Array<string> = [
	config.contracts.core.address,
	config.contracts.post.address,
	config.contracts.pool.address,
	config.contracts.rusd.address,
];
const topics: Array<null | string> = [];
let lastSeenBlock: null | number = null;

function setupProviderAndSubscriptions() {
	const provider = new Web3.providers.WebsocketProvider(config.celo.websocketEndpoint);
	const web3 = new Web3(provider);

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
			setupProviderAndSubscriptions();
		}
	};

	provider.on("error", async (error: any) => {
		console.log("WebsocketProvider encountered an error", error);
		await setupNewProviderAndSubs();
	});

	provider.on("end", async () => {
		console.log("WebsocketProvider has ended, will restart");
		await setupNewProviderAndSubs();
	});

	const headerSubscription = web3.eth.subscribe("newBlockHeaders");

	headerSubscription.on("data", function (blockHeader: any) {
		if (sequentialRetryCount > 0) {
			sequentialRetryCount = 0;
		}
		lastSeenBlock = blockHeader.number;
	});

	const eventSubscription = web3.eth.subscribe("logs", {
		address: watchedAddresses,
		fromBlock: lastSeenBlock,
		topics: topics,
	});

	eventSubscription.on("data", function (data: any) {
		console.log(data);
	});

	eventSubscription.on("error", async (error: any) => {
		console.log("Block header subscription encountered an error", error);
		await setupNewProviderAndSubs();
	});
}
