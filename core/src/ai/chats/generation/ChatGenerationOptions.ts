import { ChatGenerationMiddleware, isChatGenerationMiddleware } from "@core/ai/chats/generation/ChatGenerationMiddleware";
import { ChatGenerationPrompt, isChatGenerationPrompt } from "@core/ai/chats/generation/ChatGenerationPrompt";
import { GenerationOptions, isGenerationOptions } from "@core/ai/generation/GenerationOptions";
import { TextGenerationParameters } from "@core/ai/generation/text/TextGenerationParameters";
import { checkType, hasArray, hasProperty, isObject } from "@core/utils/Guards";

export interface ChatGenerationOptions extends GenerationOptions<TextGenerationParameters> {
  prompt: ChatGenerationPrompt;
  middlewares: ChatGenerationMiddleware[];
}

export function isChatGenerationOptions(value: unknown): value is ChatGenerationOptions {
  return isObject(value) &&
    isGenerationOptions(value) &&
    hasProperty(value, 'prompt', isChatGenerationPrompt) &&
    hasArray(value, 'middlewares', isChatGenerationMiddleware) &&
    checkType<ChatGenerationOptions>(value);
}

