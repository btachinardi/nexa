import { ChatSessionCard } from '@/modules/ai/chat/sessions/components/ChatSession';
import { Body } from '@/shared/components/Body';
import React from 'react';

const App: React.FC = () => {
  console.log("Hello there!")
  return (
    <Body>
      <ChatSessionCard />
      <ChatSessionCard />
    </Body >
  )
}

export default App
