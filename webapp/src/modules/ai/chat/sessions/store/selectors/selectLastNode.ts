import { selectNodes } from '@/modules/ai/chat/sessions/store/selectors/selectNodes';
import { createSelector } from '@reduxjs/toolkit';

export const selectLastNode = createSelector([selectNodes], (history) => {
  return history[history.length - 1];
});