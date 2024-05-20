export enum TextGenerationEndReason {
  Timeout = 'timeout',
  MaxTokens = 'maxTokens',
  End = 'end',
}

export enum TextGenerationChunkType {
  Output = "output",
  End = "end",
}

export interface TextGenerationOutputChunk {
  type: TextGenerationChunkType.Output;
  content: string;
}

export interface TextGenerationEndChunk {
  type: TextGenerationChunkType.End;
  reason: TextGenerationEndReason;
}

export type TextGenerationChunk = TextGenerationOutputChunk | TextGenerationEndChunk;

export function createEndChunk(reason: TextGenerationEndReason = TextGenerationEndReason.End): TextGenerationEndChunk {
  return { type: TextGenerationChunkType.End, reason };
}

export function createOutputChunk(content: string): TextGenerationOutputChunk {
  return { type: TextGenerationChunkType.Output, content };
}