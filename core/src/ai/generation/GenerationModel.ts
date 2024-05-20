import { AggregateRoot, isAggregateRoot } from "@core/domains/AggregateRoot";
import { hasString } from "@core/utils/Guards";

export interface GenerationModel extends AggregateRoot {
  name: string;
}

export function isGenerationModel(value: unknown): value is GenerationModel {
  return isAggregateRoot(value) &&
    hasString(value, 'name');
}
