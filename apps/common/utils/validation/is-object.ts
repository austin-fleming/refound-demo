import { isNothing } from "./is-nothing";

export const isObject = (value: unknown): value is Record<string, unknown> =>
	!isNothing(value) && typeof value === "object" && !Array.isArray(value);
