'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useTranslation, useTranslationsObject } from '@/lib/i18n';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useCallback } from 'react';

export default function FaqPage() {
  const t = useTranslation();
  const translations = useTranslationsObject();
  const router = useRouter();

  const handleNavigate = useCallback(
    (page: string) => {
      if (page === 'home') {
        router.push('/');
      } else if (page === 'library') {
        router.push('/library');
      } else if (page === 'about') {
        router.push('/about');
      } else if (page === 'faq') {
        router.push('/faq');
      }
    },
    [router]
  );

  const faqItems = translations.faq.items;

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="mb-12 sm:mb-16">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← {t('faq.backToHome')}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mt-8 sm:mt-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
              <HelpCircle className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
              {t('faq.title')}
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">{t('faq.subtitle')}</p>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20"
          aria-labelledby="faq-list-title"
        >
          <h2 id="faq-list-title" className="sr-only">
            {t('faq.title')}
          </h2>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <Accordion className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-base font-medium py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted pb-4">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          aria-labelledby="cta-title"
        >
          <Card className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 border-primary/20 overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center relative">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <h2
                  id="cta-title"
                  className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4"
                >
                  {t('support.title')}
                </h2>
                <p className="text-muted mb-8 max-w-xl mx-auto">{t('support.contactForm')}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button className="w-full sm:w-auto gap-2">
                      <ArrowRight className="w-4 h-4" />
                      {t('hero.ctaPrimary')}
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" className="w-full sm:w-auto">
                      {t('nav.about')}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}
