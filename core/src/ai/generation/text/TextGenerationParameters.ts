export interface TextGenerationParameters {
  temperature: number;
  topP: number;
  topK: number;
  topA: number;
  minP: number;
  typicalP: number;
  maxTokens: number;
  minTokens: number;
  frequencyPenalty: number;
  presencePenalty: number;
  repetitionPenalty: number;
  lengthPenalty: number;
}