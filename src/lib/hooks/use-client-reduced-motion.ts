'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * SSR-safe wrapper around framer-motion's useReducedMotion.
 *
 * framer-motion's hook returns `null` on the server and `boolean` on the
 * client. Using it directly to compute `initial`/`animate` props causes
 * React hydration mismatch errors (#418 / #422) when the user's system
 * prefers reduced motion.
 *
 * This hook returns the provided default during SSR and the first client
 * render, then switches to the real value after mount.
 */
export function useClientReducedMotion(defaultValue = false): boolean {
  const prefersReducedMotion = useFramerReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return defaultValue;
  }

  return prefersReducedMotion ?? defaultValue;
}
