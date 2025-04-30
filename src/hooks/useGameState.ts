import { useState } from 'react';
import type { PlayerScores } from '../types';

export function useGameState() {
  const [scores, setScores] = useState<PlayerScores>({ 1: 0, 2: 0 });
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const [generatedWord, setGeneratedWord] = useState<string>('');
  const [trueWord, setTrueWord] = useState<string>('');

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
