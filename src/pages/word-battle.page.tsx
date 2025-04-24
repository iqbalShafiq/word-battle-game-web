import GuessForm from '../components/GuessForm';
import GuessHistory from '../components/GuessHistory';
import Players from '../components/Players';
import RandomWord from '../components/RandomWord';
import RoomChat from '../components/RoomChat';
import { useChatState } from '../hooks/useChatState';
import { useGameState } from '../hooks/useGameState';

export default function WordBattlePage() {
  const { scores, currentWord, guessHistory, handleGuess } = useGameState();
  const { chatHistory, handleSendChat } = useChatState();

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen w-screen bg-primary">
      <div className="flex flex-row bg-none rounded-[22px] shadow-xl m-auto max-h-[90vh] h-[90vh]">
        <div className="bg-secondary rounded-l-[22px] p-10 max-w-[420px] w-full flex flex-col items-stretch max-h-[90vh] h-full overflow-auto">
          <h1 className="text-center text-accent tracking-wider mt-0 text-3xl font-bold">
            Word Battle Game
          </h1>
          <Players scores={scores} />
          <div className="text-center mt-6">
            <RandomWord word={currentWord} />
            <GuessForm onGuess={handleGuess} wordLength={currentWord.length} />
          </div>
          <GuessHistory history={guessHistory} />
        </div>
        <RoomChat chatHistory={chatHistory} onSend={handleSendChat} />
      </div>
    </div>
  );
}
