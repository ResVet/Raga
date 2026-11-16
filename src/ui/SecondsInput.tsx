import { useEffect, useState } from 'react';

/**
 * Number field for the seconds of an OSPE station. The value is checked when the field is left or Enter
 * is pressed, not on every keystroke, so a number can be cleared and typed again without it jumping.
 */
export function SecondsInput({ value, onChange, min = 15, max = 300 }: { value: number; onChange: (n: number) => void; min?: number; max?: number }) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);
  const commit = () => {
    const n = parseInt(text, 10);
    const v = Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : value;
    setText(String(v));
    if (v !== value) onChange(v);
  };
  return (
    <input
      type="number"
      inputMode="numeric"
      className="num-input"
      min={min}
      max={max}
      step={5}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          commit();
        }
      }}
    />
  );
}
