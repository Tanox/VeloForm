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
      // 显式分层口径：覆盖率门禁只统计自研业务逻辑层（src/lib）。
      // UI 组件（含 @base-ui 适配层）由组件测试与 E2E 专项覆盖；V8 在 all=false 下
      // 仍会把被间接 import 的适配代码按 0% 计入，故一并排除 SDK/日志/通知/文案薄封装。
      include: ['src/lib/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/lib/i18n/locales/**',
        'src/lib/i18n/schema/**',
        'src/types/**',
        'src/lib/auth.ts',
        'src/lib/supabase.ts',
        'src/lib/logger.ts',
        'src/lib/toast.ts',
        'src/lib/whimsy-copy.ts',
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
