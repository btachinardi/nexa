import { ChatMessages } from '@/modules/ai/chat/sessions/components/ChatMessages';
import { ChatSessionProvider } from '@/modules/ai/chat/sessions/components/ChatSessionProvider';
import { ChatSessionState, sendMessage, stopGeneration } from '@/modules/ai/chat/sessions/store/ChatSessionStore';
import { selectIsGenerating } from '@/modules/ai/chat/sessions/store/selectors/selectIsGenerating';
import { selectNodes } from '@/modules/ai/chat/sessions/store/selectors/selectNodes';
import { ButtonType } from '@/shared/components/buttons';
import { Button } from '@/shared/components/buttons/Button';
import { Card } from '@/shared/components/cards/Card';
import { CardBody } from '@/shared/components/cards/CardBody';
import { CardHeader } from '@/shared/components/cards/CardHeader';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { css } from '@styles/css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatInput } from './ChatInput';

export interface ChatSessionCardProps {
  sessionId?: string;
}

export const ChatSessionCard: React.FC<ChatSessionCardProps> = ({ sessionId }) => {
  return (
    <ChatSessionProvider sessionId={sessionId}>
      <Card>
        <CardHeader>
          Chat
        </CardHeader>
        <CardBody>
          <ChatSessionView />
        </CardBody>
      </Card>
    </ChatSessionProvider>
  );
}

export const ChatSessionView: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<ChatSessionState, unknown, Action>>();
  const isGenerating = useSelector(selectIsGenerating);
  const chatMessageNodes = useSelector(selectNodes);

  const handleStopGeneration = () => {
    dispatch(stopGeneration({}));
  };

  const handleSendMessage = (message: string) => {
    dispatch(sendMessage({ message }));
  };

  return (
    <div className={css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignContent: "center",
      flexGrow: 1,
      height: "100%"
    })}>
      <ChatMessages nodes={chatMessageNodes} />
      <div className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}>
        <ChatInput onSend={handleSendMessage} visible={!isGenerating} />
        <Button onClick={handleStopGeneration} type={ButtonType.Outline} visible={isGenerating}>Stop Generating</Button>
      </div>
    </div>
  );
}
