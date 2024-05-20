import { ChatGenerationOptions } from "@core/ai/chats/generation/ChatGenerationOptions";
import { ChatGenerationRunner } from "@core/ai/chats/generation/ChatGenerationRunner";
import { ChatGenerationProvider, ChatGenerationProviderId } from "@core/ai/chats/generation/providers";
import { ChatMessage } from "@core/ai/chats/sessions/ChatMessage";
import { GenerationProvider, GenerationProviderType } from "@core/ai/generation/GenerationProvider";
import { TextGenerationChunk } from "@core/ai/generation/text/TextGenerationChunk";
import { TextGenerationProvider } from "@core/ai/generation/text/providers";

export interface ChatServerProvider extends ChatGenerationProvider {
  inferenceUrl: string;
  targetProvider: TextGenerationProvider | ChatGenerationProvider
}

function isChatServerProvider(provider: GenerationProvider): provider is ChatServerProvider {
  return provider.type === GenerationProviderType.Chat && provider.id === ChatGenerationProviderId.ChatServer;
}

export function localChatServer(targetProvider: TextGenerationProvider | ChatGenerationProvider, port: number = 3000): ChatServerProvider {
  return {
    id: ChatGenerationProviderId.ChatServer,
    type: GenerationProviderType.Chat,
    name: "Local",
    inferenceUrl: `http://localhost:${port}/inference`,
    targetProvider
  }
}

export function chatServer(name: string, inferenceUrl: string, targetProvider: TextGenerationProvider | ChatGenerationProvider): ChatServerProvider {
  return {
    id: ChatGenerationProviderId.ChatServer,
    type: GenerationProviderType.Chat,
    name,
    inferenceUrl,
    targetProvider
  }
}

export interface ChatServerPayload {
  messages: ChatMessage[];
  options: ChatGenerationOptions;
  provider: TextGenerationProvider | ChatGenerationProvider
}

export function chatServerRunner(provider: ChatServerProvider, options: ChatGenerationOptions): ChatGenerationRunner {
  if (!isChatServerProvider(provider)) {
    throw new Error("Invalid ChatServer runner configuration");
  }

  return async function* (messages: ChatMessage[], signal?: AbortSignal) {
    const payload: ChatServerPayload = {
      messages,
      options,
      provider: provider.targetProvider
    }

    const response = await fetch(provider.inferenceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    });

    if (!response.ok || !response.body) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      const chunks = new TextDecoder()
        .decode(value)
        .split('data: ')
        .map(chunk => chunk.trim())
        .filter(chunk => chunk)
        .map(chunk => JSON.parse(chunk) as TextGenerationChunk);

      for (const chunk of chunks) {
        yield chunk;
      }
    }
  }
}