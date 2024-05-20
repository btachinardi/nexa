import { selectNodes } from "@/modules/ai/chat/sessions/store/selectors/selectNodes";
import { createSelector } from "@reduxjs/toolkit";

export const selectNodeAt = (index?: number) => {
  return createSelector([selectNodes],
    (nodes) => {
      if (!index) {
        return nodes[nodes.length - 1];
      }
      return nodes[index - 1];
    }
  );
}
