import express = require("express");
import type { Server as HttpServer } from "node:http";
import { terminateServer } from "@common/utils/error-handling/terminate-server";
import config from "./config";
import appLoader from "./loaders/app.loader";
import { Worker } from "bullmq";

const contractEventWorker = new Worker(
	"contract-events",
	async (job) => {
		console.log({ "received job:": { job } });
	},
	{
		connection: {
			host: config.contractEventQueue.redisHost,
			port: config.contractEventQueue.redisPort,
		},
	},
);

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
	});

	const exitHandler = terminateServer(server);
	process
		.on("SIGINT", exitHandler(0, "SIGINT"))
		.on("SIGTERM", exitHandler(0, "SIGTERM"))
		.on("uncaughtException", exitHandler(1, "Unexpected Error"))
		.on("unhandledRejection", exitHandler(1, "💥💥💥 Unhandled Promise"));
};

startServer();
