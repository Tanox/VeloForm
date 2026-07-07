'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ANIMATION_DURATION } from '@/lib/animation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { uiLogger } from '@/lib/logger';

type FaqCategory = 'configurator' | 'saveAndShare' | 'pricing' | 'technical';

const categories: FaqCategory[] = ['configurator', 'saveAndShare', 'pricing', 'technical'];

export default function FaqPage() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const handleNavigate = (page: string) => {
    uiLogger.debug('Navigate to:', page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} />

      <main>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : ANIMATION_DURATION }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t('support.faq')}
            </h1>
            <p className="text-muted text-lg">{t('support.title')}</p>
          </div>

          <div className="space-y-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
                  delay: shouldReduceMotion ? 0 : categoryIndex * 0.1,
                }}
              >
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t(`support.faqCategories.${category}`)}
                </h2>
                <Accordion className="space-y-1">
                  {(
                    t(`support.faqItems.${category}`) as unknown as {
                      question: string;
                      answer: string;
                    }[]
                  ).map((item, itemIndex) => (
                    <AccordionItem
                      key={`${category}-${itemIndex}`}
                      value={`${category}-${itemIndex}`}
                      className="rounded-lg border border-border-light bg-card/50 px-4"
                    >
                      <AccordionTrigger className="text-foreground hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
