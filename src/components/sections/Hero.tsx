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
    ease: [0.25, 0.46, 0.45, 0.94],
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={getInitial({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(0)}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-8"
          >
            {t('hero.badge')}
          </motion.div>

          <motion.h1
            initial={getInitial({ opacity: 0, y: 20 })}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(ANIMATION_DELAY_STEP)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
          >
            {t('hero.titlePart1')}
            <br />
            <span className="text-primary">{t('hero.titlePart2')}</span>
          </motion.h1>

          <motion.p
            initial={getInitial({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(ANIMATION_DELAY_STEP * 2)}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('hero.descriptionLine1')}
            <br className="hidden sm:block" />
            {t('hero.descriptionLine2')}
          </motion.p>

          <motion.div
            initial={getInitial({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(ANIMATION_DELAY_STEP * 3)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto px-6"
              onClick={() => onNavigate('configurator')}
              aria-label={t('hero.cta') as string}
            >
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-6"
              aria-label={t('hero.demo') as string}
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              {t('hero.demo')}
            </Button>
          </motion.div>

          <motion.div
            initial={getInitial({ opacity: 0, y: 24 })}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(ANIMATION_DELAY_STEP * 4)}
            className="relative mx-auto max-w-5xl"
          >
            <div className="rounded-lg overflow-hidden border border-border shadow-sm">
              <div className="w-full" style={{ aspectRatio: '16/9', position: 'relative' }}>
                <Image
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20bicycle%20configurator%20software%20interface%20on%20iMac%20screen%20minimalist%20clean%20UI%20apple%20style%20dark%20theme&image_size=landscape_16_9"
                  alt="Veloform 界面预览"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={getInitial({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={getTransition(ANIMATION_DELAY_STEP * 6)}
            className="mt-16"
          >
            <p className="text-sm text-muted-foreground mb-6">{t('hero.trusted')}</p>
            <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
              {['Specialized', 'Shimano', 'Zipp', 'Bontrager', 'SRAM'].map((company, index) => (
                <motion.span
                  key={company}
                  initial={getInitial({ opacity: 0, y: 8 })}
                  animate={{ opacity: 1, y: 0 }}
                  transition={getTransition(
                    ANIMATION_DELAY_STEP * 7 + index * ANIMATION_DELAY_STEP
                  )}
                  className="text-sm font-medium text-muted-foreground/60"
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
