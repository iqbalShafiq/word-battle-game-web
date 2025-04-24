import { useState } from 'react';
import type { PlayerScores } from '../types';

const WORDS = ['apple', 'banana', 'cherry', 'grape', 'orange', 'lemon'];

export function useGameState() {
  const [scores, setScores] = useState<PlayerScores>({ 1: 0, 2: 0 });
  const [turn, setTurn] = useState<1 | 2>(1);
  const [currentWord, setCurrentWord] = useState(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guessHistory, setGuessHistory] = useState<string[]>([]);

  const pickRandomWord = () => {
    setCurrentWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  };

  const handleGuess = (guess: string) => {
    if (!guess) return;
    if (guess.length === currentWord.length) {
      setGuessHistory((h) => [...h, `Player ${turn} guessed "${guess}" correctly! 🎉`]);
      setScores((score) => ({ ...score, [turn]: score[turn] + 1 }));
      pickRandomWord();
    } else {
      setGuessHistory((h) => [...h, `Player ${turn} guessed "${guess}" - Wrong!`]);
      setTurn((t) => (t === 1 ? 2 : 1));
    }
  };

  return {
    scores,
    turn,
    currentWord,
    guessHistory,
    handleGuess,
  };
}
