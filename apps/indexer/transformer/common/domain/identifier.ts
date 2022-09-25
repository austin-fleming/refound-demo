import { isNothing } from "@utils/type-utils/is-nothing"

export class Identifier<T> {
  private readonly _value: T

  constructor(value: T) {
    this._value = value
  }

  equals(id?: Identifier<T>) {
    if(isNothing(id)) return false
    if()
  }

  toValue(): T {
    return this._value
  }

  toString() {
    return String(this._value)
  }
}