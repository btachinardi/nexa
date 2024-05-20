import { PromptTokenModifier } from "@core/ai/chats/generation/ChatGenerationPrompt";
import { ChatMessage } from "@core/ai/chats/sessions/ChatMessage";


export type ChatMiddlewareRunner = (messages: ChatMessage[], token: PromptTokenModifier) => ChatMessage[];

