'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from './dialog';
import { useTranslation } from '@/lib/i18n';
import { X } from 'lucide-react';
import { onboardingSteps } from './onboarding-steps';
import { OnboardingStepIndicator } from './OnboardingStepIndicator';
import { OnboardingStepContent } from './OnboardingStepContent';

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
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const currentStepData = onboardingSteps[currentStep];

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

              <OnboardingStepIndicator steps={onboardingSteps} currentStep={currentStep} />

              <OnboardingStepContent
                step={currentStepData}
                stepIndex={currentStep}
                isLastStep={currentStep === onboardingSteps.length - 1}
                t={t}
                onNext={handleNext}
                onSkip={handleSkip}
                onBack={() => setCurrentStep(currentStep - 1)}
              />
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
