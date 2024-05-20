import { Button } from '@/shared/components/buttons/Button';
import { css } from '@styles/css';
import React, { useEffect, useRef, useState } from 'react';

const maxRows = 6;
const lineHeight = 24;
const verticalPadding = 14;
const maxHeight = verticalPadding + (lineHeight * maxRows);

const adjustTextareaHeight = (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto'; // Reset height to recalculate
    const scrollHeight = textareaRef.current.scrollHeight;
    const rows = Math.ceil((scrollHeight - verticalPadding) / lineHeight);
    const height = Math.min((rows * lineHeight) + verticalPadding, maxHeight);
    textareaRef.current.style.height = `${height}px`;
    textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
  }
};

export const ChatInput: React.FC<{ onSend: (message: string) => void; visible?: boolean; }> = ({ onSend, visible }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    onSend(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    adjustTextareaHeight(textareaRef);
  }, [inputValue]);
  adjustTextareaHeight(textareaRef);

  const isVisible = visible ?? true;
  return isVisible ? (
    <div className={css({
      width: "100%",
      paddingTop: "md.100",
      borderTopColor: "bg.400",
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      gap: "md.100",
    })}>
      <label className={css({ display: "none" })} htmlFor="chat-input">Chat Input</label>
      <textarea
        ref={textareaRef}
        id="chat-input"
        rows={1}
        placeholder="Type your message here..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={css({
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
          _focusVisible: {
            outlineColor: "primary.900",
            outlineWidth: "2px",
            outlineStyle: "solid",
            outlineOffset: "1px",
          },
          overflowY: "scroll",
          borderRadius: "lg",
          borderColor: "bg.500",
          borderWidth: "2px",
          fontSize: "content.300",
          height: `${lineHeight + verticalPadding}px`,
          resize: "none",
          maxHeight: `${maxHeight}px`,
          width: "100%",
          paddingTop: `${Math.floor(verticalPadding / 2) - 1}px`,
          paddingBottom: `${Math.floor(verticalPadding / 2)}px`,
          paddingLeft: "md.100",
          paddingRight: "sm.700",
        })} />
      <Button onClick={handleSend}>Send</Button>
    </div>
  ) : null;
};
