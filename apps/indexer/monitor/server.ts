import { sleep } from "@common/utils/sleep";
import config from "@monitor/config";
import Web3 from "web3";
import express = require("express");
import type { Server as HttpServer } from "node:http";
import { terminateServer } from "@common/utils/error-handling/terminate-server";
import appLoader from "@monitor/loaders/app.loader";
import { Queue } from "bullmq";
import IORedis from "ioredis";

const watchedAddresses: Array<string> = [
	config.contracts.core.address,
	config.contracts.post.address,
	config.contracts.pool.address,
	config.contracts.rusd.address,
];
let lastSeenBlock: null | number = null;

function setupProviderAndSubscriptions(eventQueue: Queue) {
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
			setupProviderAndSubscriptions(eventQueue);
		}
	};

	const provider = new Web3.providers.WebsocketProvider(config.celo.websocketEndpoint);
	const web3 = new Web3(provider);

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

	web3.eth
		.subscribe("logs", {
			address: watchedAddresses,
			fromBlock: lastSeenBlock,
			topics: [],
		})
		.on("data", (log) => {
			console.log("New Event:");
			console.log(log);
			eventQueue.add("contractEvent", log, {
				jobId: log.transactionHash,
			});
		})
		.on("error", async (error: any) => {
			console.log("Block header subscription encountered an error", error);
			await setupNewProviderAndSubs();
		});
}

/* 
SERVER
*/

const startServer = () => {
	const app = express();

	const server: HttpServer = appLoader(app).listen(config.port, () => {
		console.log(
			`
      ~~~
      👂 Server running :: ${config.host}:${config.port}
      ~~~
      `,
		);

		const contractEventQueue = new Queue("contract-events", {
			connection: new IORedis({
				host: config.contractEventQueue.redisHost,
				port: config.contractEventQueue.redisPort,
			}),
		});

		const provider = new Web3(config.celo.rpcEndpoint);
		const coreContract = new provider.eth.Contract(
			config.contracts.core.abi,
			config.contracts.core.address,
		);
		coreContract.getPastEvents("allEvents", { fromBlock: "earliest" }, (error, events) => {
			if (error) {
				console.error(error);
				return;
			}

			console.log({ events });
			console.log(events[5].returnValues);

			events.map((event) => {
				contractEventQueue.add("event", event, {
					jobId: `${event.transactionHash}-${event.logIndex}`,
				});
			});
		});

		setupProviderAndSubscriptions(contractEventQueue);
	});

	const exitHandler = terminateServer(server);
	process
		.on("SIGINT", exitHandler(0, "SIGINT"))
		.on("SIGTERM", exitHandler(0, "SIGTERM"))
		.on("uncaughtException", exitHandler(1, "Unexpected Error"))
		.on("unhandledRejection", exitHandler(1, "💥💥💥 Unhandled Promise"));
};

startServer();
