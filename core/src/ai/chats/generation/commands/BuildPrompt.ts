import { ChatGenerationOptions } from "@core/ai/chats/generation/ChatGenerationOptions";
import { applyChatPrompt } from "@core/ai/chats/generation/commands/ApplyPrompt";
import { ChatMessage } from "@core/ai/chats/sessions/ChatMessage";
import { buildMessages } from "./BuildMessages";


export function buildPrompt(messages: ChatMessage[], options: ChatGenerationOptions): string {
  return applyChatPrompt(buildMessages(messages, options), options.prompt.chat);
}
