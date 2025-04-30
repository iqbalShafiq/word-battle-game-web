import { useState } from 'react';
import { GuessFormProps } from '../types';
import Button from './standard-button';
import Input from './form-input';
import signalRService from '../services/signalr.service';
import { toast } from 'sonner';
import { getErrorMessage } from '../lib/utils';

/**
 * GuessForm component provides an input and button for submitting guesses.
 * @param onGuess - Function to handle guess submission.
 * @param wordLength - The length of the word to guess.
 * @param roundId - The ID of the current round.
 * @param playerId - The ID of the current player.
 */
export default function GuessForm({
  onGuess,
  wordLength,
  roundId,
  playerId,
}: GuessFormProps & { roundId: string; playerId: string }) {
  const [guess, setGuess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess || !roundId || !playerId) return;
    setSubmitting(true);
    try {
      await signalRService.invoke('SubmitAnswer', roundId, playerId, guess);
      onGuess(guess);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    } finally {
      setGuess('');
      setSubmitting(false);
    }
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
      <Button type="submit" disabled={!guess || submitting}>
        Guess
      </Button>
    </form>
  );
}
