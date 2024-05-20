import { CacheRepository, CacheRepositoryFactory } from "@core/caches/Cache";
import { AggregateRoot, Transient } from "@core/domains/AggregateRoot";
import { v4 as uuid } from "uuid";


export class InMemoryCacheFactory implements CacheRepositoryFactory {
  private readonly caches: Map<string, CacheRepository<AggregateRoot>> = new Map();

  create<T extends AggregateRoot>(name: string): CacheRepository<T> {
    if (this.caches.has(name)) {
      return this.caches.get(name) as CacheRepository<T>;
    }
    const cache = new InMemoryCache<T>();
    this.caches.set(name, cache);
    return cache;
  }
}

export class InMemoryCache<T extends AggregateRoot> implements CacheRepository<T> {
  private readonly storage: Map<string, T> = new Map();

  has(id: string): boolean {
    return this.storage.has(id);
  }

  async create(aggregate: Transient<T>): Promise<T> {
    const id = uuid();
    const local = { ...aggregate, id } as T;
    this.storage.set(id, local);
    return local;
  }

  async read(id: string): Promise<T | null> {
    const aggregate = this.storage.get(id);
    if (aggregate === undefined) {
      return null;
    }
    return { ...aggregate } as T;
  }

  async update(aggregate: T): Promise<void> {
    if (!this.storage.has(aggregate.id)) {
      throw new Error(`Aggregate with id ${aggregate.id} not found`);
    }
    this.storage.set(aggregate.id, { ...aggregate } as T);
  }

  async delete(id: string): Promise<void> {
    if (!this.storage.has(id)) {
      throw new Error(`Aggregate with id ${id} not found`);
    }
    this.storage.delete(id);
  }
}
