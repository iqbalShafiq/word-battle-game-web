export type GuessFormProps = {
  onGuess: (guess: string) => void;
  wordLength: number;
};

export type GuessHistoryProps = {
  history: string[];
};

export type PlayerScores = Record<1 | 2, number>;

export type PlayersProps = {
  scores: PlayerScores;
};

export type PlayerProps = {
  name: string;
  score: number;
  scoreClass?: string;
};

export type RoomChatProps = {
  chatHistory: ChatMessageProps[];
  onSend: (msg: string) => void;
};

export type ChatInputProps = {
  msg: string;
  setMsg: (v: string) => void;
  onSend: (msg: string) => void;
};

export type ChatMessageProps = {
  text: string;
  isUser: boolean;
};

export type ChatHistoryProps = {
  chatHistory: ChatMessageProps[];
  chatRef: React.RefObject<HTMLDivElement | null>;
};

// Generic API response type
export interface ApiResponse<T = undefined> {
  data?: T;
  message: string;
  code: number;
}

// Login data type
export interface LoginData {
  token: string;
  player: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  refreshToken: string;
}
