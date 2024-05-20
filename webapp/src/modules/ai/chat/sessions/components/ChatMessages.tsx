import { ChatBubble } from '@/modules/ai/chat/sessions/components/ChatBubble';
import useElementSize from '@/shared/hooks/useElementSize';
import { ChatMessageNode } from '@core/ai/chats/sessions/ChatMessageNode';
import { css } from '@styles/css';
import React, { useEffect, useRef } from 'react';


export const ChatMessages: React.FC<{ nodes: ChatMessageNode[] }> = ({ nodes }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [contentRef, size] = useElementSize();

  useEffect(() => {
    if (!scrollRef.current) throw new Error("Scroll ref is not defined");
    if (!size) return;

    const isAtBottom = scrollRef.current.scrollHeight - size.height.delta - scrollRef.current.scrollTop - scrollRef.current.clientHeight < 1;
    console.log("isAtBottom", isAtBottom, scrollRef.current.scrollHeight, size.height.delta, scrollRef.current.scrollTop, scrollRef.current.clientHeight);
    if (isAtBottom) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [size, scrollRef]);

  return (
    <div ref={scrollRef} className={css({
      "&::-webkit-scrollbar": {
        width: "md.100",
      },
      "&::-webkit-scrollbar-track": {
        cursor: "default",
        borderRadius: "infinite",
        border: "solid 6px transparent",
        borderColor: "bg.200",
        marginY: "1px",
        background: "bg.400",
      },
      "&::-webkit-scrollbar-thumb": {
        cursor: "default",
        borderRadius: "infinite",
        border: "solid 6px transparent",
        borderColor: "bg.200",
        background: "primary.700",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "primary.600",
      },
      flexGrow: 1,
      overflowY: "scroll",
      paddingY: "md.100"
    })}>
      <div ref={contentRef} className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: "md.100",
      })}>
        {nodes.map((node, index) => (
          <ChatBubble key={index} node={node} />
        ))}
      </div>

    </div>
  );
};
