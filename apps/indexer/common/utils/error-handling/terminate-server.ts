import type { Server as HttpServer } from "node:http";

/* 

let ONLINE = true;

app.get(`${API_ROOT}/ping`, (request, response, next) => {
  ONLINE
    ? response.status(200).json({ status: "OK" })
    : response.status(503).json({ status: "Server shutting down." });
});


const gracefulShutdownHandler = (signal: NodeJS.Signals) => {
  ONLINE = false;

  console.log(
    `Process ${process.pid} received a ${signal} signal. Performing graceful shutdown.`
  );
  setTimeout(() => {
    console.log("Shutting down server.");
    server.close(() => {
      console.log("All requests stopped.");
      process.exit();
    });
  }, 0);
}; */

type TerminateServerOptions = { coredump?: boolean; timeout?: number };
export const terminateServer = (
  server: HttpServer,
  options: TerminateServerOptions = {}
) => {
  const { coredump, timeout } = { coredump: false, timeout: 500, ...options };

  /* eslint-disable unicorn/no-process-exit */
  const exit = (code: number) => () =>
    coredump ? process.abort() : process.exit(code);
  /* eslint-enable unicorn/no-process-exit */

  return (code: number, reason: string) => (error: Error) => {
    console.log(
      `\n${reason} detected :: ${
        code === 0 ? "Shutting down" : "Aborting"
      } server`
    );

    // TODO: needs to catch other error types that will be added
    if (error && error instanceof Error) {
      // TODO: needs logging library
      console.log(error.message, error.stack);
    }

    const exitWithCode = exit(code);

    server.close(exitWithCode);
    setTimeout(exitWithCode, timeout).unref();
  };
};
