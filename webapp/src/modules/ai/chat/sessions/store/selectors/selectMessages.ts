import { selectNodes } from '@/modules/ai/chat/sessions/store/selectors/selectNodes';
import { createSelector } from '@reduxjs/toolkit';

export const selectMessages = createSelector([selectNodes], (nodes) => nodes.map(node => node.message));