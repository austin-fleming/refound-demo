import { randomUUID } from "node:crypto";

type UniqueEntityId = string;

const createUniqueEntityId = () => randomUUID();

const isEntity = <T>(maybeEntity: unknown): maybeEntity is Entity<T> =>
  maybeEntity instanceof Entity;

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityId;
  protected properties: T;

  constructor(properties: T, id?: UniqueEntityId) {
    this._id = id || createUniqueEntityId();
    this.properties = properties;
  }

  public equals(maybeSameObject?: Entity<T>) {
    if (!isEntity<T>(maybeSameObject)) return false;

    return this._id === maybeSameObject._id;
  }

  public referentiallyEquals(maybeSameObject?: Entity<T>) {
    if (!this.equals(maybeSameObject)) return false;

    return this === maybeSameObject;
  }
}
