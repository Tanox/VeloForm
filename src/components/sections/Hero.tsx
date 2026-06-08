'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-tertiary border border-border-light mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-secondary">全新版本现已发布</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight mb-6"
        >
          设计的力量
          <br />
          <span className="text-primary">触手可及</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-10"
        >
          体验全新的设计工具平台，让创意无限绽放。
          简洁、优雅、强大，为每一位设计师打造完美的创作空间。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
            开始免费试用
          </Button>
          <Button variant="secondary" size="lg" leftIcon={<Play className="w-5 h-5" />}>
            观看演示视频
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-surface-tertiary">
              <Image
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20design%20software%20interface%20on%20iMac%20screen%20minimalist%20clean%20UI%20apple%20style&image_size=landscape_16_9"
                alt="DesignHub Interface"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-secondary"
        >
          <span className="text-sm">受到全球顶尖团队信赖</span>
          <div className="flex items-center gap-8">
            {['Apple', 'Google', 'Meta', 'Spotify', 'Netflix'].map((company) => (
              <span
                key={company}
                className="text-lg font-semibold opacity-60 hover:opacity-100 transition-opacity"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}