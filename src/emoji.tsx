import React from 'react';

function Emoji({ label, symbol }: { label?: string; symbol: React.ReactNode; }) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label || ''}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  );
}
export default Emoji;
