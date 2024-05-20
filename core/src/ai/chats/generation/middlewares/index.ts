import { ChatGenerationMiddleware } from "@core/ai/chats/generation/ChatGenerationMiddleware";
import { ChatMiddlewareRunner } from "@core/ai/chats/generation/ChatMiddlewareRunner";
import { SystemMiddleware, systemRunner } from "@core/ai/chats/generation/middlewares/SystemMiddleware";
import { UncensoredMiddleware, uncensoredRunner } from "@core/ai/chats/generation/middlewares/UncensoredMiddleware";

export enum ChatGenerationMiddlewareId {
  Uncensored = "uncensored",
  System = "system"
}

const MiddlewaresRunnersMap: Record<ChatGenerationMiddlewareId, (middleware: ChatGenerationMiddleware) => ChatMiddlewareRunner> = {
  uncensored: (middleware) => uncensoredRunner(middleware as UncensoredMiddleware),
  system: (middleware) => systemRunner(middleware as SystemMiddleware)
}

export function getMiddlewareRunner(middleware: ChatGenerationMiddleware): ChatMiddlewareRunner {
  return MiddlewaresRunnersMap[middleware.id](middleware);
}

