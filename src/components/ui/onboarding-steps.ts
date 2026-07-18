import { Bike, Wrench, Save, BarChart3 } from 'lucide-react';

export interface OnboardingStep {
  icon: typeof Bike;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  tip: string;
}

export const onboardingSteps: OnboardingStep[] = [
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
