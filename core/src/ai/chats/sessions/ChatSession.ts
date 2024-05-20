import { Assistant, isAssistant } from "@core/ai/assistants/Assistant";
import { ChatMessageNodeContainer, isNodeContainer } from "@core/ai/chats/sessions/ChatMessageNode";
import { AggregateRoot, Transient, isAggregateRoot } from "@core/domains/AggregateRoot";
import { checkType, hasProperty } from "@core/utils/Guards";

export interface ChatSession extends ChatMessageNodeContainer, AggregateRoot {
  readonly assistant: Assistant;
}

export function isChatSession(value: unknown): value is ChatSession {
  return isAggregateRoot(value) &&
    isNodeContainer(value) &&
    hasProperty(value, 'assistant', isAssistant) &&
    checkType<ChatSession>(value);
}

export function createSession(assistant: Assistant): Transient<ChatSession> {
  return {
    assistant,
    index: 0,
    children: [],
    selectedIndex: -1,
  }
}

