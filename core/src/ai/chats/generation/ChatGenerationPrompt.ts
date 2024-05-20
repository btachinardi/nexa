import { checkType, hasProperty, hasString, isObject } from "@core/utils/Guards";

export interface PromptTextModifier {
  prefix: string,
  suffix: string,
}
export interface PromptTokenModifier {
  open: PromptTextModifier,
  close: PromptTextModifier,
}

export interface PromptRegionModifier {
  open: string,
  close: string,
}
export interface PromptChatModifier {
  session: PromptRegionModifier,
  message: PromptRegionModifier,
  roleHeader: PromptRegionModifier,
}

export interface ChatGenerationPrompt {
  token: PromptTokenModifier;
  chat: PromptChatModifier
}

export function isChatGenerationPrompt(value: unknown): value is ChatGenerationPrompt {
  return isObject(value) &&
    hasProperty(value, 'token', isPromptTokenModifier) &&
    hasProperty(value, 'chat', isPromptChatModifier) &&
    checkType<ChatGenerationPrompt>(value);
}

export function isPromptChatModifier(value: unknown): value is PromptChatModifier {
  return isObject(value) &&
    hasProperty(value, 'session', isPromptRegionModifier) &&
    hasProperty(value, 'message', isPromptRegionModifier) &&
    hasProperty(value, 'roleHeader', isPromptRegionModifier) &&
    checkType<PromptChatModifier>(value);
}

export function isPromptRegionModifier(value: unknown): value is PromptRegionModifier {
  return isObject(value) &&
    hasString(value, 'open') &&
    hasString(value, 'close') &&
    checkType<PromptRegionModifier>(value);
}

export function isPromptTokenModifier(value: unknown): value is PromptTokenModifier {
  return isObject(value) &&
    hasProperty(value, 'open', isPromptTextModifier) &&
    hasProperty(value, 'close', isPromptTextModifier) &&
    checkType<PromptTokenModifier>(value);
}

export function isPromptTextModifier(value: unknown): value is PromptTextModifier {
  return isObject(value) &&
    hasString(value, 'prefix') &&
    hasString(value, 'suffix') &&
    checkType<PromptTextModifier>(value);
}

