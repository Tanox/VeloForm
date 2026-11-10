// 文件路径: next.config.mjs v4.4.9
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

// build 编号固定 10 位 yymmddhhmm（本地时间），由构建期注入，页脚统一读取
const now = new Date();
const pad = (value) => String(value).padStart(2, '0');
const BUILD_ID = `${String(now.getFullYear()).slice(-2)}${pad(now.getMonth() + 1)}${pad(
  now.getDate()
)}${pad(now.getHours())}${pad(now.getMinutes())}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
