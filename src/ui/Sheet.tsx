import { useRef, useState, type PointerEvent, type ReactNode } from 'react';

export type SheetH = 'peek' | 'half' | 'full';
const ORDER: SheetH[] = ['peek', 'half', 'full'];

/** Bottom glass sheet for phones with three heights. Drag the grip or tap it to change height. */
export function Sheet({ h, onH, label, className, children, onRef }: { h: SheetH; onH: (h: SheetH) => void; label: string; className?: string; children: ReactNode; onRef?: (el: HTMLElement | null) => void }) {
  const el = useRef<HTMLElement | null>(null);
  const drag = useRef<{ y: number; h0: number; moved: boolean } | null>(null);
  const [live, setLive] = useState<number | null>(null);

  const heights = () => {
    const box = el.current!;
    const cs = getComputedStyle(box);
    const px = (v: string) => parseFloat(cs.getPropertyValue(v)) || 0;
    return { peek: px('--sheet-peek'), half: px('--sheet-half'), full: px('--sheet-full') };
  };
  const down = (e: PointerEvent<HTMLButtonElement>) => {
    if (!el.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y: e.clientY, h0: el.current.getBoundingClientRect().height, moved: false };
  };
  const move = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dy = d.y - e.clientY;
    if (Math.abs(dy) > 6) d.moved = true;
    if (!d.moved) return;
    const hs = heights();
    setLive(Math.max(hs.peek * 0.8, Math.min(hs.full, d.h0 + dy)));
  };
  const up = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      onH(ORDER[(ORDER.indexOf(h) + 1) % ORDER.length]);
      setLive(null);
      return;
    }
    const hs = heights();
    const cur = live ?? d.h0;
    const best = ORDER.reduce((a, b) => (Math.abs(hs[b] - cur) < Math.abs(hs[a] - cur) ? b : a), h);
    onH(best);
    setLive(null);
  };
  return (
    <aside
      ref={(n) => {
        el.current = n;
        onRef?.(n);
      }}
      className={`sheet glass ${className ?? ''} ${live !== null ? 'dragging' : ''}`}
      data-h={h}
      style={live !== null ? { height: live } : undefined}
    >
      <button
        className="sheet-grip"
        aria-label={label}
        aria-expanded={h !== 'peek'}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') onH(ORDER[Math.min(2, ORDER.indexOf(h) + 1)]);
          else if (e.key === 'ArrowDown') onH(ORDER[Math.max(0, ORDER.indexOf(h) - 1)]);
          else return;
          e.preventDefault();
        }}
        onClick={(e) => {
          // keyboard activation (pointer taps are handled in pointerup)
          if (e.detail === 0) onH(ORDER[(ORDER.indexOf(h) + 1) % ORDER.length]);
        }}
      >
        <span aria-hidden="true" />
      </button>
      {children}
    </aside>
  );
}
