/**
 * 客户端输入校验：email 格式与密码最小长度（纵深防御，最终校验由 Supabase 服务端负责）。
 */
export function validateAuthInput(email: string, password: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  if (typeof password !== 'string' || password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
}
