import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 允许从这些域名加载图片
    remotePatterns: [
      { protocol: 'https', hostname: 'neeko-copilot.bytedance.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    // 图片优化格式
    formats: ['image/avif', 'image/webp'],
    // 禁用不追踪 LCP 元素图片的优化提示
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'firebase', 'firebase-admin'];
    } else {
      // 防止 undici 和其他 Node.js 库被打包到客户端
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
        fs: false,
        net: false,
        tls: false,
      };

      // Bundle 分析（仅在 ANALYZE=true 时启用）
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer');
        config.plugins.push(new BundleAnalyzerPlugin());
      }
    }
    return config;
  },
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

export default withPWA(pwaConfig)(nextConfig);
