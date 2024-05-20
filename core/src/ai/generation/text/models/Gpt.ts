import { GenerationModel } from "@core/ai/generation/GenerationModel";

const createGptModel = (id: string, name: string): GenerationModel => {
  return {
    id,
    name
  };
};

export const Gpt = {
  "3.5": {
    "Turbo": createGptModel("gpt-3.5-turbo", "GPT 3.5 Turbo"),
  },
  "4": {
    "Turbo": createGptModel("gpt-4-turbo", "GPT 4 Turbo"),
  }
};
