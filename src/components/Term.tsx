import React from 'react';
import { useStore } from '../store/useStore';

interface TermProps {
  termKey: string;
  children: React.ReactNode;
}

/**
 * <Term> wraps a glossary keyword in an interactive inline button.
 * Mobile-optimised: negative margins expand the touch hit-box
 * without affecting surrounding layout.
 */
const Term: React.FC<TermProps> = ({ termKey, children }) => {
  const setActiveGlossaryTerm = useStore((s) => s.setActiveGlossaryTerm);
  const activeGlossaryTerm = useStore((s) => s.activeGlossaryTerm);
  const isOpen = activeGlossaryTerm === termKey;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setActiveGlossaryTerm(isOpen ? null : termKey);
      }}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-label={`Open definition for ${String(children)}`}
      className={[
        // Expand the tap target without changing layout
        'relative -my-1 -mx-0.5 py-1 px-0.5',
        // Visual treatment
        'inline font-semibold cursor-pointer transition-all duration-150',
        'underline decoration-dotted decoration-1 underline-offset-2',
        'text-hajj-gold dark:text-hajj-gold',
        'hover:opacity-80 active:opacity-60 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hajj-gold/60',
        'rounded-sm',
      ].join(' ')}
    >
      {children}
    </button>
  );
};

export default Term;
