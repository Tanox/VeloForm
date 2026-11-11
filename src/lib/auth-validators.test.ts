// 文件路径: src/lib/auth-validators.test.ts v4.4.10
import { describe, expect, it } from 'vitest';
import { validateAuthInput } from './auth-validators';

describe('validateAuthInput', () => {
  it('接受合法邮箱与不低于 6 位的密码', () => {
    expect(() => validateAuthInput('rider@example.com', 'secret123')).not.toThrow();
  });

  it('拒绝非法邮箱', () => {
    expect(() => validateAuthInput('not-an-email', 'secret123')).toThrow('Invalid email format');
  });

  it('拒绝过短密码', () => {
    expect(() => validateAuthInput('rider@example.com', '12345')).toThrow(
      'Password must be at least 6 characters'
    );
  });
});
