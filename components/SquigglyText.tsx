'use client';

import { useId, useMemo, type ReactNode } from 'react';
import { motion, useReducedMotion, useTime, useTransform } from 'framer-motion';

/**
 * Wobbly hand-drawn text effect, ported from Aceternity UI's `squiggly-text`
 * (shadcn registry) onto this repo's stack: framer-motion instead of `motion`,
 * plain className instead of `cn`.
 *
 * It renders `steps` SVG turbulence/displacement filters with different noise
 * seeds and swaps the wrapper's `filter` between them every `stepDuration` ms.
 * Users with reduced motion get the plain text.
 */
export default function SquigglyText({
  children,
  className = '',
  steps = 5,
  stepDuration = 80,
  scale = [6, 8],
  baseFrequency = 0.02,
  numOctaves = 3,
}: {
  children: ReactNode;
  className?: string;
  /** Distinct displacement frames to cycle through. */
  steps?: number;
  /** Time between frame swaps, in ms. */
  stepDuration?: number;
  /** Max displacement in px — one value, or two that alternate per frame. */
  scale?: number | [number, number];
  /** Turbulence frequency: lower = longer, smoother waves. */
  baseFrequency?: number;
  numOctaves?: number;
}) {
  const reduceMotion = useReducedMotion();
  // useId can contain ":" which isn't valid inside a CSS url(#…) reference.
  const safeId = useId().replace(/[:_]/g, '');
  const filterId = (i: number) => `squiggly-${safeId}-${i}`;

  const filters = useMemo(
    () => Array.from({ length: steps }, (_, i) => `url(#squiggly-${safeId}-${i})`),
    [steps, safeId],
  );

  const time = useTime();
  const filter = useTransform(time, (t) => filters[Math.floor(t / stepDuration) % filters.length]);

  const scaleAt = (i: number) => (Array.isArray(scale) ? scale[i % scale.length] : scale);

  return (
    <motion.span style={reduceMotion ? undefined : { filter }} className={`inline-block ${className}`}>
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
        <defs>
          {Array.from({ length: steps }, (_, i) => (
            <filter id={filterId(i)} key={i}>
              <feTurbulence baseFrequency={baseFrequency} numOctaves={numOctaves} result="noise" seed={i} />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={scaleAt(i)} />
            </filter>
          ))}
        </defs>
      </svg>
      {children}
    </motion.span>
  );
}
