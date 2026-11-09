import { useEffect, useRef, useState, type MouseEvent as RMouseEvent, type PointerEvent as RPointerEvent, type RefObject } from 'react';

export const COMPACT_QUERY = '(max-width: 720px), (max-height: 520px)';

export function useMedia(query: string) {
  const get = () => typeof window !== 'undefined' && !!window.matchMedia?.(query).matches;
  const [on, setOn] = useState(get);
  useEffect(() => {
    const m = window.matchMedia?.(query);
    if (!m) return;
    const f = () => setOn(m.matches);
    f();
    m.addEventListener?.('change', f);
    return () => m.removeEventListener?.('change', f);
  }, [query]);
  return on;
}

/** Close a popover when the pointer goes down outside it (and outside its trigger) or Escape is pressed. */
export function useDismiss(open: boolean, close: () => void, refs: RefObject<HTMLElement | null>[]) {
  const cb = useRef(close);
  cb.current = close;
  useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => {
      const tgt = e.target as Node;
      if (refs.some((r) => r.current?.contains(tgt))) return;
      cb.current();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        cb.current();
      }
    };
    window.addEventListener('pointerdown', down, true);
    window.addEventListener('keydown', key, true);
    return () => {
      window.removeEventListener('pointerdown', down, true);
      window.removeEventListener('keydown', key, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}

/** Pointer handlers that call `onLong` after a press of about half a second without moving. */
export function useLongPress(onLong: () => void, ms = 480) {
  const timer = useRef<number | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const fired = useRef(false);
  const clear = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };
  return {
    fired,
    handlers: {
      onPointerDown: (e: RPointerEvent) => {
        if (e.pointerType === 'mouse') return;
        fired.current = false;
        start.current = { x: e.clientX, y: e.clientY };
        clear();
        timer.current = window.setTimeout(() => {
          fired.current = true;
          onLong();
        }, ms);
      },
      onPointerMove: (e: RPointerEvent) => {
        if (!start.current) return;
        if (Math.hypot(e.clientX - start.current.x, e.clientY - start.current.y) > 8) clear();
      },
      onPointerUp: clear,
      onPointerCancel: clear,
      onContextMenu: (e: RMouseEvent) => {
        if (fired.current) e.preventDefault();
      },
    },
  };
}

export const prefersReducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
