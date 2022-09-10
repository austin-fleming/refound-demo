/**
 * Helper for expanding joins
 */
 export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
