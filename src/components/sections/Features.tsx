'use client';

import { motion } from 'framer-motion';
import { Layers, Zap, Shield, Palette, Code, Cloud, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: '无限配置',
    description: '丰富的组件选择，从车架到配件，打造专属于你的完美座驾',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Zap,
    title: '极速响应',
    description: '毫秒级响应速度，流畅的操作体验，创作无延迟',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: Shield,
    title: '安全保障',
    description: '端到端加密，自动云端备份，配置安全无忧',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Palette,
    title: '丰富素材',
    description: '海量优质组件资源，一键使用，激发无限灵感',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    icon: Code,
    title: '数据导出',
    description: '一键导出配置清单，分享你的完美配置方案',
    gradient: 'from-red-500 to-rose-400',
  },
  {
    icon: Cloud,
    title: '云端同步',
    description: '多设备无缝同步，随时随地继续配置',
    gradient: 'from-indigo-500 to-blue-400',
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            核心功能
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
            为<span className="text-gradient-brand">骑行</span>而生
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            强大的功能，简洁的操作，让你的自行车配置变得轻松而愉悦
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-surface-secondary/80 backdrop-blur-sm rounded-2xl p-7 sm:p-8 border border-border-light hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* 悬停渐变背景 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              {/* 顶部装饰线 */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <motion.div
                className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>

              <div className="relative">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* 悬停箭头 */}
              <motion.div
                className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
