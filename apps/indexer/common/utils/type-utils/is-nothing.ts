import type { Nothing } from "./nothing";

export const isNothing = (value: unknown): value is Nothing =>
  value === null || value === undefined;
