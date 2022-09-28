import type { Application } from "express";
import {
	corsMiddleware,
	securityHeadersMiddleware,
	bodyParserMiddleware,
	errorLoggerMiddleware,
} from "@common/middleware";
import config from "@monitor/config";

const appLoader = (app: Application): Application => {
	// PREWARE
	app.use(corsMiddleware(config.cors.origins))
		.use(securityHeadersMiddleware)
		.use(bodyParserMiddleware);

	app.get(`${config.apiRoot}/health-status`, (request, response, next) => {
		response.status(200).json({ health_status: "OK" });
	});

	// POSTWARE
	app.use(errorLoggerMiddleware);

	// return app to make function chainable
	return app;
};

export default appLoader;
