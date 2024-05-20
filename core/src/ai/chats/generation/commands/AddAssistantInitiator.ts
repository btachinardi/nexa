import { AssistantChatMessage, ChatMessage, ChatMessageRole } from "@core/ai/chats/sessions/ChatMessage";


export function addAssistantInitiator(messages: ChatMessage[]): ChatMessage[] {
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role != ChatMessageRole.Assistant || (lastMessage as AssistantChatMessage).isCompleted) {
    messages = [...messages, { role: ChatMessageRole.Assistant, content: "", isCompleted: false }];
  }
  return messages;
}
