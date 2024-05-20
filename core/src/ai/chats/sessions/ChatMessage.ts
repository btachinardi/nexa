import { ChatContentPart, isChatContent } from "@core/ai/chats/sessions/ChatContent";
import { checkType, hasBoolean, hasProperty, hasSpecificEnum, hasString, isObject } from "@core/utils/Guards";

export enum ChatMessageRole {
    System = "system",
    User = "user",
    Assistant = "assistant"
}

export interface UserChatMessage {
    role: ChatMessageRole.User;
    content: string | ChatContentPart[];
}
export interface AssistantChatMessage {
    role: ChatMessageRole.Assistant;
    content: string;
    isCompleted: boolean;
}

export interface SystemChatMessage {
    role: ChatMessageRole.System;
    content: string;
}

export type ChatMessage = UserChatMessage | AssistantChatMessage | SystemChatMessage;

export function isChatMessage(message: unknown): message is ChatMessage {
    return (isAssistantMessage(message) || isUserMessage(message) || isSystemMessage(message)) &&
        checkType<ChatMessage>(message);
}

export function isAssistantMessage(message: unknown): message is AssistantChatMessage {
    return isObject(message) &&
        hasSpecificEnum(message, 'role', ChatMessageRole, ChatMessageRole.Assistant as const) &&
        hasString(message, 'content') &&
        hasBoolean(message, 'isCompleted') &&
        checkType<AssistantChatMessage>(message);
}

export function isUserMessage(message: unknown): message is UserChatMessage {
    return isObject(message) &&
        hasSpecificEnum(message, 'role', ChatMessageRole, ChatMessageRole.User as const) &&
        hasProperty(message, 'content', isChatContent) &&
        checkType<UserChatMessage>(message);
}

export function isSystemMessage(message: unknown): message is SystemChatMessage {
    return isObject(message) &&
        hasSpecificEnum(message, 'role', ChatMessageRole, ChatMessageRole.System as const) &&
        hasString(message, 'content') &&
        checkType<SystemChatMessage>(message);
}

