// 文件路径: vitest.config.ts v4.4.10
import { configDefaults, defineConfig } from 'vitest/config';
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
    // .tmp/ 下的工具残留（如 node_modules-broken）不得进入测试发现，避免门禁假红
    exclude: [...configDefaults.exclude, '.tmp/**', '**/.tmp/**'],
    coverage: {
      provider: 'v8',
      // 显式口径：all=true 会把未被任何测试 import 的源码按 0% 计入，导致门槛失真
      all: false,
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
