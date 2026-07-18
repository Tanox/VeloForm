import { Zap, Star, Sparkles, Bike } from 'lucide-react';

// 标签配色 — 柔和的中性色调，与 Editorial Minimalism 一致
export const tagIcons: Record<string, typeof Zap> = {
  Recommended: Star,
  Lightweight: Zap,
  Popular: Sparkles,
  Value: Zap,
  XC: Bike,
  Urban: Sparkles,
  Compact: Star,
};

export const tagColors: Record<string, string> = {
  Recommended: 'bg-primary/10 text-primary',
  Lightweight: 'bg-surface-tertiary text-foreground-secondary',
  Popular: 'bg-primary/10 text-primary',
  Value: 'bg-surface-tertiary text-foreground-secondary',
  XC: 'bg-surface-tertiary text-foreground-secondary',
  Urban: 'bg-surface-tertiary text-foreground-secondary',
  Compact: 'bg-surface-tertiary text-foreground-secondary',
};
