import { ChatSessionState } from "@/modules/ai/chat/sessions/store/ChatSessionStore";
import { selectParentNodes } from "@/modules/ai/chat/sessions/store/selectors/selectParentNodes";


export const selectParentNodeAt = (state: ChatSessionState, index: number) => {
  const nodes = selectParentNodes(state);
  if (index < 0 || index >= nodes.length) {
    index = nodes.length - 1;
  }
  return nodes[index];
};

