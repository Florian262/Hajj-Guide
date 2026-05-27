import React from 'react';
import Term from '../components/Term';

/**
 * Parses a string containing term markers and returns a React node array.
 *
 * Marker syntax:  [termKey|Display Text]
 * Example:        "Enter [ihram|Ihram] before arriving at Miqat."
 *
 * Non-marked text is returned as plain strings; marked text becomes <Term> buttons.
 */
export function renderTextWithTerms(text: string): React.ReactNode {
  if (!text || typeof text !== 'string') return text;

  // Split on [termKey|Text] markers
  const parts = text.split(/(\[[^\]|]+\|[^\]]+\])/g);

  return parts.map((part, i) => {
    // Match the marker pattern
    const match = part.match(/^\[([^\]|]+)\|([^\]]+)\]$/);
    if (match) {
      const [, termKey, displayText] = match;
      return (
        <Term key={`${termKey}-${i}`} termKey={termKey}>
          {displayText}
        </Term>
      );
    }
    // Plain text
    return part || null;
  });
}
