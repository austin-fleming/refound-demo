/*
 * Helper for expanding joins. Allows intellisense to see actual fields instead of a mess of joins and types
 */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
