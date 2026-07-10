'use client';

import { motion } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import { Github, Twitter, Linkedin, Youtube, Bike } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const footerCategories = ['product', 'company', 'resources', 'legal'];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const t = useTranslation();
  const shouldReduceMotion = useClientReducedMotion();

  const getTransition = (delay: number = 0) => ({
    duration: shouldReduceMotion ? 0 : 0.3,
    delay: shouldReduceMotion ? 0 : delay,
  });

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={getTransition()}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <Bike className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-display font-bold text-foreground">Veloform</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 max-w-[280px] leading-relaxed">
                  {t('footer.description')}
                </p>

                <div className="flex items-center gap-2" role="list">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      role="listitem"
                      className="min-w-[40px] min-h-[40px] rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-muted/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label={social.label}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={getTransition(index * 0.05)}
                    >
                      <social.icon className="w-4 h-4" aria-hidden="true" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {footerCategories.map((category, categoryIndex) => (
              <motion.nav
                key={category}
                aria-label={t(`footer.categories.${category}`) as string}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={getTransition(categoryIndex * 0.05)}
              >
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {t(`footer.categories.${category}`)}
                </h3>
                <ul className="space-y-3" role="list">
                  {(t(`footer.links.${category}`) as readonly string[]).map((linkLabel) => (
                    <li key={linkLabel} role="listitem">
                      <a
                        href="#"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-2 min-h-[32px]"
                      >
                        {linkLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{t('footer.copyright')}</p>

            <div className="flex items-center gap-6" role="list">
              {(t('footer.links.legal') as readonly string[]).map((item) => (
                <a
                  key={item}
                  href="#"
                  role="listitem"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-2 min-h-[32px] inline-flex items-center"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
