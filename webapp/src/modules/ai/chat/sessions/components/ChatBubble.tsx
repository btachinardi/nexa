import LoadingDots from '@/shared/components/LoadingDots';
import Bionic from '@/shared/components/texts/Bionic';
import { chatContentToString } from '@core/ai/chats/sessions/ChatContent';
import { isAssistantMessage } from '@core/ai/chats/sessions/ChatMessage';
import { ChatMessageNode } from '@core/ai/chats/sessions/ChatMessageNode';
import { css } from '@styles/css';
import React, { useEffect, useState } from 'react';


export const ChatBubble: React.FC<{ node: ChatMessageNode; }> = ({ node }) => {
  const [state, setState] = useState<{ content: string, chunks: string[] }>({ content: "", chunks: [] });
  const isAssistant = isAssistantMessage(node.message);

  useEffect(() => {
    if (node.message.content) {
      const content = chatContentToString(node.message.content);
      const newContent = content.replace(state.content, "").split("\n");
      const newChunks = newContent.flatMap((line, index) => index < newContent.length - 1 ? [line, "\n"] : [line]);
      setState({ content: content, chunks: [...state.chunks, ...newChunks] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.message.content]);

  return (
    <div className={css({ display: "flex", justifyContent: isAssistant ? "flex-start" : "flex-end" })}>
      <div className={css({
        paddingY: "md.100",
        paddingX: "md.300",
        borderRadius: "md",
        backgroundColor: isAssistant ? "bg.600" : "primary.500",
        color: "text.100",
        width: "80%",
        maxWidth: "800px",
        textAlign: "left"
      })}>
        {
          (isAssistantMessage(node.message) && !node.message.isCompleted) ?
            (
              (!state.content || state.content.trim() === "") ?
                <LoadingDots />
                : state.chunks.map((chunk, index) => {
                  if (chunk == "\n") {
                    return <br key={index} />;
                  } else {
                    return <span key={index} className={css({ animation: "fadeIn 0.3s ease-in-out forwards", })}>{chunk}</span>
                  }
                })
            ) : state.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                <Bionic text={line} />
                {index < state.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))
        }
      </div>
    </div >
  );
};
