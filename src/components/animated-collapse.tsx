import { useState, useRef } from 'react';

interface AnimatedCollapseProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCollapse({
  title,
  children,
  className = '',
}: AnimatedCollapseProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`w-full ${className}`.trim()}>
      <button
        type="button"
        className="w-full flex justify-between items-center cursor-pointer text-accent font-semibold focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <svg
          className={`transition-transform duration-300 ml-2 ${open ? 'rotate-90' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M7 7l3 3 3-3"
            stroke="#ffc857"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight : 0,
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
        }}
        aria-hidden={!open}
      >
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
