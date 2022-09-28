import config from "@monitor/config";
import express = require("express");
import type { Server as HttpServer } from "node:http";
import { terminateServer } from "@common/utils/error-handling/terminate-server";
import appLoader from "@monitor/loaders/app.loader";
import { initRedis } from "./loaders/redis.loader";
import { initEventQueue } from "./loaders/queue.loader";
import type {
	CoreEvent,
	PoolEvent,
	PostEvent,
	RusdEvent,
} from "@repo/common/refound-contracts/event-types";
import { initPublisher, publishPastEvents } from "./indexer/publisher";

/* 
SERVER
*/

const startServer = async () => {
	const app = express();

	const redisConnection = await initRedis();
	if (!redisConnection) throw new Error("Redis failed to connect");

	const [coreQueue, postQueue, poolQueue, rusdQueue] = await Promise.all([
		initEventQueue<CoreEvent>("core", redisConnection),
		initEventQueue<PostEvent>("post", redisConnection),
		initEventQueue<PoolEvent>("pool", redisConnection),
		initEventQueue<RusdEvent>("rusd", redisConnection),
	]);

	/* 
	Load past events
	*/
	const corePastEvents = await publishPastEvents({
		contractAbi: config.contracts.core.abi,
		contractAddress: config.contracts.core.address,
		eventQueue: coreQueue,
		rpcEndpoint: config.celo.rpcEndpoint,
	});
	const postPastEvents = await publishPastEvents({
		contractAbi: config.contracts.post.abi,
		contractAddress: config.contracts.post.address,
		eventQueue: postQueue,
		rpcEndpoint: config.celo.rpcEndpoint,
	});
	const poolPastEvents = await publishPastEvents({
		contractAbi: config.contracts.pool.abi,
		contractAddress: config.contracts.pool.address,
		eventQueue: poolQueue,
		rpcEndpoint: config.celo.rpcEndpoint,
	});
	const rusdPastEvents = await publishPastEvents({
		contractAbi: config.contracts.rusd.abi,
		contractAddress: config.contracts.rusd.address,
		eventQueue: rusdQueue,
		rpcEndpoint: config.celo.rpcEndpoint,
	});

	/* 
	Listen for new events
	*/
	const coreIndexer = initPublisher({
		contractAbi: config.contracts.core.abi,
		contractAddress: config.contracts.core.address,
		eventQueue: coreQueue,
		websocketEndpoint: config.celo.websocketEndpoint,
	});
	const postIndexer = initPublisher({
		contractAbi: config.contracts.post.abi,
		contractAddress: config.contracts.post.address,
		eventQueue: postQueue,
		websocketEndpoint: config.celo.websocketEndpoint,
	});
	const poolIndexer = initPublisher({
		contractAbi: config.contracts.pool.abi,
		contractAddress: config.contracts.pool.address,
		eventQueue: poolQueue,
		websocketEndpoint: config.celo.websocketEndpoint,
	});
	const rusdIndexer = initPublisher({
		contractAbi: config.contracts.rusd.abi,
		contractAddress: config.contracts.rusd.address,
		eventQueue: rusdQueue,
		websocketEndpoint: config.celo.websocketEndpoint,
	});

	const server: HttpServer = appLoader(app).listen(config.port, () => {
		console.log(
			`
      ~~~
      👂 Server running :: ${config.host}:${config.port}
      ~~~
      `,
		);
	});

	const exitHandler = terminateServer(server);
	process
		.on("SIGINT", exitHandler(0, "SIGINT"))
		.on("SIGTERM", exitHandler(0, "SIGTERM"))
		.on("uncaughtException", exitHandler(1, "Unexpected Error"))
		.on("unhandledRejection", exitHandler(1, "💥💥💥 Unhandled Promise"));
};

startServer();
