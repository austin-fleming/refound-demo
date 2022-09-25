import { randomUUID } from "node:crypto";

export const createUuid = (id?: string) => (id ? id : randomUUID());
