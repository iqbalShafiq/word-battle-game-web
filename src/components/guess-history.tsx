import { GuessHistoryProps } from '../types';

/**
 * GuessHistory component displays the list of guess attempts.
 * @param history - Array of guess messages to display.
 */
export default function GuessHistory({ history }: GuessHistoryProps) {
  return (
    <div className="mt-6">
      <h4 className="text-accent mb-2 mt-0">Riwayat Jawaban</h4>
      <div className="bg-white/5 rounded-[10px] min-h-8 p-2 text-textmuted text-base max-h-[110px] overflow-y-auto">
        {history.length === 0 ? (
          <div className="italic">Belum ada jawaban</div>
        ) : (
          history.map((msg, i) => <div key={i} dangerouslySetInnerHTML={{ __html: msg }} />)
        )}
      </div>
    </div>
  );
}
