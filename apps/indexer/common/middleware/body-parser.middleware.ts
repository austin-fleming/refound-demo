import express = require("express");
import type { RequestHandler } from "express";

const bodyParser: RequestHandler = (request, response, next) =>
  express.json()(request, response, next);

export default bodyParser;
