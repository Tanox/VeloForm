export const ANIMATION_DURATION = 0.3;
export const ANIMATION_DELAY_STEP = 0.1;
export const ANIMATION_EASING = [0.4, 0, 0.2, 1] as const;

export function getDelay(index: number, step: number = ANIMATION_DELAY_STEP): number {
  return index * step;
}
