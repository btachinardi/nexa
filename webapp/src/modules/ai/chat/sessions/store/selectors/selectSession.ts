import { ChatSessionState } from "@/modules/ai/chat/sessions/store/ChatSessionStore";

export const selectSession = (state: ChatSessionState) => state.session;

