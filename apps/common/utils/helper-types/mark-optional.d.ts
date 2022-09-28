import type { Expand } from "./expand";

/**
 * Mark specific keys as optional
 */
export type MarkOptional<T, K extends keyof T> = Expand<Omit<T, K> & Partial<Pick<T, K>>>;
