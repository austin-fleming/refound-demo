import type { Result } from "../result";
import { result } from "../result";
import type { AlwaysSome, ExtractedOption, OptionMatchPattern } from "./option";
import { option } from "./option";
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import type { Option } from "./option";

export class None implements Option<never> {
	// @ts-expect-error: this shouldn't be read.
	private readonly _value!: never;

	// --------------
	// REFINEMENTS
	// --------------

	isSome() {
		return true;
	}
	isNone() {
		return true;
	}
	equals<T>(other: Option<T>) {
		return this.extract() === other.extract();
	}

	// --------------
	// DESTRUCTORS
	// --------------

	inspect() {
		return "none";
	}
	extract() {
		return undefined as this extends AlwaysSome ? never : ExtractedOption<never, undefined>;
	}
	unwrap(): never {
		throw new ReferenceError("Cannot unwrap the value of None.");
	}
	unwrapOrThrow(error: Error): never {
		throw error;
	}
	unwrapOr<T>(fallback: T): T {
		return fallback;
	}
	unwrapOrElse<T>(fallbackThunkFn: () => T): T {
		return fallbackThunkFn();
	}

	// --------------
	// TRANSFORMERS
	// --------------

	map<U>(_: (value: never) => U): Option<U> {
		return option.none();
	}
	chain<U>(_: (value: never) => Option<U>): Option<U> {
		return option.none();
	}
	match<U>(matchPattern: OptionMatchPattern<never, U>): U {
		return matchPattern.none();
	}

	// --------------
	// UTILS
	// --------------

	effect<T>(sideEffectFn: (value: Option<T>) => void): Option<T> {
		sideEffectFn(this.clone());
		return this.clone();
	}
	clone<T>(): Option<T> {
		return option.none();
	}

	// --------------
	// INTEROP
	// --------------

	toResult<T, E>(error: E): Result<T, E> {
		return result.fail<E, T>(error);
	}
}

// None.prototype.constructor = Option as any;
