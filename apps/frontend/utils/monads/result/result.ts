import type { Option } from "../option";
import { Fail } from "./fail";
import { fail } from "./fail";
import { ok } from "./ok";
import { Ok } from "./ok";

export interface Result<T, E = Error> {
	/**
	 * @category refinements
	 */
	isOk: () => this is Ok<T, E>;
	/**
	 * @category refinements
	 */
	isFail: () => this is Fail<T, E>;

	/**
	 * @category destructors
	 */
	inspect: () => string;
	/**
	 * @category destructors
	 */
	extract: () => T | undefined;
	/**
	 * @category destructors
	 */
	unwrap: () => T;
	/**
	 * @category destructors
	 */
	unwrapFail: () => E;
	/**
	 * @category destructors
	 */
	unwrapOr: (fallbackValue: T) => T;
	/**
	 * @category destructors
	 */
	unwrapOrElse: (fn: (failValue: E) => T) => T;
	/**
	 * @category destructors
	 */
	unwrapOrThrow: (error: Error) => T;
	/**
	 * @category destructors
	 */
	match: <U, F>(matchPattern: ResultMatchPattern<T, E, U, F>) => U | F;

	// --------------
	// TRANSFORMERS
	// --------------

	/**
	 * If value is Ok, the function is applied.
	 *
	 * Note: if the function returns a new Result, use "chainOk"
	 * @category transformers
	 */
	mapOk: <U>(fn: (value: T) => U) => Result<U, E>;
	/**
	 * If value is Fail, the function is applied.
	 *
	 * Note: if the function returns a new Result, use "chainFail"
	 * @category transformers
	 */
	mapFail: <U>(fn: (failValue: E) => U) => Result<T, U>;
	/**
	 * If value is Ok, the function is applied.
	 *
	 * Note: if the function does not return a Result, use "mapOk"
	 * @category transformers
	 */
	chainOk: <U>(fn: (value: T) => Result<U, E>) => Result<U, E>;
	/**
	 * If value is Fail, the function is applied.
	 *
	 * Note: if the function does not return a Result, use "mapFail"
	 * @category transformers
	 */
	chainFail: <U>(fn: (failValue: E) => Result<T, U>) => Result<T, U>;

	/**
	 * @category utilities
	 */
	clone: () => Result<T, E>;
	/**
	 * @category utilities
	 */
	effect: (sideEffect: (value: Result<T, E>) => void) => Result<T, E>;
	/**
	 * @category utilities
	 */
	effectMatch: (matchSideEffect: ResultMatchPattern<T, E, void, void>) => Result<T, E>;
	/**
	 * @category utilities
	 */
	effectOk: (sideEffect: (value: T) => void) => Result<T, E>;
	/**
	 * @category utilities
	 */
	effectFail: (sideEffect: (failValue: E) => void) => Result<T, E>;

	/**
	 * Converts the Result to an Option, dropping the Fail value.
	 * @category interop
	 */
	toOption: () => Option<T>;
}

export type ResultMatchPattern<T, E, U, F = U> = { ok: (value: T) => U; fail: (failValue: E) => F };

/**
 * Result<T,E>[] -> T[]
 *
 * Given a list of Results, returns Ok values.
 * @category destructors
 */
const getOks = <T, E>(resultList: Result<T, E>[]): T[] => {
	const okValues: T[] = [];

	for (const item of resultList) {
		if (item.isOk()) {
			okValues.push(item.unwrap());
		}
	}

	return okValues;
};

/**
 * Result<T,E>[] -> E[]
 *
 * Given a list of Results, returns Fail values.
 * @category destructors
 */
const getFails = <T, E>(resultList: Result<T, E>[]): E[] => {
	const failValues: E[] = [];

	for (const item of resultList) {
		if (item.isFail()) {
			failValues.push(item.unwrapFail());
		}
	}

	return failValues;
};

/**
 * Result<T,E>[] -> Result<T[],E>
 *
 * Given a list of Results, converts the list into
 * a Result wrapping a list of Ok values if all are Ok, or the first fail
 * value found.
 *
 * Note: If you need to combine all the fail values, use "sequenceOrReduce".
 * @category transformers
 */
const sequence = <T, E>(listOfResults: Result<T, E>[]): Result<T[], E> => {
	const okValues: T[] = [];
	for (const item of listOfResults) {
		if (item.isFail()) return fail(item.unwrapFail());

		okValues.push(item.unwrap());
	}
	return ok(okValues);
};

/**
 * Result<T,E>[] -> Result<T[],U>
 *
 * Given a list of Results, converts the list into
 * a Result wrapping a list of Ok values if all are Ok, or the outcome of executing
 * a reducer on the fail values.
 *
 * Note: If you don't need to reduce the fail values, use "sequence".
 *	@category transformers
 */
const sequenceOrReduce =
	<T, E>(listOfResults: Result<T, E>[]) =>
	<U>(failReducer: (accumulator: U, current: E) => U, initialValue: U): Result<T[], U> => {
		const sequencedResult = sequence(listOfResults);

		if (sequencedResult.isOk()) {
			return ok(sequencedResult.unwrap());
		}

		const failValues = getFails(listOfResults);
		return fail(failValues.reduce(failReducer, initialValue));
	};

export const result = {
	ok: ok,
	fail: fail,
	oks: getOks,
	fails: getFails,

	/**
	 * @category refinements
	 */
	isResult: <T, E>(value: unknown): value is Result<T, E> => {
		return value instanceof Ok || value instanceof Fail;
	},

	/**
	 * Constructs a Result from predicate function. If the predicate evaluates to true,
	 * the value is returned in an Ok Result; if false, the error is returned in a Fail Result.
	 *
	 * @category constructors
	 */
	fromPredicate:
		<T, E>(predicateFn: (value: T) => boolean, error: E) =>
		(value: T): Result<T, E> => {
			return predicateFn(value) ? ok(value) : fail(error);
		},

	/**
	 * Constructs a Result from a function that might throw
	 *
	 * @category interop
	 */
	tryCatch: <T, E>(fn: () => T, onThrow: (error: unknown) => E): Result<T, E> => {
		try {
			return ok(fn());
		} catch (error: unknown) {
			return fail(onThrow(error));
		}
	},
	sequence,
	sequenceOrReduce,
};
