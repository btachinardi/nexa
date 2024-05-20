import { ChatMessage } from "@core/ai/chats/sessions/ChatMessage";
import { TextGenerationChunk } from "@core/ai/generation/text/TextGenerationChunk";


export type ChatGenerationRunner = (
  messages: ChatMessage[],
  signal?: AbortSignal
) => AsyncIterable<TextGenerationChunk>;

