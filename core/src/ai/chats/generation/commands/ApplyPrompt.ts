import { PromptChatModifier } from "@core/ai/chats/generation/ChatGenerationPrompt";
import { chatContentToString } from "@core/ai/chats/sessions/ChatContent";
import { ChatMessage, isAssistantMessage } from "@core/ai/chats/sessions/ChatMessage";

export function applyChatPrompt(messages: ChatMessage[], promptChat: PromptChatModifier): string {
  const renderedMessages = messages.map(message => applyChatPromptToMessage(promptChat, message)).join("");
  return promptChat.session.open + renderedMessages + " ";
}

function applyChatPromptToMessage(promptChat: PromptChatModifier, message: ChatMessage): string {
  const contentString = chatContentToString(message.content);
  const messageString = promptChat.roleHeader.open + message.role + promptChat.roleHeader.close +
    promptChat.message.open + contentString;

  if (isAssistantMessage(message) && !message.isCompleted) {
    return messageString;
  }

  return messageString + promptChat.message.close;
}

