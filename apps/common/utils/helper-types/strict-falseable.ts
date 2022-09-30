import type { StrictFalsy } from "./strict-falsy";

export type StrictFalseable<T> = T | StrictFalsy;
