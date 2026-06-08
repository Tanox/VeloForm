'use client';

import { motion } from 'framer-motion';
import { Layers, Zap, Shield, Palette, Code, Cloud } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: '无限画布',
    description: '在无限扩展的画布上自由创作，打破传统设计界限',
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
    description: '端到端加密，自动云端备份，作品安全无忧',
    color: 'bg-accent',
  },
  {
    icon: Palette,
    title: '丰富素材',
    description: '海量优质设计资源，一键使用，激发无限灵感',
    color: 'bg-primary',
  },
  {
    icon: Code,
    title: '代码导出',
    description: '一键导出 HTML/CSS/JS，设计稿直接落地',
    color: 'bg-error',
  },
  {
    icon: Cloud,
    title: '云端同步',
    description: '多设备无缝同步，随时随地继续创作',
    color: 'bg-info',
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32 bg-surface/50">
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
            为创意而生
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            强大的功能，简洁的操作，让你的设计工作事半功倍
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-2xl p-6 border border-border-light hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-secondary text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}