'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Dialog, DialogContent } from './dialog';
import { useTranslation } from '@/lib/i18n';
import { Bike, Wrench, Save, BarChart3, ChevronRight, X, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Bike,
    title: 'step1.title',
    description: 'step1.description',
    color: 'from-primary to-accent',
    bgColor: 'bg-primary/10',
    tip: 'step1.tip',
  },
  {
    icon: Wrench,
    title: 'step2.title',
    description: 'step2.description',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    tip: 'step2.tip',
  },
  {
    icon: Save,
    title: 'step3.title',
    description: 'step3.description',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    tip: 'step3.tip',
  },
  {
    icon: BarChart3,
    title: 'step4.title',
    description: 'step4.description',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    tip: 'step4.tip',
  },
];

export function OnboardingGuide() {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('veloform_onboarding_v2');
    if (!hasSeenGuide) {
      // 延迟显示，让页面先加载完成
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('veloform_onboarding_v2', 'true');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleSkip}>
          <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative p-6 sm:p-8"
            >
              <motion.button
                onClick={handleSkip}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-2 rounded-lg text-muted hover:text-foreground hover:bg-zinc-800/50 transition-all touch-target"
              >
                <X className="w-5 h-5" />
              </motion.button>

            {/* 进度指示器 */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index <= currentStep
                        ? 'bg-gradient-to-r from-primary to-accent'
                        : 'bg-zinc-700'
                    }`}
                    initial={{ width: index === currentStep ? 32 : 8 }}
                    animate={{ width: index <= currentStep ? 32 : 8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                ))}
              </div>
            </div>

            {/* 图标 */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.1 
                }}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center shadow-2xl`}
              >
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                {/* 发光效果 */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${currentStepData.color} opacity-50 blur-xl`}
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
                {t(`onboarding.${currentStepData.title}`)}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted text-sm sm:text-base leading-relaxed"
              >
                {t(`onboarding.${currentStepData.description}`)}
              </motion.p>
            </div>

            {/* 提示卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl ${currentStepData.bgColor} border border-white/5`}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {t(`onboarding.${currentStepData.tip}`)}
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
              {currentStep > 0 && (
                <Button 
                  variant="ghost" 
                  className="flex-1 touch-target" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  {t('onboarding.back')}
                </Button>
              )}
              <Button 
                className="flex-1 touch-target tap-scale" 
                size="lg" 
                onClick={handleNext}
              >
                {currentStep < steps.length - 1 ? (
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
            {currentStep < steps.length - 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleSkip}
                className="w-full mt-4 text-center text-xs sm:text-sm text-muted hover:text-foreground transition-colors touch-target py-2"
              >
                {t('onboarding.skip')}
              </motion.button>
            )}
          </motion.div>
            </DialogContent>
          </Dialog>
      )}
    </AnimatePresence>
  );
}