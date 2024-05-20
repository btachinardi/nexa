import { ChatGenerationOptions, isChatGenerationOptions } from "@core/ai/chats/generation/ChatGenerationOptions";
import { system } from "@core/ai/chats/generation/middlewares/SystemMiddleware";
import { conversationalPrompt } from "@core/ai/chats/generation/prompts/ConversationalPrompt";
import { Llama } from "@core/ai/generation/text/models/Llama";
import { AggregateRoot, isAggregateRoot } from "@core/domains/AggregateRoot";
import { checkType, hasProperty, hasString } from "@core/utils/Guards";

export interface Assistant extends AggregateRoot {
    name: string;
    description: string;
    options: ChatGenerationOptions;
}

export function isAssistant(value: unknown): value is Assistant {
    return isAggregateRoot(value) &&
        hasString(value, 'name') &&
        hasString(value, 'description') &&
        hasProperty(value, 'options', isChatGenerationOptions) &&
        checkType<Assistant>(value);
}

export function assistant(id: string, name: string, description: string, options?: Partial<ChatGenerationOptions>): Assistant {
    return {
        id,
        name,
        description,
        options: {
            model: options?.model ?? Llama[3]["70b-instruct"],
            prompt: options?.prompt ?? conversationalPrompt(),
            middlewares: options?.middlewares ?? [
                system("You are a helpful assistant. You are here to help the user with their questions and tasks.")
            ],
            parameters: options?.parameters ?? {
                temperature: 1,
                maxTokens: 256,
            }
        }
    };
}