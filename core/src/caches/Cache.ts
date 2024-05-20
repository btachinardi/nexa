import { AggregateRoot } from "@core/domains/AggregateRoot";
import { Repository } from "@core/repositories/Repository";

export interface CacheRepository<T extends AggregateRoot> extends Repository<T> {
  has(id: string): boolean;
}


export interface CacheRepositoryFactory {
  create<T extends AggregateRoot>(name: string): CacheRepository<T>;
}