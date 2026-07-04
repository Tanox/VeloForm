'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const transitionDuration = shouldReduceMotion ? 0 : undefined;
  const noRepeat = shouldReduceMotion ? 0 : Infinity;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* 动态背景效果 - 遵循设计系统规范 */}
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* 动态光球效果 - 装饰性背景 */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px]" aria-hidden="true">
        <motion.div
          animate={{
            scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
            opacity: shouldReduceMotion ? 0.2 : [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 8,
            repeat: noRepeat,
            ease: 'easeInOut',
          }}
          className="w-full h-full bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl"
        />
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px]" aria-hidden="true">
        <motion.div
          animate={{
            scale: shouldReduceMotion ? 1 : [1.2, 1, 1.2],
            opacity: shouldReduceMotion ? 0.2 : [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 10,
            repeat: noRepeat,
            ease: 'easeInOut',
          }}
          className="w-full h-full bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* 浮动粒子装饰 - 仅装饰性 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/25"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: shouldReduceMotion ? 0 : [-20, 20, -20],
              opacity: shouldReduceMotion ? 0.15 : [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 3 + i * 0.5,
              repeat: noRepeat,
              ease: 'easeInOut',
              delay: shouldReduceMotion ? 0 : i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* 标签徽章 */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: transitionDuration ?? 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-10 group hover:border-primary/40 transition-colors"
        >
          <motion.div
            animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
            transition={{ duration: shouldReduceMotion ? 0 : 8, repeat: noRepeat, ease: 'linear' }}
            aria-hidden="true"
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-primary">{t('hero.badge')}</span>
        </motion.div>

        {/* 主标题 - 遵循设计系统字体规范 */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration ?? 0.7, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.95] mb-8 tracking-tight"
        >
          <span className="text-gradient-brand">{t('hero.titleLine1')}</span>
          <br />
          <span className="text-foreground">{t('hero.titleLine2')}</span>
        </motion.h1>

        {/* 副标题 - Apple 风格间距 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration ?? 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* 按钮组 - 使用 shadcn/ui Button 组件并保持设计一致性 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration ?? 0.6, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="gradient"
              size="lg"
              className="px-8 py-4 rounded-2xl font-semibold min-h-[56px]"
              onClick={() => onNavigate('configurator')}
              aria-label={t('hero.ctaPrimary')}
            >
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              {t('hero.ctaPrimary')}
            </Button>
          </motion.div>

          <Button
            variant="outline"
            size="lg"
            className="border-border-light bg-surface-secondary/50 backdrop-blur-sm hover:bg-surface-tertiary min-h-[56px]"
            aria-label={t('hero.ctaSecondary')}
          >
            <Play className="w-5 h-5 mr-2" aria-hidden="true" />
            {t('hero.ctaSecondary')}
          </Button>
        </motion.div>

        {/* 产品预览卡片 - Apple 风格阴影 */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: transitionDuration ?? 0.8, delay: shouldReduceMotion ? 0 : 0.4 }}
          className="relative mx-auto max-w-5xl w-full"
        >
          {/* 外发光边框 */}
          <div
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-3xl blur-xl opacity-50"
            aria-hidden="true"
          />

          {/* 主卡片 */}
          <div className="relative rounded-2xl overflow-hidden border border-border-light shadow-2xl">
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="aspect-[16/9] bg-surface relative">
              <Image
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20bicycle%20configurator%20software%20interface%20on%20iMac%20screen%20minimalist%20clean%20UI%20apple%20style%20dark%20theme&image_size=landscape_16_9"
                alt="Veloform 自行车配置器软件界面预览，展示在电脑屏幕上的极简风格深色主题用户界面"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover"
              />
            </div>

            {/* 装饰性浏览器标签栏 */}
            <div
              className="absolute top-0 left-0 right-0 h-10 bg-surface-secondary/80 backdrop-blur-sm flex items-center px-4 gap-2 z-20"
              aria-hidden="true"
            >
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
          transition={{ duration: transitionDuration ?? 0.6, delay: shouldReduceMotion ? 0 : 0.6 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <span className="text-sm text-muted uppercase tracking-widest">
            {t('hero.trustedBy')}
          </span>
          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
            {['Specialized', 'Shimano', 'Zipp', 'Bontrager', 'SRAM'].map((company, index) => (
              <motion.span
                key={company}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: transitionDuration ?? 0.3,
                  delay: shouldReduceMotion ? 0 : 0.7 + index * 0.1,
                }}
                className="text-sm sm:text-base font-semibold text-muted/60 hover:text-foreground transition-colors cursor-default"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 向下滚动提示 - 仅装饰 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: transitionDuration ?? 0.6, delay: shouldReduceMotion ? 0 : 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: shouldReduceMotion ? 0 : [0, 8, 0] }}
          transition={{ duration: shouldReduceMotion ? 0 : 2, repeat: noRepeat, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted uppercase tracking-widest">
            {t('hero.scrollHint')}
          </span>
          <ChevronDown className="w-5 h-5 text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
