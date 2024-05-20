import { GenerationProvider } from "@core/ai/generation/GenerationProvider";
import { ReplicateProvider, replicateRunner } from "@core/ai/generation/text/providers/Replicate";
import { TextServerProvider, textServerRunner } from "@core/ai/generation/text/providers/TextServer";
import { TextGenerationOptions } from "@core/ai/generation/text/TextGenerationOptions";
import { TextGenerationRunner } from "@core/ai/generation/text/TextGenerationRunner";

export enum TextGenerationProviderId {
  Replicate = "replicate",
  TextServer = "textServer"
}

export type TextGenerationProvider = GenerationProvider<TextGenerationProviderId>;

const TextProvidersRunnersMap: { [key in TextGenerationProviderId]: TextGenerationRunnerFactory } = {
  replicate: (provider, options) => replicateRunner(provider as ReplicateProvider, options),
  textServer: (provider, options) => textServerRunner(provider as TextServerProvider, options),
};

type TextGenerationRunnerFactory = (
  provider: TextGenerationProvider,
  options: TextGenerationOptions
) => TextGenerationRunner;

export function getTextProviderRunner(
  provider: TextGenerationProvider,
  options: TextGenerationOptions
): TextGenerationRunner {
  return TextProvidersRunnersMap[provider.id](provider, options);
}