import { ChatGenerationOptions } from "@core/ai/chats/generation/ChatGenerationOptions";
import { addAssistantInitiator } from "@core/ai/chats/generation/commands/AddAssistantInitiator";
import { applyChatMiddleware } from "@core/ai/chats/generation/commands/ApplyMiddleware";
import { ChatMessage } from "@core/ai/chats/sessions/ChatMessage";

export function buildMessages(messages: ChatMessage[], options: ChatGenerationOptions): ChatMessage[] {
  messages = addAssistantInitiator(messages);
  return applyChatMiddleware(messages, options.middlewares, options.prompt.token);
}


