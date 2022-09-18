import type { StrictFalsy } from "./helper-types/strict-falsy";

export const cloin = (...classes: Array<StrictFalsy<string>>): string =>
	classes.filter((maybeClass) => !!maybeClass).join(" ");
