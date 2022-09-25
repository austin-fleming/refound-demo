import { Entity } from "./entity";

export abstract class Aggregate<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];
}
