import { ChatGenerationOptions } from "@core/ai/chats/generation/ChatGenerationOptions";
import { ChatGenerationRunner } from "@core/ai/chats/generation/ChatGenerationRunner";
import { ChatServerProvider, chatServerRunner } from "@core/ai/chats/generation/providers/ChatServer";
import { GenerationProvider } from "@core/ai/generation/GenerationProvider";

export enum ChatGenerationProviderId {
  ChatServer = "chatServer"
}
const ChatProvidersRunnersMap: { [key in ChatGenerationProviderId]: ChatGenerationRunnerFactory } = {
  chatServer: (provider, options) => chatServerRunner(provider as ChatServerProvider, options)
};

export type ChatGenerationProvider = GenerationProvider<ChatGenerationProviderId>;

type ChatGenerationRunnerFactory = (
  provider: ChatGenerationProvider,
  options: ChatGenerationOptions
) => ChatGenerationRunner;

export function getChatProviderRunner(
  provider: ChatGenerationProvider,
  options: ChatGenerationOptions
): ChatGenerationRunner {
  return ChatProvidersRunnersMap[provider.id](provider, options);
}