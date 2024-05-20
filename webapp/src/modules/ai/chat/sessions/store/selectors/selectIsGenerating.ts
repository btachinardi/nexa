import { ChatSessionState } from "@/modules/ai/chat/sessions/store/ChatSessionStore";

export const selectIsGenerating = (state: ChatSessionState) => state.isGenerating;
