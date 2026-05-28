'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Modal } from './Modal';
import { useTranslation } from '@/lib/i18n';
import { Bike, Wrench, Save, BarChart3, ChevronRight, X } from 'lucide-react';

const steps = [
  {
    icon: Bike,
    title: 'step1.title',
    description: 'step1.description',
    color: 'from-primary to-accent',
  },
  {
    icon: Wrench,
    title: 'step2.title',
    description: 'step2.description',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Save,
    title: 'step3.title',
    description: 'step3.description',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'step4.title',
    description: 'step4.description',
    color: 'from-purple-500 to-pink-500',
  },
];

export function OnboardingGuide() {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('veloform_onboarding');
    if (!hasSeenGuide) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('veloform_onboarding', 'true');
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
        <Modal
          isOpen={isOpen}
          onClose={handleSkip}
          title=""
          className="max-w-lg p-0 overflow-hidden"
        >
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center shadow-xl`}
              >
                <Icon className="w-12 h-12 text-white" />
              </motion.div>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {t(`onboarding.${currentStepData.title}`)}
              </h2>
              <p className="text-muted text-lg">
                {t(`onboarding.${currentStepData.description}`)}
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index <= currentStep
                        ? 'bg-primary w-8'
                        : 'bg-zinc-700 w-2'
                    }`}
                    initial={{ width: index === currentStep ? 32 : 8 }}
                    animate={{ width: index <= currentStep ? 32 : 8 }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Button className="w-full" size="lg" onClick={handleNext}>
                {currentStep < steps.length - 1 ? (
                  <>
                    {t('onboarding.next')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  t('onboarding.getStarted')
                )}
              </Button>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}