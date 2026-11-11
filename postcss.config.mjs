// 文件路径: postcss.config.mjs v4.4.9
// 全局样式（src/app/styles/*.css）是已编译的设计系统产物，不含 @tailwind/@apply 指令，
// 构建期无需 Tailwind 二次编译；保留 autoprefixer 处理厂商前缀即可。
// 若后续改为源码式 Tailwind，请在此恢复 tailwindcss 插件并在入口加入 @tailwind 指令。
export default {
  plugins: {
    autoprefixer: {},
  },
};
