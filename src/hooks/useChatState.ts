import { useState, useEffect } from 'react';
import type { ChatMessageProps, ReceivedMessageData } from '../types';
import signalRService from '../services/signalr.service';
import { usePlayer } from './usePlayer';
import { useSearchParams } from 'react-router-dom';

export function useChatState() {
  const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([]);
  const player = usePlayer();
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get('gameId');

  useEffect(() => {
    const handleReceiveChat = (newChat: ReceivedMessageData) => {
      setChatHistory((prev) => [...prev, { text: newChat.message, isUser: newChat.playerId === player?.id }]);
    };
    signalRService.on('ReceiveChat', handleReceiveChat);
    return () => signalRService.off('ReceiveChat', handleReceiveChat);
  }, [player]);

  const handleSendChat = (msg: string) => {
    if (!msg || !player?.id || !gameId) return;
    signalRService.invoke('SendChat', gameId, player.id, msg);
  };

  return {
    chatHistory,
    handleSendChat,
  };
}
