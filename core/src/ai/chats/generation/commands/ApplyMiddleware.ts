import { ChatGenerationMiddleware } from "@core/ai/chats/generation/ChatGenerationMiddleware";
import { PromptTokenModifier } from "@core/ai/chats/generation/ChatGenerationPrompt";
import { ChatMiddlewareRunner } from "@core/ai/chats/generation/ChatMiddlewareRunner";
import { getMiddlewareRunner } from "@core/ai/chats/generation/middlewares";
import { ChatMessage } from "@core/ai/chats/sessions/ChatMessage";

export function applyChatMiddleware(
  messages: ChatMessage[],
  middlewares: ChatGenerationMiddleware[],
  token: PromptTokenModifier,
) {
  return applyChatMiddlewareAtIndex(messages, middlewares.map(middleware => getMiddlewareRunner(middleware)), token, 0);
}

function applyChatMiddlewareAtIndex(
  messages: ChatMessage[],
  middlewares: ChatMiddlewareRunner[],
  token: PromptTokenModifier,
  index: number): ChatMessage[] {
  if (middlewares.length <= index) {
    return messages;
  }
  const middleware = middlewares[middlewares.length - index - 1];
  return applyChatMiddlewareAtIndex(middleware(messages, token), middlewares, token, index + 1);
}
