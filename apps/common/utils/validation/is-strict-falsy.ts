import type { StrictFalsy } from "@utils/helper-types";
import { isNothing } from "./is-nothing";

export const isStrictFalsy = (value: unknown): value is StrictFalsy =>
	isNothing(value) || value === false;
