import { CacheRepository, CacheRepositoryFactory } from "@core/caches/Cache";
import { AggregateRoot, Transient } from "@core/domains/AggregateRoot";
import { Repository, RepositoryFactory } from "@core/repositories/Repository";
import { Storage } from "@core/repositories/Storage";


export class LocalStorageRepositoryFactory implements RepositoryFactory {
  private readonly repositories: Map<string, Repository<AggregateRoot>> = new Map();
  constructor(
    private readonly storage: Storage,
    private readonly cacheFactory: CacheRepositoryFactory
  ) { }

  create<T extends AggregateRoot>(name: string): Repository<T> {
    if (this.repositories.has(name)) {
      return this.repositories.get(name) as Repository<T>;
    }

    const repository = new LocalStorageRepository<T>(this.storage, this.cacheFactory.create(name), name);
    this.repositories.set(name, repository);
    return repository;
  }
}

export class LocalStorageRepository<T extends AggregateRoot> implements Repository<T> {
  constructor(private readonly storage: Storage, private readonly cache: CacheRepository<T>, private readonly name: string) { }

  getKey(id: string) {
    return `${this.name}:${id}`;
  }

  async create(aggregate: Transient<T>): Promise<T> {
    const local = await this.cache.create(aggregate);
    this.storage.setItem(this.getKey(local.id), JSON.stringify(local));
    return local;
  }

  async read(id: string): Promise<T | null> {
    if (this.cache.has(id)) {
      return this.cache.read(id);
    }
    const item = this.storage.getItem(this.getKey(id));
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  }

  async update(aggregate: T): Promise<void> {
    this.cache.update(aggregate);
    this.storage.setItem(this.getKey(aggregate.id), JSON.stringify(aggregate));
  }

  async delete(id: string): Promise<void> {
    this.cache.delete(id);
    this.storage.removeItem(this.getKey(id));
  }
}
