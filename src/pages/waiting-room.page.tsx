import { useNavigate } from 'react-router-dom';
import Button from '../components/standard-button';
import { useState, useEffect } from 'react';
import Spinner from '../components/spinner';
import signalRService from '../services/signalr.service';
import { AllPlayersJoinedData, MatchFoundData } from '../types';
import { usePlayer } from '../hooks/usePlayer';
import { useToastStore } from '../store/toast.store';

export default function WaitingRoomPage() {
  const [isCancelling, setIsCancelling] = useState(false);
  const [match, setMatch] = useState<MatchFoundData | undefined>();
  const player = usePlayer();
  const setToast = useToastStore((state) => state.setToast);
  const navigate = useNavigate();

  useEffect(() => {
    if (!player) return;

    const handleMatchFound = (data: MatchFoundData) => {
      setMatch(data);
    };

    const connectAndJoin = async () => {
      await signalRService.startConnection();
      signalRService.on('MatchFound', handleMatchFound);

      try {
        await signalRService.invoke('JoinMatchMaking', player?.id);
      } catch (err) {
        console.error('Failed to join matchmaking:', err);
      }
    };

    connectAndJoin();

    return () => {
      signalRService.off('MatchFound', handleMatchFound);
    };
  }, [player]);

  useEffect(() => {
    const handlePlayersJoined = (data: AllPlayersJoinedData) => {
      console.log('All players joined:', data);
      navigate(`/game?gameId=${data.gameId}`);
    };

    signalRService.on('AllPlayersJoined', handlePlayersJoined);

    return () => {
      signalRService.off('AllPlayersJoined', handlePlayersJoined);
    };
  }, [navigate]);

  useEffect(() => {
    const handlePlayerLeft = (data: string) => {
      console.log('Player left:', data);
      console.log('Matchmaking failed, other player left the game');
      setToast('Matchmaking failed, other player left the game!');
      navigate('/login');
    };

    signalRService.on('MatchMakingFailed', handlePlayerLeft);

    return () => {
      signalRService.off('MatchMakingFailed', handlePlayerLeft);
    };
  }, [navigate, setToast]);

  const handleJoinGame = async () => {
    console.log('Joining game...');
    const gameId = match?.gameId;
    navigate(`/game?gameId=${gameId}`);
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    await signalRService.invoke('LeaveMatchMaking', player?.id);
    setToast('Matchmaking cancelled!');
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary">
      {/* Card utama waiting room */}
      <div className="bg-white/10 rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center max-w-md w-full relative animate-fade-in">
        <h1 className="text-3xl font-bold text-accent mb-2">Waiting Room</h1>
        {/* Avatar dan slot lawan */}
        <div className="flex items-center gap-6 my-6">
          <div className="flex flex-col items-center">
            <img
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=You"
              alt="You"
              className="w-14 h-14 rounded-full border-2 border-accent"
            />
            <span className="text-accent text-xs mt-1">You</span>
          </div>
          <svg className="w-8 h-8 text-accent animate-pulse" fill="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" stroke="#ffc857" strokeWidth="3" opacity="0.5" />
            <path d="M16 8v8l6 3" stroke="#ffc857" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col items-center opacity-60">
            <img
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=Waiting"
              alt="Waiting"
              className="w-14 h-14 rounded-full border-2 border-accent/40"
            />
            <span className="text-accent/60 text-xs mt-1">Waiting...</span>
          </div>
        </div>
        {/* Pesan dan spinner */}
        {match ? (
          <div className="text-md font-semibold text-success mt-2 text-center">
            Match found! Preparing to start the game...
          </div>
        ) : (
          <div className="text-md font-semibold text-textmuted mb-2 text-center">
            Menunggu pemain lain untuk matchmaking...
          </div>
        )}
        <div className="flex flex-col items-center w-full">
          {/* Spinner dan progress bar */}
          <Spinner />
        </div>
        {match ? (
          <Button onClick={handleJoinGame}>Join Game</Button>
        ) : (
          <Button
            className="cursor-pointer w-48 py-2 text-md rounded-full bg-white/20 backdrop-blur-md text-danger font-bold flex items-center justify-center gap-2 shadow-lg border-none hover:bg-danger hover:text-white transition-colors duration-200 mb-2"
            onClick={handleCancel}
            disabled={isCancelling}
          >
            {isCancelling ? 'Membatalkan...' : 'Batalkan'}
          </Button>
        )}
        {/* Tips/info */}
        <div className="text-xs text-accent/70 mt-2 text-center italic">
          Tips: Sabar menunggu, gunakan waktu ini untuk menyiapkan strategi!
        </div>
      </div>
    </div>
  );
}
