import express = require("express");
import type { Server as HttpServer } from "node:http";
import { terminateServer } from "@common/utils/error-handling/terminate-server";
import config from "./config";
import appLoader from "./loaders/app.loader";
import { initRedis } from "./loaders/redis.loader";
import { initEventQueue } from "./loaders/queue.loader";
import { coreJobHandler, poolJobHandler, postJobHandler, rusdJobHandler } from "./job-handlers";

const startServer = async () => {
	const app = express();

	const redisConnection = await initRedis();
	if (!redisConnection) throw new Error("Redis failed to connect");

	const [coreQueue, postQueue, poolQueue, rusdQueue] = await Promise.all([
		initEventQueue("core", redisConnection, coreJobHandler),
		initEventQueue("post", redisConnection, postJobHandler),
		initEventQueue("pool", redisConnection, poolJobHandler),
		initEventQueue("rusd", redisConnection, rusdJobHandler),
	]);

	// await indexerLoader(eventQueue);

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
