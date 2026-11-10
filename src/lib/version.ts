// 文件路径: src/lib/version.ts v4.4.9
// 版本唯一权威源：package.json version，经 next.config.mjs 的 env 注入到客户端

const SEMVER = process.env.NEXT_PUBLIC_APP_VERSION || '0.0.0';

/** 注入缺失时按同一规则即时生成 10 位 build 编号，保证展示格式恒定 */
function fallbackBuildId(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${String(now.getFullYear()).slice(-2)}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}${pad(now.getHours())}${pad(now.getMinutes())}`;
}

const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID || fallbackBuildId();

export const APP_VERSION = SEMVER;
export const BUILD_LABEL = BUILD_ID;
export const VERSION_LABEL = `V${SEMVER}· build ${BUILD_ID}`;
