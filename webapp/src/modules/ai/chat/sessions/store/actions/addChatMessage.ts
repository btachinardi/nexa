import { ChatSessionState } from "@/modules/ai/chat/sessions/store/ChatSessionStore";
import { selectParentNodeAt } from "@/modules/ai/chat/sessions/store/selectors/selectParentNodeAt";
import { ChatMessage } from "@core/ai/chats/sessions/ChatMessage";

export function addChatMessage(state: ChatSessionState, message: ChatMessage, parentIndex: number = -1) {
  const parentNode = selectParentNodeAt(state, parentIndex);
  if (!parentNode) {
    throw new Error("Parent node not found");
  }

  parentNode.selectedIndex = parentNode.children.length;
  parentNode.children.push({ index: parentNode.index + 1, message, children: [], selectedIndex: -1 });
}