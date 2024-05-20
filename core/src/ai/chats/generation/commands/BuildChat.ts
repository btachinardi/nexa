import { ChatGenerationOptions } from "@core/ai/chats/generation/ChatGenerationOptions";
import { ChatGenerationRunner } from "@core/ai/chats/generation/ChatGenerationRunner";
import { buildMessages } from "@core/ai/chats/generation/commands/BuildMessages";
import { buildPrompt } from "@core/ai/chats/generation/commands/BuildPrompt";
import { ChatGenerationProvider, getChatProviderRunner } from "@core/ai/chats/generation/providers";
import { ChatMessage } from "@core/ai/chats/sessions/ChatMessage";
import { GenerationProvider, isChatGenerationProvider, isTextGenerationProvider } from "@core/ai/generation/GenerationProvider";
import { TextGenerationProvider, getTextProviderRunner } from "@core/ai/generation/text/providers";


export function buildChat(provider: GenerationProvider, options: ChatGenerationOptions): ChatGenerationRunner;
export function buildChat(provider: ChatGenerationProvider, options: ChatGenerationOptions): ChatGenerationRunner;
export function buildChat(provider: TextGenerationProvider, options: ChatGenerationOptions): ChatGenerationRunner;
export function buildChat(
  provider: TextGenerationProvider | ChatGenerationProvider | GenerationProvider,
  options: ChatGenerationOptions
): ChatGenerationRunner {
  if (isChatGenerationProvider(provider)) {
    const runner = getChatProviderRunner(provider, options);
    return async function* (messages: ChatMessage[], signal?: AbortSignal) {
      yield* runner(buildMessages(messages, options), signal);
    }
  } else if (isTextGenerationProvider(provider)) {
    const runner = getTextProviderRunner(provider, options);
    return async function* (messages: ChatMessage[], signal?: AbortSignal) {
      yield* runner(buildPrompt(messages, options), signal);
    }
  } else {
    throw new Error("Unsupported generation provider");
  }
}

