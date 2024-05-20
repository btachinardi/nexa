import { ChatGenerationProvider } from "@core/ai/chats/generation/providers";
import { TextGenerationProvider } from "@core/ai/generation/text/providers";
import { AggregateRoot } from "@core/domains/AggregateRoot";

export enum GenerationProviderType {
  Chat = "chat",
  Text = "text"
}

export function isChatGenerationProvider(provider: GenerationProvider): provider is ChatGenerationProvider {
  return provider.type === GenerationProviderType.Chat;
}

export function isTextGenerationProvider(provider: GenerationProvider): provider is TextGenerationProvider {
  return provider.type === GenerationProviderType.Text;
}

export interface GenerationProvider<T extends string = string> extends AggregateRoot<T> {
  type: GenerationProviderType;
  name: string;
  url?: string;
}