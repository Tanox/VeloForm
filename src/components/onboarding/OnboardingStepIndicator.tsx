'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { OnboardingStep } from './onboarding-steps';

interface OnboardingStepIndicatorProps {
  steps: OnboardingStep[];
  currentStep: number;
}

function OnboardingStepIndicatorBase({ steps, currentStep }: OnboardingStepIndicatorProps) {
  return (
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
  );
}

export const OnboardingStepIndicator = memo(OnboardingStepIndicatorBase);
