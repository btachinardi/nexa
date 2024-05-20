import { ChatGenerationMiddlewareId } from "@core/ai/chats/generation/middlewares";
import { AggregateRoot, isAggregateRoot } from "@core/domains/AggregateRoot";
import { checkType, hasString, isObject } from "@core/utils/Guards";


export interface ChatGenerationMiddleware extends AggregateRoot<ChatGenerationMiddlewareId> {
  name: string;
  description: string;
}

export function isChatGenerationMiddleware(value: unknown): value is ChatGenerationMiddleware {
  return isObject(value) &&
    isAggregateRoot(value, ChatGenerationMiddlewareId) &&
    hasString(value, 'name') &&
    hasString(value, 'description') &&
    checkType<ChatGenerationMiddleware>(value);
}
