import { addChatMessage } from "@/modules/ai/chat/sessions/store/actions/addChatMessage";
import { selectLastNode } from "@/modules/ai/chat/sessions/store/selectors/selectLastNode";
import { selectNodes } from "@/modules/ai/chat/sessions/store/selectors/selectNodes";
import { getAbortController } from "@/shared/actions/getAbortController";
import { Assistant } from "@core/ai/assistants/Assistant";
import { ChatGenerationProvider } from "@core/ai/chats/generation/providers";
import { chatServerRunner, localChatServer } from "@core/ai/chats/generation/providers/ChatServer";
import { ChatMessageRole, isAssistantMessage } from "@core/ai/chats/sessions/ChatMessage";
import { ChatSession } from "@core/ai/chats/sessions/ChatSession";
import { TextGenerationChunk, TextGenerationChunkType } from "@core/ai/generation/text/TextGenerationChunk";
import { TextGenerationProvider } from "@core/ai/generation/text/providers";
import { Transient } from "@core/domains/AggregateRoot";
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";


export interface ChatSessionState {
  isGenerating: boolean;
  session: ChatSession | Transient<ChatSession>;
  provider: TextGenerationProvider | ChatGenerationProvider;
  assistant: Assistant;
}

const slice = createSlice({
  name: 'chat',
  initialState: {} as ChatSessionState,
  reducers: {
    addChunk: (state, { payload }: { payload: { chunk: TextGenerationChunk } }) => {
      const lastNode = selectLastNode(state);
      if (!lastNode) {
        throw new Error("Cannot add chunk because no message is being generated.");
      }

      if (lastNode.message.role !== ChatMessageRole.Assistant) {
        throw new Error("Cannot add chunk because the last message is not from the assistant.");
      }

      if (payload.chunk.type === TextGenerationChunkType.Output) {
        lastNode.message.content += payload.chunk.content;
      }
    },
    addUserMessage: (state, { payload: { content } }: { payload: { content: string } }) => {
      addChatMessage(state, { role: ChatMessageRole.User, content });
    },
    editUserMessage: (state, { payload: { index, content } }: { payload: { index: number, content: string } }) => {
      addChatMessage(state, { role: ChatMessageRole.User, content }, index - 1);
    },
    startGeneration: (state, { payload: { index } }: { payload: { index?: number } }) => {
      state.isGenerating = true;
      addChatMessage(state, { role: ChatMessageRole.Assistant, content: "", isCompleted: false }, index);
    },
    finishGeneration: (state) => {
      state.isGenerating = false;
      const lastNode = selectLastNode(state);

      if (!isAssistantMessage(lastNode.message)) {
        console.error("Should not be stopping generation when the last message is not from the assistant.");
        return;
      }

      lastNode.message.isCompleted = true;
    }
  },
});

export const { startGeneration, finishGeneration, addChunk, addUserMessage, editUserMessage } = slice.actions;
export const generateResponse = createAsyncThunk('chat/generate', async ({ index }: { index?: number; }, { getState, dispatch }) => {
  const state = getState() as ChatSessionState;
  const runner = chatServerRunner(localChatServer(state.provider), state.session.assistant.options);
  dispatch(startGeneration({ index }));
  const messages = selectNodes(state).map(node => node.message);
  for await (const chunk of runner(messages, getAbortController(state.session.id).signal)) {
    dispatch(addChunk({ chunk }));
  }
  dispatch(finishGeneration());
});

export const stopGeneration = createAsyncThunk('chat/stop', async ({ sessionId }: { sessionId?: string }, { dispatch }) => {
  getAbortController(sessionId).abort();
  dispatch(finishGeneration());
});

export const sendMessage = createAsyncThunk('chat/send', async ({ message }: { message: string; }, { getState, dispatch }) => {
  const state = getState() as ChatSessionState;
  if (state.isGenerating) return;

  dispatch(addUserMessage({ content: message }));
  await dispatch(generateResponse({}));
});


export function useSessionStore(
  session: ChatSession | Transient<ChatSession>,
  provider: TextGenerationProvider | ChatGenerationProvider,
  assistant: Assistant
) {

  return {
    actions: {
      ...slice.actions,
      generateResponse,
      stopGeneration,
      sendMessage,
    },
    store: configureStore({
      preloadedState: {
        session,
        provider,
        assistant,
        isGenerating: false
      },
      reducer: slice.reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    })
  };
}