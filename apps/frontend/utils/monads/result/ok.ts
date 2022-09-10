import type { Option } from "../option";
import { option } from "../option";
import type { Fail } from "./fail";
import type { Result, ResultMatchPattern } from "./result";

export class Ok<T, E = never> implements Result<T, E> {
	private readonly _value: T;

	constructor(value: T) {
		this._value = value;
	}

	// --------------
	// REFINEMENTS
	// --------------

	isOk(): this is Ok<T, E> {
		return true;
	}
	isFail(): this is Fail<T, E> {
		return false;
	}

	// --------------
	// DESTRUCTORS
	// --------------

	inspect(): string {
		return `ok(${JSON.stringify(this._value)})`;
	}
	extract(): T | undefined {
		return this._value;
	}
	unwrap(): T {
		return this._value;
	}
	unwrapFail(): E {
		throw new ReferenceError("Cannot unwrap error of Ok value. Use 'unwrap' instead.");
	}
	unwrapOr(_: T): T {
		return this._value;
	}
	unwrapOrElse(_: (failValue: E) => T): T {
		return this._value;
	}
	unwrapOrThrow(_: Error): T {
		return this._value;
	}
	match<U, F>(matchPattern: ResultMatchPattern<T, E, U, F>): U | F {
		return matchPattern.ok(this._value);
	}

	// --------------
	// TRANSFORMERS
	// --------------

	mapOk<U>(fn: (value: T) => U): Result<U, E> {
		return new Ok(fn(this._value));
	}
	mapFail<U>(_: (failValue: E) => U): Result<T, U> {
		return this as any;
	}
	chainOk<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
		return fn(this._value);
	}
	chainFail<U>(_: (failValue: E) => Result<T, U>): Result<T, U> {
		return this as any;
	}

	// --------------
	// UTILITIES
	// --------------

	clone(): Result<T, E> {
		return new Ok(this._value);
	}
	effect(sideEffect: (value: Result<T, E>) => void): Result<T, E> {
		sideEffect(this.clone());
		return this;
	}
	effectMatch(matchSideEffect: ResultMatchPattern<T, E, void, void>): Result<T, E> {
		matchSideEffect.ok(this._value);
		return this;
	}
	effectOk(sideEffect: (value: T) => void): Result<T, E> {
		sideEffect(this._value);
		return this;
	}
	effectFail(_: (failValue: E) => void): Result<T, E> {
		return this;
	}

	// --------------
	// INTEROP
	// --------------

	toOption(): Option<T> {
		return option.some(this._value);
	}
}

export const ok = <T, E = never>(value: T): Result<T, E> => new Ok(value);
