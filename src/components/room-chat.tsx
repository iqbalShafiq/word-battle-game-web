import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './standard-button';
import Input from './form-input';
import type { ChatHistoryProps, ChatInputProps, ChatMessageProps, RoomChatProps } from '../types';

/**
 * ChatBubble component displays a single chat message bubble.
 * @param text - The message text to display.
 * @param isUser - Whether the message is sent by the user.
 */
function ChatBubble({ text, isUser }: ChatMessageProps) {
  return (
    <div
      className={`chat-bubble ${isUser ? 'user' : 'other'} max-w-[88%] px-4 py-2 rounded-[14px] mb-1 text-base break-words inline-block box-border ${isUser ? 'bg-chatbubble1 self-end text-success rounded-br-[6px]' : 'bg-chatbubble2 self-start text-danger rounded-bl-[6px]'}`}
    >
      {text}
    </div>
  );
}

/**
 * ChatHistory component renders the list of chat messages.
 * @param chatHistory - Array of chat messages with sender info.
 * @param chatRef - Ref for scrolling to the latest message.
 */
function ChatHistory({ chatHistory, chatRef }: ChatHistoryProps) {
  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 text-base max-w-full box-border"
    >
      {chatHistory.length === 0 ? (
        <div className="italic text-textmuted">Belum ada pesan</div>
      ) : (
        chatHistory.map((c, i) => <ChatBubble key={i} text={c.text} isUser={c.isUser} />)
      )}
    </div>
  );
}

/**
 * ChatInput component provides the input field and send button for typing messages.
 * @param msg - The current input value.
 * @param setMsg - Function to update the input value.
 * @param onSend - Function to handle sending a message.
 */
function ChatInput({ msg, setMsg, onSend }: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(msg);
    setMsg('');
  };
  return (
    <form
      className="flex gap-2 p-3 border-t border-border bg-chatbg w-full sticky bottom-0 mt-auto"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Ketik pesan..."
        autoComplete="off"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <Button type="submit" disabled={!msg}>
        Send
      </Button>
    </form>
  );
}

// Komponen utama RoomChat
/**
 * RoomChat is the main chat container component for the room chat feature.
 * It composes ChatHistory and ChatInput, and manages message state and scrolling.
 * @param chatHistory - Array of chat messages with sender info.
 * @param onSend - Function to handle sending a message.
 */
export default function RoomChat({ chatHistory, onSend }: RoomChatProps) {
  const [msg, setMsg] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleExitGame = () => {
    navigate('/login');
  };

  return (
    <div className="bg-chatbg rounded-r-[22px] w-[320px] flex flex-col border-l-2 border-border h-full max-h-[90vh]">
      <div className="bg-info text-secondary font-bold py-4 pl-8 text-lg rounded-tr-[22px] tracking-wide flex justify-between items-center pr-4">
        <span>Roomchat</span>
        <Button
          onClick={handleExitGame}
          className="bg-red-700 text-white px-3 py-1 rounded font-bold hover:bg-red-600 transition-colors text-sm"
        >
          Exit
        </Button>
      </div>
      <ChatHistory chatHistory={chatHistory} chatRef={chatRef} />
      <ChatInput msg={msg} setMsg={setMsg} onSend={onSend} />
    </div>
  );
}
