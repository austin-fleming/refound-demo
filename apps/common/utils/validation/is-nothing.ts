import type { Nothing } from "../helper-types/nothing";

export const isNothing = (value: unknown): value is Nothing =>
	value === null || value === undefined;
