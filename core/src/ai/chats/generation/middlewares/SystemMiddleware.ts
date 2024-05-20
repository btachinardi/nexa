import { ChatGenerationMiddleware } from "@core/ai/chats/generation/ChatGenerationMiddleware";
import { PromptTokenModifier } from "@core/ai/chats/generation/ChatGenerationPrompt";
import { ChatMiddlewareRunner } from "@core/ai/chats/generation/ChatMiddlewareRunner";
import { ChatGenerationMiddlewareId } from "@core/ai/chats/generation/middlewares";
import { ChatMessage, ChatMessageRole } from "@core/ai/chats/sessions/ChatMessage";


export interface SystemMiddleware extends ChatGenerationMiddleware {
  systemPrompt: string;
}

export function isSystem(middleware: ChatGenerationMiddleware): middleware is SystemMiddleware {
  return middleware.id == ChatGenerationMiddlewareId.System;
}

export function system(systemPrompt: string): SystemMiddleware {
  return {
    id: ChatGenerationMiddlewareId.System,
    name: 'System',
    description: 'A system message that is always sent at the beginning of the conversation.',
    systemPrompt
  };
}

export function systemRunner(middleware: SystemMiddleware): ChatMiddlewareRunner {
  if (!isSystem(middleware)) {
    throw new Error("Invalid system middleware: " + JSON.stringify(middleware));
  }

  return (messages: ChatMessage[], _: PromptTokenModifier): ChatMessage[] => {
    return [
      {
        role: ChatMessageRole.System,
        content: middleware.systemPrompt
      },
      ...messages
    ];
  }
}