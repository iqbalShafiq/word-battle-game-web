import { useState } from 'react';
import type { PlayerScores, PlayerScoreData } from '../types';

export function useGameState() {
  const [scores, setScoresState] = useState<PlayerScores>({
    1: { id: '', name: '', score: 0 },
    2: { id: '', name: '', score: 0 },
  });
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const [generatedWord, setGeneratedWord] = useState<string>('');
  const [trueWord, setTrueWord] = useState<string>('');

  const setScores = (playerScores: PlayerScoreData[]) => {
    const mapped: PlayerScores = {
      1: { id: '', name: '', score: 0 },
      2: { id: '', name: '', score: 0 },
    };
    playerScores.forEach((ps, idx) => {
      const key = (idx + 1) as 1 | 2;
      mapped[key] = { id: ps.playerId, name: ps.playerName, score: ps.totalScore };
    });
    setScoresState(mapped);
  };

  const handleGuess = (guess: string) => {
    if (!guess) return;

    if (guess.toLowerCase() === trueWord.toLowerCase()) {
      setGuessHistory((h) => [...h, `You have guessed "${guess}" correctly! 🎉`]);
    } else {
      setGuessHistory((h) => [...h, `You have guessed "${guess}" - Wrong!`]);
    }
  };

  return {
    scores,
    setScores,
    guessHistory,
    handleGuess,
    generatedWord,
    setGeneratedWord,
    trueWord,
    setTrueWord,
  };
}
