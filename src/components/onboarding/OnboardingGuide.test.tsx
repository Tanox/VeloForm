// 文件路径: src/components/onboarding/OnboardingGuide.test.tsx v4.4.10
import type { ReactNode } from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render, screen, fireEvent } from '@testing-library/react';

const ONBOARDING_STORAGE_KEY = 'veloform_onboarding_v2';
const SHOW_DELAY_MS = 800;

// 弹窗基于 @base-ui/react Portal，测试中替换为轻量壳，聚焦引导自身状态机
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: { children: ReactNode; open?: boolean }) =>
    open ? <div data-testid="onboarding-dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/lib/i18n', () => ({
  useTranslation: () => (key: string) => key,
}));

vi.mock('./OnboardingStepIndicator', () => ({
  OnboardingStepIndicator: () => <div data-testid="onboarding-indicator" />,
}));

vi.mock('./OnboardingStepContent', () => ({
  OnboardingStepContent: ({ onSkip }: { onSkip: () => void }) => (
    <button type="button" onClick={onSkip}>
      跳过引导
    </button>
  ),
}));

import { OnboardingGuide } from './OnboardingGuide';

describe('OnboardingGuide', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('首次访问时延迟显示引导', () => {
    render(<OnboardingGuide />);
    expect(screen.queryByTestId('onboarding-dialog')).toBeNull();

    act(() => {
      vi.advanceTimersByTime(SHOW_DELAY_MS);
    });
    expect(screen.getByTestId('onboarding-dialog')).toBeInTheDocument();
  });

  it('跳过引导后写入已读标记', () => {
    render(<OnboardingGuide />);
    act(() => {
      vi.advanceTimersByTime(SHOW_DELAY_MS);
    });

    fireEvent.click(screen.getByRole('button', { name: '跳过引导' }));
    expect(window.localStorage.getItem(ONBOARDING_STORAGE_KEY)).toBe('true');
  });

  it('已读过引导时不再显示', () => {
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    render(<OnboardingGuide />);

    act(() => {
      vi.advanceTimersByTime(SHOW_DELAY_MS);
    });
    expect(screen.queryByTestId('onboarding-dialog')).toBeNull();
  });

  it('localStorage 被禁用（隐私模式）时仍能显示引导', () => {
    const original = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get: () => {
        throw new Error('SecurityError: storage disabled');
      },
    });

    try {
      render(<OnboardingGuide />);
      act(() => {
        vi.advanceTimersByTime(SHOW_DELAY_MS);
      });
      expect(screen.getByTestId('onboarding-dialog')).toBeInTheDocument();
    } finally {
      if (original) {
        Object.defineProperty(window, 'localStorage', original);
      }
    }
  });
});
