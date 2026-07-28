'use client';

/**
 * DelightLayer — global home for delightful moments.
 *  - Mounts <DelightToast /> (the celebration listener)
 *  - Wires the Konami code easter egg (↑↑↓↓←→←→ B A) → turbo confetti + shimmer
 *
 * Mounted once in the root layout so every route gets personality for free.
 */

import { useEffect } from 'react';
import { DelightToast } from './DelightToast';
import { useWhimsy } from '@/lib/whimsy-copy';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';

const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

export function DelightLayer() {
  const w = useWhimsy();
  const reduceMotion = useClientReducedMotion();

  useEffect(() => {
    let seq: string[] = [];

    const handler = (e: KeyboardEvent) => {
      seq.push(e.key.toLowerCase());
      seq = seq.slice(-KONAMI.length);
      if (seq.join(',') === KONAMI.join(',')) {
        seq = [];
        window.dispatchEvent(
          new CustomEvent('veloform:celebrate', {
            detail: {
              title: w('konami.title'),
              message: w('konami.message'),
              icon: '🌟',
            },
          })
        );
        if (!reduceMotion) {
          document.body.classList.add('easter-egg-active');
          window.setTimeout(
            () => document.body.classList.remove('easter-egg-active'),
            8000
          );
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [w, reduceMotion]);

  return <DelightToast />;
}
