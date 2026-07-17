'use client';

import { motion } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';

const ANIMATION_DURATION = 0.4;
const ANIMATION_DELAY_STEP = 0.1;

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const t = useTranslation();
  const shouldReduceMotion = useClientReducedMotion();

  const getInitial = (props: Record<string, number>) =>
    shouldReduceMotion ? { opacity: 1, y: 0, ...props } : props;

  const getTransition = (delay: number = 0) => ({
    duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={getInitial({ opacity: 0, y: 16 })}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(0)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t('hero.badge')}
            </motion.div>

            <motion.h1
              initial={getInitial({ opacity: 0, y: 20 })}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(ANIMATION_DELAY_STEP)}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-foreground mb-6 leading-[1.05]"
            >
              {t('hero.titlePart1')}
              <br />
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                {t('hero.titlePart2')}
              </span>
            </motion.h1>

            <motion.p
              initial={getInitial({ opacity: 0, y: 16 })}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(ANIMATION_DELAY_STEP * 2)}
              className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t('hero.descriptionLine1')}
              <br className="hidden sm:block" />
              {t('hero.descriptionLine2')}
            </motion.p>

            <motion.div
              initial={getInitial({ opacity: 0, y: 16 })}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(ANIMATION_DELAY_STEP * 3)}
              className="flex flex-col sm:flex-row items-center gap-3 mb-12"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto px-6 h-12 text-sm font-semibold"
                onClick={() => onNavigate('configurator')}
                aria-label={t('hero.cta') as string}
              >
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 h-12 text-sm"
                aria-label={t('hero.demo') as string}
              >
                <Play className="w-4 h-4 mr-2" aria-hidden="true" />
                {t('hero.demo')}
              </Button>
            </motion.div>

            <motion.div
              initial={getInitial({ opacity: 0, y: 20 })}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(ANIMATION_DELAY_STEP * 4)}
              className="flex items-center gap-8 pt-6 border-t border-border-subtle"
            >
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-mono font-semibold text-foreground">500+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">组件选项</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-mono font-semibold text-foreground">12kg</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">最轻配置</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-mono font-semibold text-foreground">∞</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">组合可能</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={getInitial({ opacity: 0, y: 40 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...getTransition(0.3), duration: 0.8 }}
            className="relative"
          >
            <div className="relative" style={{ aspectRatio: '4/5' }}>
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1571068316384-4e6e9a41b2b6?w=800&h=1000&fit=crop&q=80"
                  alt="Veloform 公路车"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  style={{ filter: 'saturate(0.85) contrast(1.1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/70 backdrop-blur-md border border-border rounded-md">
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">FRAME — T800 CARBON</span>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">重量</span>
                    <span className="text-base font-mono font-semibold text-foreground">890g</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">刚性</span>
                    <span className="text-base font-mono font-semibold text-foreground">142 N/mm</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -right-6 top-1/4 bg-card border border-border rounded-xl p-4 shadow-xl min-w-[160px]"
                animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">配置完成度</div>
                <div className="text-3xl font-mono font-bold text-primary leading-none mb-1">72%</div>
                <div className="text-xs font-mono text-muted-foreground mb-3">COMPLETION</div>
                <div className="h-[3px] bg-background rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
}