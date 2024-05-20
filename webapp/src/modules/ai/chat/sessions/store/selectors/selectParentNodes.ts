import { selectSession } from '@/modules/ai/chat/sessions/store/selectors/selectSession';
import { ChatMessageNodeContainer } from '@core/ai/chats/sessions/ChatMessageNode';
import { createSelector } from '@reduxjs/toolkit';


export const selectParentNodes = createSelector([selectSession],
  (session) => {
    let parent: ChatMessageNodeContainer = session;

    const messageNodes: ChatMessageNodeContainer[] = [];
    while (parent) {
      messageNodes.push(parent);
      parent = parent.children[parent.selectedIndex];
    }
    return messageNodes;
  }
);
