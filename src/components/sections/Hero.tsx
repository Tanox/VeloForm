'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* 动态背景效果 */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* 动态光球效果 */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl"
        />
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px]">
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-gradient-radial from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* 浮动粒子装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* 标签徽章 */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-10 group hover:border-primary/40 transition-colors"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-primary">全新版本现已发布</span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.95] mb-8 tracking-tight"
        >
          <span className="text-gradient-brand">打造</span>
          <br />
          <span className="text-foreground">你的梦想自行车</span>
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          选择车型，自定义组件，创建专属于你的完美座驾。
          <br className="hidden sm:block" />
          每一个细节都由你掌控。
        </motion.p>

        {/* 按钮组 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('configurator')}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden shadow-glow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="开始配置"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              开始配置
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <Button
            variant="secondary"
            size="lg"
            className="border-border-light bg-surface-secondary/50 backdrop-blur-sm hover:bg-surface-tertiary"
            aria-label="观看演示视频"
          >
            <Play className="w-5 h-5 mr-2" />
            观看演示视频
          </Button>
        </motion.div>

        {/* 产品预览卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto max-w-5xl w-full"
        >
          {/* 外发光边框 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-3xl blur-xl opacity-50" />

          {/* 主卡片 */}
          <div className="relative rounded-2xl overflow-hidden border border-border-light shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />

            <div className="aspect-[16/9] bg-surface relative">
              <Image
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20bicycle%20configurator%20software%20interface%20on%20iMac%20screen%20minimalist%20clean%20UI%20apple%20style%20dark%20theme&image_size=landscape_16_9"
                alt="Veloform 界面预览"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover"
              />
            </div>

            {/* 装饰性浏览器标签栏 */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-surface-secondary/80 backdrop-blur-sm flex items-center px-4 gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="flex-1 mx-4 h-5 rounded bg-surface-tertiary/50 max-w-xs" />
            </div>
          </div>
        </motion.div>

        {/* 品牌信任标识 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <span className="text-sm text-muted uppercase tracking-widest">受到全球顶尖品牌信赖</span>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {['Specialized', 'Shimano', 'Zipp', 'Bontrager', 'SRAM'].map((company, index) => (
              <motion.span
                key={company}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="text-sm sm:text-base font-semibold text-muted/60 hover:text-foreground transition-colors cursor-default"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted uppercase tracking-widest">向下滚动</span>
          <ChevronDown className="w-5 h-5 text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
