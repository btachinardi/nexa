import { GenerationModel } from "@core/ai/generation/GenerationModel";
import { GenerationProvider, GenerationProviderType } from "@core/ai/generation/GenerationProvider";
import { createEndChunk, createOutputChunk } from "@core/ai/generation/text/TextGenerationChunk";
import { TextGenerationOptions } from "@core/ai/generation/text/TextGenerationOptions";
import { TextGenerationRunner } from "@core/ai/generation/text/TextGenerationRunner";
import { Llama } from "@core/ai/generation/text/models/Llama";
import Replicate, { WebhookEventType } from "replicate";
import { TextGenerationProvider, TextGenerationProviderId } from ".";

const clientsCache = new Map<string, Replicate>();

export interface ReplicateProvider extends TextGenerationProvider {
  apiKey: string;
}

export function isReplicateProvider(provider: GenerationProvider): provider is ReplicateProvider {
  return provider.type === GenerationProviderType.Text && provider.id === TextGenerationProviderId.Replicate;
}

function getReplicateClient(apiKey: string): Replicate {
  let client = clientsCache.get(apiKey);
  if (!client) {
    client = new Replicate({
      auth: apiKey,
    });
    clientsCache.set(apiKey, client);
  }
  return client;
}

function getModelIdentifier(model: GenerationModel): `${string}/${string}` {
  switch (model.id) {
    case Llama[3]["8b"].id:
      return "meta/meta-llama-3-8b";
    case Llama[3]["8b-instruct"].id:
      return "meta/meta-llama-3-8b-instruct";
    case Llama[3]["70b"].id:
      return "meta/meta-llama-3-70b";
    case Llama[3]["70b-instruct"].id:
      return "meta/meta-llama-3-70b-instruct";
    default:
      throw new Error(`Model ${model.id} is not supported by Replicate`);
  }
}

interface ReplicateGenerationOptions {
  input: {
    prompt: string;
    prompt_template: string;

    top_k?: number;
    top_p?: number;
    max_tokens?: number;
    min_tokens?: number;
    temperature?: number;
    length_penalty?: number;
    presence_penalty?: number;
    log_performance_metrics?: boolean;
  };
  webhook?: string | undefined;
  webhook_events_filter?: WebhookEventType[] | undefined;
  signal?: AbortSignal | undefined;
}

export function replicate(apiKey: string): ReplicateProvider {
  return {
    id: TextGenerationProviderId.Replicate,
    type: GenerationProviderType.Text,
    name: "Replicate",
    url: "https://replicate.com/",
    apiKey
  };
}

export function replicateRunner(provider: ReplicateProvider, options: TextGenerationOptions): TextGenerationRunner {
  if (!isReplicateProvider(provider)) {
    throw new Error("Invalid Replicate runner configuration");
  }

  return async function* (prompt: string, signal?: AbortSignal) {
    const client = getReplicateClient(provider.apiKey);
    const replicateOptions: ReplicateGenerationOptions = {
      input: {
        prompt: prompt,
        prompt_template: "{prompt}",

        top_k: options.parameters.topK,
        top_p: options.parameters.topP,
        max_tokens: options.parameters.maxTokens,
        min_tokens: options.parameters.minTokens,
        temperature: options.parameters.temperature,
        length_penalty: options.parameters.lengthPenalty,
        presence_penalty: options.parameters.presencePenalty,
        log_performance_metrics: false,
      },
      signal
    }

    for await (const chunk of client.stream(getModelIdentifier(options.model), replicateOptions)) {
      if (chunk.retry) {
        const runner = replicateRunner(provider, options);
        for await (const chunk of runner(prompt, signal)) {
          yield chunk;
        }
        break;
      }
      switch (chunk.event) {
        case "output":
          yield createOutputChunk(chunk.data);
          break;
        case "done":
          yield createEndChunk();
          break;
        default:
          throw new Error(`Event ${chunk.event} is not supported.`);
      }
    }
  }
}

