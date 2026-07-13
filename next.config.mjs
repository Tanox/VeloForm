/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
