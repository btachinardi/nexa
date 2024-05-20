import { PromptRegionModifier, PromptTokenModifier } from "@core/ai/chats/generation/ChatGenerationPrompt"

export function formatOpenToken(text: string, format: PromptTokenModifier) {
  return `${format.open.prefix}${text}${format.open.suffix}`
}

export function formatCloseToken(text: string, format: PromptTokenModifier) {
  return `${format.close.prefix}${text}${format.close.suffix}`
}

export function formatText(text: string, modifiers: PromptRegionModifier) {
  return `${modifiers.open}${text}${modifiers.close}`
}

