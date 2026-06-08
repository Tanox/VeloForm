'use client';

import { motion } from 'framer-motion';
import { Layers, Zap, Shield, Palette, Code, Cloud } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: '无限配置',
    description: '丰富的组件选择，从车架到配件，打造专属于你的完美座驾',
    color: 'bg-primary',
  },
  {
    icon: Zap,
    title: '极速响应',
    description: '毫秒级响应速度，流畅的操作体验，创作无延迟',
    color: 'bg-warning',
  },
  {
    icon: Shield,
    title: '安全保障',
    description: '端到端加密，自动云端备份，配置安全无忧',
    color: 'bg-accent',
  },
  {
    icon: Palette,
    title: '丰富素材',
    description: '海量优质组件资源，一键使用，激发无限灵感',
    color: 'bg-primary',
  },
  {
    icon: Code,
    title: '数据导出',
    description: '一键导出配置清单，分享你的完美配置方案',
    color: 'bg-error',
  },
  {
    icon: Cloud,
    title: '云端同步',
    description: '多设备无缝同步，随时随地继续配置',
    color: 'bg-info',
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">核心功能</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            为骑行而生
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            强大的功能，简洁的操作，让你的自行车配置变得轻松而愉悦
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-2xl p-6 sm:p-8 border border-border-light hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <motion.div
                className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-secondary text-sm sm:text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}