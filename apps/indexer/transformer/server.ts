import express = require("express");
import type { Server as HttpServer } from "node:http";
import { terminateServer } from "@common/utils/error-handling/terminate-server";
import config from "./config";
import appLoader from "./loaders/app.loader";
import { initEventQueue } from "./loaders/queue.loader";
import {
	makeCoreJobHandler,
	makePoolJobHandler,
	makePostJobHandler,
	makeRusdJobHandler,
} from "./job-handlers";
import { initSupabase } from "./loaders/supabase.loader";

const startServer = async () => {
	const app = express();

	const supabaseClient = await initSupabase();

	const [coreQueue, postQueue, poolQueue, rusdQueue] = await Promise.all([
		initEventQueue("core", makeCoreJobHandler(supabaseClient)),
		initEventQueue("post", makePostJobHandler(supabaseClient)),
		initEventQueue("pool", makePoolJobHandler(supabaseClient)),
		initEventQueue("rusd", makeRusdJobHandler(supabaseClient)),
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
