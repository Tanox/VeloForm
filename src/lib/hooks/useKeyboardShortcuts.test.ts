import { renderHook, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { saveConfiguration, resetToDefaults, setActiveType } = vi.hoisted(() => ({
  saveConfiguration: vi.fn(() => Promise.resolve()),
  resetToDefaults: vi.fn(),
  setActiveType: vi.fn(),
}));

vi.mock('@/lib/config-service', () => ({ saveConfiguration }));
vi.mock('@/lib/stores', () => ({
  useConfigStore: { getState: () => ({ resetToDefaults, setActiveType }) },
}));
vi.mock('@/lib/constants', () => ({
  APP_CONSTANTS: { BIKE_TYPES: ['Road', 'MTB', 'Fold'] },
}));

import { useKeyboardShortcuts } from './useKeyboardShortcuts';

describe('useKeyboardShortcuts', () => {
  beforeEach(() => vi.clearAllMocks());

  it('S 保存、R 重置、数字键切换车型', () => {
    renderHook(() => useKeyboardShortcuts());

    fireEvent.keyDown(window, { key: 's' });
    expect(saveConfiguration).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: 'r' });
    expect(resetToDefaults).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: '2' });
    expect(setActiveType).toHaveBeenCalledWith('MTB');
  });

  it('输入框内与带修饰键时不触发快捷键', () => {
    renderHook(() => useKeyboardShortcuts());
    const input = document.createElement('input');
    document.body.appendChild(input);

    fireEvent.keyDown(input, { key: 's' });
    fireEvent.keyDown(window, { key: 's', ctrlKey: true });
    expect(saveConfiguration).not.toHaveBeenCalled();

    input.remove();
  });
});
