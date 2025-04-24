import { useState } from 'react';
import type { ChatMessageProps } from '../types';

export function useChatState() {
  const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([]);
  const [chatTurn, setChatTurn] = useState(1);

  const handleSendChat = (msg: string) => {
    if (!msg) return;
    setChatHistory((h) => [
      ...h,
      { text: (chatTurn === 1 ? 'P1: ' : 'P2: ') + msg, isUser: chatTurn === 1 },
    ]);
    setChatTurn((t) => (t === 1 ? 2 : 1));
  };

  return {
    chatHistory,
    handleSendChat,
  };
}
