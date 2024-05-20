import { GenerationModel } from "@core/ai/generation/GenerationModel";

const createLlamaModel = (id: string, name: string): GenerationModel => {
  return {
    id,
    name
  };
};

export const Llama = {
  ["3"]: {
    ["70b"]: createLlamaModel("llama-3-70b", "Llama 3 (70b)"),
    ["70b-instruct"]: createLlamaModel("llama-3-70b-instruct", "Llama 3 (70b Instruct)"),
    ["8b"]: createLlamaModel("llama-3-8b", "Llama 3 (8b)"),
    ["8b-instruct"]: createLlamaModel("llama-3-8b-instruct", "Llama 3 (8b Instruct)"),
  }
};