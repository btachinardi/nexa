import { ChatSession, isChatSession } from "@core/ai/chats/sessions/ChatSession";
import { AggregateRoot, isAggregateRoot } from "@core/domains/AggregateRoot";
import { checkType, hasArray, hasNumber } from "@core/utils/Guards";

export interface ChatSessionContainer extends AggregateRoot {
  selectedIndex: number;
  sessions: ChatSession[];
}

export function isChatSessionContainer(value: unknown): value is ChatSessionContainer {
  return isAggregateRoot(value) &&
    hasNumber(value, 'selectedIndex') &&
    hasArray(value, 'sessions', isChatSession) &&
    checkType<ChatSessionContainer>(value);
}
