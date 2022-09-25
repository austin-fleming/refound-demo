import type { ErrorRequestHandler } from "express";

const errorLogger: ErrorRequestHandler = (error, request, response, next) => {
  console.error("\n\n---", "Error logger:\n", error, "\n\n---");
  next(error);
};

export default errorLogger;
