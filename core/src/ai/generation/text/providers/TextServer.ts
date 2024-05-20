import { GenerationProvider, GenerationProviderType } from "@core/ai/generation/GenerationProvider";
import { TextGenerationChunk } from "@core/ai/generation/text/TextGenerationChunk";
import { TextGenerationOptions } from "@core/ai/generation/text/TextGenerationOptions";
import { TextGenerationRunner } from "@core/ai/generation/text/TextGenerationRunner";
import { TextGenerationProvider, TextGenerationProviderId } from ".";

export interface TextServerProvider extends TextGenerationProvider {
  inferenceUrl: string;
  targetProvider: TextGenerationProvider
}

function isTextServerProvider(provider: GenerationProvider): provider is TextServerProvider {
  return provider.type === GenerationProviderType.Text && provider.id === TextGenerationProviderId.TextServer;
}

export function localTextServer(targetProvider: GenerationProvider<TextGenerationProviderId>, port: number = 3000): TextServerProvider {
  return {
    id: TextGenerationProviderId.TextServer,
    type: GenerationProviderType.Text,
    name: "Local",
    inferenceUrl: `http://localhost:${port}/inference`,
    targetProvider
  }
}

export function textServer(name: string, inferenceUrl: string, targetProvider: GenerationProvider<TextGenerationProviderId>): TextServerProvider {
  return {
    id: TextGenerationProviderId.TextServer,
    type: GenerationProviderType.Text,
    name,
    inferenceUrl,
    targetProvider
  }
}

export interface TextServerPayload {
  prompt: string;
  options: TextGenerationOptions;
  provider: TextGenerationProvider;
}

export function textServerRunner(provider: TextServerProvider, options: TextGenerationOptions): TextGenerationRunner {
  if (!isTextServerProvider(provider)) {
    throw new Error("Invalid LocalServer runner configuration");
  }

  return async function* (prompt: string, signal?: AbortSignal) {

    const payload: TextServerPayload = {
      prompt,
      options,
      provider: provider.targetProvider
    }

    const response = await fetch(provider.inferenceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    });

    if (!response.ok || !response.body) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const decodedValues = new TextDecoder().decode(value).split('data: ');
      for (const valueChunk of decodedValues) {
        if (!valueChunk.trim()) continue;
        const chunk = JSON.parse(valueChunk) as TextGenerationChunk;
        yield chunk;
      }
    }
  }
}