import { AggregateRoot, Transient } from "@core/domains/AggregateRoot";

export interface Repository<T extends AggregateRoot> {
  create(aggregate: Transient<T>): Promise<T>;
  read(id: string): Promise<T | null>;
  update(aggregate: T): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface RepositoryFactory {
  create<T extends AggregateRoot>(name: string): Repository<T>;
}