import { ChatSession } from "@core/ai/chats/sessions/ChatSession";
import { Repository, RepositoryFactory } from "@core/repositories/Repository";

export interface ChatContext {
  repositories: {
    chatSessions: Repository<ChatSession>;
  }
}

export function createChatContext(repositoryFactory: RepositoryFactory): ChatContext {
  return {
    repositories: {
      chatSessions: repositoryFactory.create("ChatSession"),
    },
  };
}