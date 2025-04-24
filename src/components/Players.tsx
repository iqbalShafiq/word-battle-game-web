import type { PlayerProps, PlayersProps } from '../types';

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
export default function Players({ scores }: PlayersProps) {
  return (
    <div className="flex justify-between my-4">
      <Player name="Player 1" score={scores[1]} scoreClass="text-success" />
      <Player name="Player 2" score={scores[2]} scoreClass="text-danger" />
    </div>
  );
}
