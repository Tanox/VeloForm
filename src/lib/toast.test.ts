// 文件路径: src/lib/toast.test.ts v4.4.10
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { info, success, warning, error, Toaster } = vi.hoisted(() => ({
  info: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn(),
  Toaster: () => null,
}));

vi.mock('sonner', () => ({
  toast: Object.assign(info, { success, warning, error }),
  Toaster,
}));

import { toast, Toast } from './toast';

describe('toast 统一通知入口', () => {
  beforeEach(() => vi.clearAllMocks());

  it('按类型分发到 sonner 对应方法', () => {
    toast('success', 'ok');
    toast('error', 'failed');
    toast('warning', 'careful');
    toast('info', 'notice');

    expect(success).toHaveBeenCalledWith('ok', expect.objectContaining({ duration: 4000 }));
    expect(error).toHaveBeenCalledTimes(1);
    expect(warning).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledWith('notice', expect.anything());
  });

  it('支持自定义时长并导出 Toaster', () => {
    toast('success', 'fast', 1000);
    expect(success).toHaveBeenCalledWith('fast', { duration: 1000 });
    expect(Toast).toBe(Toaster);
  });
});
