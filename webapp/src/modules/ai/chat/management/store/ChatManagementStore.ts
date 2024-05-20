// Start Generation Here
import { createOwnerSession, deleteOwnerSession, getOwnerSession, updateOwnerSession } from '@/modules/ai/chat/management/actions/ChatOwnerActions';
import { ChatSession } from '@core/ai/chats/sessions/ChatSession';
import { ChatSessionContainer } from '@core/ai/chats/sessions/ChatSessionContainer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ChatManagementState {
  currentOwner: ChatSessionContainer | null;
  sessions: Record<string, ChatSession>;
}

const initialState: ChatManagementState = {
  currentOwner: null,
  sessions: {}
};

const chatManagementSlice = createSlice({
  name: 'chatManagement',
  initialState,
  reducers: {
    setCurrentOwner: (state, action) => {
      state.currentOwner = action.payload;
    },
    clearCurrentOwner: (state) => {
      state.currentOwner = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.sessions[action.meta.arg.sessionId] = action.payload;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.sessions[action.meta.arg.sessionId] = action.payload;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        delete state.sessions[action.meta.arg.sessionId];
      });
  }
});

export const { setCurrentOwner, clearCurrentOwner } = chatManagementSlice.actions;

export const createSession = createAsyncThunk('chatManagement/createSession', async (ownerId: string) => {
  return await createOwnerSession(ownerId);
});

export const fetchSession = createAsyncThunk('chatManagement/fetchSession', async ({ ownerId, sessionId }: { ownerId: string; sessionId: string }) => {
  return await getOwnerSession(ownerId, sessionId);
});

export const updateSession = createAsyncThunk('chatManagement/updateSession', async ({ ownerId, sessionId, data }: { ownerId: string; sessionId: string; data: any }) => {
  return await updateOwnerSession(ownerId, sessionId, data);
});

export const deleteSession = createAsyncThunk('chatManagement/deleteSession', async ({ ownerId, sessionId }: { ownerId: string; sessionId: string }) => {
  await deleteOwnerSession(ownerId, sessionId);
});

export default chatManagementSlice.reducer;
