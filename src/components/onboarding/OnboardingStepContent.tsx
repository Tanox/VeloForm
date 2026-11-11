'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { ChevronRight, Sparkles } from 'lucide-react';
import { type TranslationFunction } from '@/lib/i18n';
import { OnboardingStep } from './onboarding-steps';

interface OnboardingStepContentProps {
  step: OnboardingStep;
  stepIndex: number;
  isLastStep: boolean;
  t: TranslationFunction;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

function OnboardingStepContentBase({
  step,
  stepIndex,
  isLastStep,
  t,
  onNext,
  onSkip,
  onBack,
}: OnboardingStepContentProps) {
  const Icon = step.icon;

  return (
    <>
      {/* 图标 */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl`}
        >
          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          {/* 发光效果 */}
          <motion.div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-50 blur-xl`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* 内容 */}
      <div className="text-center space-y-3 sm:space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl font-display font-bold text-foreground"
        >
          {t(`onboarding.${step.title}`)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted text-sm sm:text-base leading-relaxed"
        >
          {t(`onboarding.${step.description}`)}
        </motion.p>
      </div>

      {/* 提示卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl ${step.bgColor} border border-white/5`}
      >
        <div className="flex items-start gap-2 sm:gap-3">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            {t(`onboarding.${step.tip}`)}
          </p>
        </div>
      </motion.div>

      {/* 按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 sm:mt-8 flex gap-3"
      >
        {stepIndex > 0 && (
          <Button
            variant="ghost"
            className="flex-1 touch-target"
            onClick={onBack}
          >
            {t('onboarding.back')}
          </Button>
        )}
        <Button
          className="flex-1 touch-target tap-scale"
          size="lg"
          onClick={onNext}
        >
          {!isLastStep ? (
            <>
              {t('onboarding.next')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-1" />
              {t('onboarding.getStarted')}
            </>
          )}
        </Button>
      </motion.div>

      {/* 跳过链接 */}
      {!isLastStep && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onSkip}
          className="w-full mt-4 text-center text-xs sm:text-sm text-muted hover:text-foreground transition-colors touch-target py-2"
        >
          {t('onboarding.skip')}
        </motion.button>
      )}
    </>
  );
}

export const OnboardingStepContent = memo(OnboardingStepContentBase);
