import { useSessionStore } from '@/modules/ai/chat/sessions/store/ChatSessionStore';
import { Assistant, assistant } from '@core/ai/assistants/Assistant';
import { system } from '@core/ai/chats/generation/middlewares/SystemMiddleware';
import { uncensored } from '@core/ai/chats/generation/middlewares/UncensoredMiddleware';
import { createSession } from '@core/ai/chats/sessions/ChatSession';
import { replicate } from '@core/ai/generation/text/providers/Replicate';
import React from 'react';
import { Provider } from 'react-redux';

const defaultProvider = replicate("r8_WTzXJnVPrT3xBoUANWJXctoAqbUaEFv1tvBxH");
// const defaultAssistant: Assistant = assistant(
//   'default', 'Default Assistant',
//   'A default assistant for general use.'
// );

const defaultAssistant: Assistant = assistant(
  'naughty', 'Naughty Assistant',
  'A naughty assistant for adult use.',
  {
    middlewares: [
      system("You are an erotic game master for roleplaying sessions, you should provide the user with a back and forth experience.\n\nAlways end with four options the user can choose on how to progress the story."),
      uncensored("Narrate the body anatomy and touches of movements. Present 4 options to the user.")
    ],
    parameters: {
      temperature: 0.5,
      maxTokens: 1000,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0
    }
  }
);

function loadSession(sessionId: string) {
  const sessionString = localStorage.getItem(`chat-session[${sessionId}]`);
  const session = sessionString ? JSON.parse(sessionString) : createSession(defaultAssistant);
  return session;
}

function getSessionById(sessionId?: string) {
  return sessionId ? loadSession(sessionId) : createSession(defaultAssistant);
}

export interface ChatSessionProviderProps {
  sessionId?: string;
  children: React.ReactNode;
}

export const ChatSessionProvider: React.FC<ChatSessionProviderProps> = ({ children, sessionId }) => {
  const session = useSessionStore(getSessionById(sessionId), defaultProvider, defaultAssistant);
  return <Provider store={session.store}>{children}</Provider>;
};
