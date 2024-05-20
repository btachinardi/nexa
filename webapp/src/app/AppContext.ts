import { ChatContext, createChatContext } from "@core/ai/chats/ChatContext";
import { CacheRepositoryFactory } from "@core/caches/Cache";
import { InMemoryCacheFactory } from "@core/caches/InMemoryCache";
import { LocalStorageRepositoryFactory } from "@core/repositories/LocalStorageRepository";
import { RepositoryFactory } from "@core/repositories/Repository";


export interface AppContext {
  chat: ChatContext
}

function createAppContext(): AppContext {
  // Base services & factories
  const cacheFactory: CacheRepositoryFactory = new InMemoryCacheFactory();
  const repositoryFactory: RepositoryFactory = new LocalStorageRepositoryFactory(localStorage, cacheFactory);

  return {
    chat: createChatContext(repositoryFactory)
  };
}

export default createAppContext();

