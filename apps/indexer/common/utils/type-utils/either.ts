export class Left<L, R> {
  constructor(private readonly _value: L) {}

  public isLeft(): this is Left<L, R> {
    return true;
  }

  public isRight(): this is Right<L, R> {
    return false;
  }

  public unwrap() {
    this._value;
  }

  public map() {
    return this;
  }

  public chain() {
    return this;
  }
}

export class Right<L, R> {
  constructor(private readonly _value: R) {}

  public isLeft(): this is Left<L, R> {
    return false;
  }

  public isRight(): this is Right<L, R> {
    return true;
  }

  public unwrap() {
    return this._value;
  }

  public map(fn: <T>(input: R) => T) {
    return new Right(fn(this._value));
  }

  public chain(fn: <T>(input: R) => T) {
    return this.map(fn).unwrap();
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(value: L): Either<L, R> => new Left(value);

export const right = <L, R>(value: R): Either<L, R> => new Right(value);
