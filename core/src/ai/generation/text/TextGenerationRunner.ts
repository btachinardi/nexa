import { TextGenerationChunk } from "@core/ai/generation/text/TextGenerationChunk";

export type TextGenerationRunner = (prompt: string, signal?: AbortSignal) => AsyncIterable<TextGenerationChunk>;