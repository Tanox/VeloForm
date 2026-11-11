// 文件路径: vitest.config.ts v4.4.9
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // Windows + vitest 3 下，threads 池常无法启动（详见 CHANGELOG v4.2.2），故使用 forks 池
    pool: 'forks',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // 显式限定统计口径：仅业务源码，排除词条/类型/测试文件本身，避免分母失真
      include: ['src/lib/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/lib/i18n/locales/**',
        'src/lib/i18n/schema/**',
        'src/types/**',
      ],
      thresholds: {
        lines: 80,
        branches: 75,
        functions: 85,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
