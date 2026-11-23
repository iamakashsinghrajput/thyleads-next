'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Plays a stepped reveal once, the first time the element scrolls into view.
 * Returns a ref for the element and the current step (0 … steps). Visitors who
 * prefer reduced motion — and browsers without IntersectionObserver — get the
 * final state straight away.
 */
export function useReveal<T extends HTMLElement>(steps: number, stepMs = 420, startDelay = 250) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setStep(steps);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        for (let i = 1; i <= steps; i++) {
          timers.push(setTimeout(() => setStep(i), startDelay + i * stepMs));
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [steps, stepMs, startDelay]);

  return { ref, step };
}
