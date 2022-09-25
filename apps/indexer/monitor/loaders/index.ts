import type { Application } from "express";
import { initEventQueue } from "./queue.loader";
import { initRedis } from "./redis.loader";

export const appLoader = await (app: Application) => {
    const redisConnection = await initRedis()
    const eventQueue = await initEventQueue(redisConnection)

    
}