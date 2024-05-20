import { selectSession } from '@/modules/ai/chat/sessions/store/selectors/selectSession';
import { ChatMessageNode } from '@core/ai/chats/sessions/ChatMessageNode';
import { createSelector } from '@reduxjs/toolkit';

export const selectNodes = createSelector([selectSession],
  (session) => {
    if (!session) return [];

    let node = session.children[session.selectedIndex];

    const messageNodes: ChatMessageNode[] = [];
    while (node) {
      messageNodes.push(node);
      node = node.children[node.selectedIndex];
    }
    return messageNodes;
  }
);