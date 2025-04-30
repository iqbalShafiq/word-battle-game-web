import { useState } from 'react';
import type { PlayerScores } from '../types';

export function useGameState() {
  const [scores, setScores] = useState<PlayerScores>({ 1: 0, 2: 0 });
  const [turn, setTurn] = useState<1 | 2>(1);
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const [generatedWord, setGeneratedWord] = useState<string>('');
  const [trueWord, setTrueWord] = useState<string>('');

  const handleGuess = (guess: string) => {
    if (!guess) return;

    if (guess.toLowerCase() === trueWord.toLowerCase()) {
      setGuessHistory((h) => [...h, `Player ${turn} guessed "${guess}" correctly! 🎉`]);
      setScores((score) => ({ ...score, [turn]: score[turn] + 1 }));
    } else {
      setGuessHistory((h) => [...h, `Player ${turn} guessed "${guess}" - Wrong!`]);
      setTurn((t) => (t === 1 ? 2 : 1));
    }
  };

  return {
    scores,
    turn,
    guessHistory,
    handleGuess,
    generatedWord,
    setGeneratedWord,
    trueWord,
    setTrueWord,
  };
}
