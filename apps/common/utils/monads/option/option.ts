/* eslint-disable typescript-sort-keys/interface, sort-keys, sort-keys-fix/sort-keys-fix */
import type { Result } from "../result";
import type { Nullable } from "@utils/helper-types";
import { None } from "./none";
import { Some } from "./some";
import { isNothing } from "../../validation/is-nothing";

export interface Option<T> {
	// --------------
	// REFINEMENTS
	// --------------

	/**
	 * Check if Option is type Some.
	 *
	 * @returns {boolean} Whether the Option is of type Some.
	 */
	isSome: () => this is AlwaysSome;

	/**
	 * Check if Option is type None.
	 *
	 * @returns {boolean} Whether the Option is of type None.
	 */
	isNone: () => this is None;

	/**
	 * Check if the current Option equals type and value of another Option.
	 *
	 * @param {Option<unknown>} other An Option.
	 * @returns {boolean} True if type and value of Options are equal, or False.
	 */
	equals: (other: Option<unknown>) => boolean;

	// --------------
	// DESTRUCTORS
	// --------------

	/**
	 * Gets a string representation of the Option, useful for logging.
	 *
	 * @returns {string} "some(<value>)" or "none"
	 */
	inspect: () => string;

	/**
	 * Gets the value of the Option or undefined if Option is None.
	 *
	 * @returns {T | undefined} The value or undefined.
	 */
	extract: () => this extends AlwaysSome ? T : ExtractedOption<T, undefined>;

	/**
	 * Gets the value of the Option or throws an exception if None.
	 *
	 * **THROWS REFERENCE ERROR IF NONE**: consider using a different unwrap method.
	 *
	 * @returns {T} The value.
	 */
	unwrap: () => T;

	/**
	 * Gets the value of the Option or throws the given error if the Option is None.
	 *
	 * @param {Error} error Error to throw.
	 * @returns {T} The value.
	 */
	unwrapOrThrow: (error: Error) => T;

	/**
	 * Gets the value of the Option or returns the given fallback value if the Option is None.
	 *
	 * @param {U} fallback Fallback value to return if Option is None.
	 * @returns {T} Either the value or the fallback value.
	 */
	unwrapOr: (fallback: T) => T;

	/**
	 * Gets the value of the Option.
	 * Returns the result of the thunk function if Option is None.
	 *
	 * @param {() => T} fallbackThunkFn Fallback thunk function to execute if Option is None.
	 * @returns {T} Either the value or the result of the thunk function.
	 */
	unwrapOrElse: (fallbackThunkFn: () => T) => T;

	// --------------
	// TRANSFORMERS
	// --------------

	/**
	 * Transforms the wrapped value with the given function.
	 * Returns None if Option is None.
	 *
	 * Note:
	 * If the function returns an Option, use "chain" instead.
	 *
	 * @param {(value: T) => U} fn - A function that takes a value and returns a new value.
	 * @returns {Option<U>} The result of the function as an Option or the untouched None Option.
	 */
	map: <U>(fn: (value: T) => U) => Option<U>;

	/**
	 * If option is type Some, the function is applied.
	 * If the function does not return an Option, use "map" instead.
	 *
	 * Note:
	 * If the function does not return an Option, use "map" instead.
	 *
	 * @param {(value: T) => Option<U>} fn - A function that takes a value and returns an option.
	 * @returns {Option<U>} Either the Option returned by "fn" or None
	 */
	chain: <U>(fn: (value: T) => Option<U>) => Option<U>;

	match: <U>(matchPattern: OptionMatchPattern<T, U>) => U;

	// --------------
	// UTILS
	// --------------

	/**
	 * Execute a function using the Option's value. Returns the Option unmodified.
	 *
	 * (( Option T ) -> void ) -> Option T
	 */
	effect: (sideEffectFn: (value: Option<T>) => void) => Option<T>;

	/**
	 * Creates a copy of the current Option.
	 *
	 * @returns A copy of the Option
	 */
	clone: () => Option<T>;

	// --------------
	// INTEROP
	// --------------

	toResult: <E>(error: E) => Result<T, E>;
}

export type ExtractedOption<T, Default> = T extends never ? Default : T | Default;

export interface AlwaysSome {
	readonly _nominalTag: "alwaysSome";
}

export type OptionMatchPattern<T, U> = { some: (value: T) => U; none: () => U };

// --------------------------------------------------
// OPTION CONSTRUCTOR
// --------------------------------------------------

/**
 * Creates an Option from a Some value
 *
 * @param {T} value - The value to create an Option from.
 * @returns {Option<T>} The value wrapped in an Option.
 */
const some = <T>(value: T): Option<T> => new Some(value);

const none = () => new None();

export const option = {
	// --------------
	// CONSTRUCTORS
	// --------------

	some,
	none,

	/**
	 * Creates an Option from a Some value
	 *
	 * @param {T} value - The value to create an Option from.
	 * @returns {Option<T>} The value wrapped in an Option.
	 */
	of: <T>(value: T): Option<T> => {
		return some(value);
	},

	/**
	 * Creates a None Option
	 *
	 * @returns {None} A None Option.
	 */
	empty: (): Option<never> => {
		return none();
	},

	/**
	 * Creates a None Option
	 *
	 * @returns {None} A None Option.
	 */
	zero: (): Option<never> => {
		return none();
	},

	/**
	 * Creates an Option from a possibly nullish value.
	 * If value is nullish, returns None.
	 * If value is something, returns Some.
	 *
	 * Note: to create from falsy value, use "fromFalsy"
	 *
	 * @param {Nullable<T>} value A value that might be nullish.
	 * @returns {Option<T>} An Option.
	 */
	fromNullable: <T>(value: Nullable<T>): Option<T> => {
		return isNothing(value) ? none() : some(value);
	},

	/**
	 * Creates an Option from a possibly falsy value.
	 * If value is falsy, returns None.
	 * If value is truthy, returns Some.
	 *
	 * Note: to create from nullish value, use "fromNullable"
	 *
	 * @param {T} [value] A value that might be falsy.
	 * @returns {None} An Option.
	 */
	fromFalsy: <T>(value?: T): Option<T> => {
		return value ? some<T>(value) : new None();
	},

	/**
	 * Creates an Option by passing a value to a predicate function.
	 *
	 * Example >>
	 * option.fromPredicate(isGreaterThanFive, 6).isSome() -> true
	 *
	 * @param {(value: T) => boolean} predicateFn A function that checks if a value passes a condition.
	 * @param {T} value A value to test against the predicate function.
	 * @returns {Option<T>} An Option.
	 */
	fromPredicate: <T>(predicateFn: (value: T) => boolean, value: T): Option<T> => {
		return predicateFn(value) ? some(value) : none();
	},

	/**
	 * Given a function that might throw an error, returns a Some Option if the function produces a value or a None Option if an error is thrown.
	 *
	 * @param {() => T} throwableFn A function that may either throw an error or return a value.
	 * @returns {Option<T>} An Option.
	 */
	encase: <T>(throwableFn: () => T): Option<T> => {
		try {
			return some(throwableFn());
		} catch {
			return none();
		}
	},

	// --------------
	// DESTRUCTORS
	// --------------

	filterOptions: <T>(listOfOptions: Option<T>[]): T[] => {
		const someList: T[] = [];
		for (const item of listOfOptions) {
			if (item.isSome()) {
				someList.push(item.extract());
			}
		}
		return someList;
	},

	// --------------
	// REFINEMENTS
	// --------------

	isOption: <T>(value: unknown): value is Option<T> => {
		return value instanceof Some || value instanceof None;
	},

	isSome: <T>(value: Option<T>): value is Some<T> => {
		return value.isSome();
	},

	isNone: (value: Option<unknown>): value is None => {
		return value.isNone();
	},

	// --------------
	// UTILITIES
	// --------------

	mapOptions: <T, U>(fn: (value: T) => Option<U>, values: T[]): U[] => {
		return option.filterOptions(values.map(fn));
	},

	sequence: <T>(listOfOptions: Option<T>[]): Option<T[]> => {
		const someEligibleValues: T[] = [];
		for (const item of listOfOptions) {
			if (item.isSome()) {
				someEligibleValues.push(item.extract());
			} else {
				// if a none value is found, the entire array is none
				return none();
			}
		}
		return some(someEligibleValues);
	},
	// toResult
};
