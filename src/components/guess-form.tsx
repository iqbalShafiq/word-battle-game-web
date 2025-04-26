import { useState } from 'react';
import { GuessFormProps } from '../types';
import Button from './standard-button';
import Input from './form-input';

/**
 * GuessForm component provides an input and button for submitting guesses.
 * @param onGuess - Function to handle guess submission.
 * @param wordLength - The length of the word to guess.
 */
export default function GuessForm({ onGuess, wordLength }: GuessFormProps) {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuess(guess);
    setGuess('');
  };

  return (
    <form
      className="flex flex-col items-center gap-4 mt-4"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Type your guess..."
        autoComplete="off"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        maxLength={wordLength}
      />
      <Button type="submit" disabled={!guess}>
        Guess
      </Button>
    </form>
  );
}
