export type Nothing = undefined | null | void;

export type Nullable<T> = T | Nothing;

export const isNothing = <T>(value: Nullable<T>): value is Nothing =>
	value === undefined || value === null;
