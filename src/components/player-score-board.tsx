import type { PlayerProps, PlayersProps } from '../types';
import { usePlayer } from '../hooks/usePlayer';

function Player({ name, score, scoreClass }: PlayerProps) {
  return (
    <div className="flex-1 mx-2 bg-primary border-2 border-border rounded-[10px] p-4 text-center text-indigo-100">
      <div>{name}</div>
      <div className={`font-bold text-lg ${scoreClass}`}>{score}</div>
    </div>
  );
}

/**
 * Players component displays the scores of both players.
 * @param scores - The scores for player 1 and player 2.
 */
export default function PlayerScoreBoard({ scores }: PlayersProps) {
  const player = usePlayer();
  
  // Ambil playerScores dari scores (asumsi sudah diurutkan)
  const playerNames = [scores[1]?.name || 'Player 1', scores[2]?.name || 'Player 2'];
  const playerIds = [scores[1]?.id, scores[2]?.id];
  const playerScores = [scores[1]?.score ?? 0, scores[2]?.score ?? 0];

  const formatName = (name: string, id?: string) => {
    const firstWord = name.split(' ')[0];
    let display = firstWord.length > 6 ? firstWord.slice(0, 6) + '...' : firstWord;
    if (player && id === player.id) display += ' (You)';
    return display;
  };

  return (
    <div className="flex justify-between my-4">
      <Player
        name={formatName(playerNames[0], playerIds[0])}
        score={playerScores[0]}
        scoreClass="text-success"
      />
      <Player
        name={formatName(playerNames[1], playerIds[1])}
        score={playerScores[1]}
        scoreClass="text-danger"
      />
    </div>
  );
}
