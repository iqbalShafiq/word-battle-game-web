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

// Player data type
export interface PlayerData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Player stats data type
export interface PlayerStats {
  totalScore: number;
  totalGames: number;
  win: number;
  lose: number;
  draw: number;
}

// Login data type
export interface LoginData {
  token: string;
  player: PlayerData;
  refreshToken: string;
}

// Register data type
export interface RegisterData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Match has found type
export interface MatchFoundData {
  gameId: string;
  matchedPlayerIds: string[];
}

// All players joined type
export interface AllPlayersJoinedData {
  gameId: string;
}

// Round started type
export interface RoundStartedData {
  roundId: string;
  generatedWord: string;
  trueWord: string;
  roundNumber: number;
}

// Round ended type
export interface RoundEndedData {
  trueWord: string;
  winnerPlayerId: string;
}

// Word correction type
export interface WordCorrectionData {
  trueWord: string;
}

// Received message type
export interface ReceivedMessageData {
  playerId: string;
  message: string;
}
