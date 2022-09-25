export interface IDomainEvent {
  getAggregateId: () => Unique;
  timestamp: Date;
}
