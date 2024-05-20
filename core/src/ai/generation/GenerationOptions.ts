import { GenerationModel, isGenerationModel } from "@core/ai/generation/GenerationModel";
import { hasObject, hasProperty, isObject } from "@core/utils/Guards";

export interface GenerationOptions<TParams> {
  model: GenerationModel;
  parameters: Partial<TParams>;
}

export function isGenerationOptions(value: unknown): value is GenerationOptions<unknown> {
  return isObject(value) &&
    hasProperty(value, 'model', isGenerationModel) &&
    hasObject(value, 'parameters');
}

