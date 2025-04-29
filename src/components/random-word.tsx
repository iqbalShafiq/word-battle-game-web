type RandomWordProps = { word: string };

/**
 * RandomWord component displays the current word as underscores.
 * @param word - The word to be displayed as underscores.
 */
export default function RandomWord({ word }: RandomWordProps) {
  return (
    <div className="text-2xl tracking-widest text-accent mb-4 font-bold bg-primary rounded-[10px] inline-block px-8 py-2 border-2 border-dashed border-info select-none">
      {word
        .split('')
        .map((c) => (c === ' ' ? ' ' : c))
        .join(' ')}
    </div>
  );
}
