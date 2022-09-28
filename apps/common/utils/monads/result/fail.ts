import type { Option } from "../option";
import { option } from "../option";
import type { Ok } from "./ok";
import type { Result, ResultMatchPattern } from "./result";

export class Fail<E, T = never> implements Result<T, E> {
	private readonly _failValue: E;

	constructor(failValue: E) {
		this._failValue = failValue;
	}

	// --------------
	// REFINEMENTS
	// --------------

	isOk(): this is Ok<T, E> {
		return false;
	}
	isFail(): this is Fail<T, E> {
		return true;
	}

	// --------------
	// DESTRUCTORS
	// --------------

	inspect(): string {
		return `fail(${JSON.stringify(this._failValue)})`;
	}
	extract(): T | undefined {
		return undefined;
	}
	unwrap(): T {
		throw new ReferenceError(
			"Cannot unwrap the value of an error result. Use 'unwrapError' instead.",
		);
	}
	unwrapFail(): E {
		return this._failValue;
	}
	unwrapOr(fallbackValue: T): T {
		return fallbackValue;
	}
	unwrapOrElse(fn: (failValue: E) => T): T {
		return fn(this._failValue);
	}
	unwrapOrThrow(error: Error): T {
		throw error;
	}
	match<U, F>(matchPattern: ResultMatchPattern<T, E, U, F>): U | F {
		return matchPattern.fail(this._failValue);
	}

	// --------------
	// TRANSFORMERS
	// --------------

	mapOk<U>(_: (value: T) => U): Result<U, E> {
		return this as any;
	}
	mapFail<U>(fn: (failValue: E) => U): Result<T, U> {
		return new Fail(fn(this._failValue));
	}
	chainOk<U>(_: (value: T) => Result<U, E>): Result<U, E> {
		return this as any;
	}
	chainFail<U>(fn: (failValue: E) => Result<T, U>): Result<T, U> {
		return fn(this._failValue);
	}

	// --------------
	// UTILITIES
	// --------------

	clone(): Result<T, E> {
		return new Fail(this._failValue);
	}
	effect(sideEffect: (value: Result<T, E>) => void): Result<T, E> {
		sideEffect(this.clone());
		return this;
	}
	effectMatch(matchSideEffect: ResultMatchPattern<T, E, void, void>): Result<T, E> {
		matchSideEffect.fail(this._failValue);
		return this;
	}
	effectOk(_: (value: T) => void): Result<T, E> {
		return this;
	}
	effectFail(sideEffect: (failValue: E) => void): Result<T, E> {
		sideEffect(this._failValue);
		return this;
	}

	// --------------
	// INTEROP
	// --------------

	toOption(): Option<T> {
		return option.none();
	}
}

export const fail = <E, T = never>(failValue: E): Result<T, E> => new Fail(failValue);
