import { option } from "./option";
import type { AlwaysSome, ExtractedOption, OptionMatchPattern } from "./option";
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import type { Option } from "./option";
import type { Result } from "../result";
import { result } from "../result";

/**
 * Implementation of Option as a Some type.
 */
export class Some<T> implements Option<T> {
	private readonly _value: T;

	constructor(value: T) {
		this._value = value;
	}

	// --------------
	// REFINEMENTS
	// --------------

	isSome() {
		return true;
	}
	isNone() {
		return false;
	}
	equals(other: Option<unknown>) {
		return this.extract() === other.extract();
	}

	// --------------
	// DESTRUCTORS
	// --------------

	inspect() {
		return `some(${JSON.stringify(this._value)})`;
	}
	extract() {
		return this._value as this extends AlwaysSome ? T : ExtractedOption<T, undefined>;
	}
	unwrap(): T {
		return this._value;
	}
	unwrapOrThrow(_: Error): T {
		return this._value;
	}
	unwrapOr(_: T): T {
		return this._value;
	}
	unwrapOrElse(_: () => T): T {
		return this._value;
	}

	// --------------
	// TRANSFORMERS
	// --------------

	map<U>(fn: (value: T) => U): Option<U> {
		return option.some(fn(this._value));
	}
	chain<U>(fn: (value: T) => Option<U>): Option<U> {
		return fn(this._value);
	}
	match<U>(matchPattern: OptionMatchPattern<T, U>): U {
		return matchPattern.some(this._value);
	}

	// --------------
	// UTILS
	// --------------

	effect(sideEffectFn: (value: Option<T>) => void): Option<T> {
		sideEffectFn(this.clone());

		return this.clone();
	}

	clone(): Option<T> {
		return option.some(this._value);
	}

	// --------------
	// INTEROP
	// --------------

	toResult<E = never>(_: E): Result<T, E> {
		return result.ok(this._value);
	}
}

// Some.prototype.constructor = Option as any;
