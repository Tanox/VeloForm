// 文件路径: next.config.mjs v4.4.11
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

// build 编号固定 10 位 yymmddhhmm（本地时间），由构建期注入，页脚统一读取
const now = new Date();
const pad = (value) => String(value).padStart(2, '0');
const BUILD_ID = `${String(now.getFullYear()).slice(-2)}${pad(now.getMonth() + 1)}${pad(
  now.getDate()
)}${pad(now.getHours())}${pad(now.getMinutes())}`;

// 临时产物根目录：一次性文件、临时构建产物一律写入 .tmp/，禁止在仓库根目录散落
const TEMP_ROOT = '.tmp';

/**
 * 解析构建输出目录。
 * - 默认 `.next`：平台约定目录（Vercel / Cloudflare 依赖），保持不变；
 * - 指定 NEXT_DIST_DIR 时必须落在 `.tmp/` 内，防止根目录再次出现 `.next-*` 变体目录。
 */
function resolveDistDir() {
  const raw = process.env.NEXT_DIST_DIR;
  if (!raw) return '.next';
  const normalized = raw.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
  if (!normalized.startsWith(`${TEMP_ROOT}/`)) {
    throw new Error(
      `NEXT_DIST_DIR 必须位于 ${TEMP_ROOT}/ 目录下（例如 ${TEMP_ROOT}/next/build），当前值：${raw}`
    );
  }
  return normalized;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 本地验证可指定全新目录，避免清理既有产物触发 IDE 安全删除护栏；默认行为不变
  distDir: resolveDistDir(),
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_BUILD_ID: BUILD_ID,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'trae-api-cn.mchost.guru' },
    ],
  },
  webpack: (config) => {
    config.module.rules.forEach((rule) => {
      const oneOf = rule.oneOf;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (
            one.loader &&
            one.loader.includes('css-loader') &&
            one.options &&
            one.options.modules
          ) {
            one.options.modules.exportOnlyLocals = false;
          }
        });
      }
    });
    return config;
  },
};

export default nextConfig;
