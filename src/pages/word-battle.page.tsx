import { useSearchParams } from 'react-router-dom';
import GuessForm from '../components/guess-form';
import GuessHistory from '../components/guess-history';
import PlayerScoreBoard from '../components/player-score-board';
import RandomWord from '../components/random-word';
import RoomChat from '../components/room-chat';
import { useChatState } from '../hooks/useChatState';
import { useGameState } from '../hooks/useGameState';
import { useEffect } from 'react';
import { RoundStartedData } from '../types';
import signalRService from '../services/signalr.service';
import { toast } from 'sonner';
import { usePlayer } from '../hooks/usePlayer';

export default function WordBattlePage() {
  const player = usePlayer();
  const { scores, guessHistory, handleGuess, generatedWord, setGeneratedWord, setTrueWord } =
    useGameState();
  const { chatHistory, handleSendChat } = useChatState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const connectAndJoin = async () => {
      const gameId = searchParams.get('gameId');

      await signalRService.startConnection();
      try {
        await signalRService.invoke('JoinGame', gameId, player?.id);
      } catch (error) {
        console.error('Failed to start round:', error);
        toast.error('Failed to start round. Please try again.');
      }
    };

    connectAndJoin();

    return () => {
      signalRService.stopConnection();
    };
  }, []);

  useEffect(() => {
    const handleRoundStarted = (data: RoundStartedData) => {
      console.log('Round started:', data);
      setGeneratedWord(data.generatedWord);
      setTrueWord(data.trueWord);
    };

    signalRService.on('RoundStarted', handleRoundStarted);

    return () => {
      signalRService.off('RoundStarted', handleRoundStarted);
    };
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen w-screen bg-primary">
      <div className="flex flex-row bg-none rounded-[22px] shadow-xl m-auto max-h-[90vh] h-[90vh]">
        <div className="bg-secondary rounded-l-[22px] p-10 max-w-[420px] w-full flex flex-col items-stretch max-h-[90vh] h-full overflow-auto">
          <h1 className="text-center text-accent tracking-wider mt-0 text-3xl font-bold">
            Word Battle Game
          </h1>
          <PlayerScoreBoard scores={scores} />
          <div className="text-center mt-6">
            <RandomWord word={generatedWord} />
            <GuessForm onGuess={handleGuess} wordLength={generatedWord.length} />
          </div>
          <GuessHistory history={guessHistory} />
        </div>
        <RoomChat chatHistory={chatHistory} onSend={handleSendChat} />
      </div>
    </div>
  );
}
