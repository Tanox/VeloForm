'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Bike, ArrowUpRight } from 'lucide-react';
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

  return (
    <footer className="bg-surface-secondary/50 border-t border-border-light relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                    <Bike className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-display font-bold text-foreground">Veloform</span>
                </div>
                <p className="text-sm text-secondary mb-6 max-w-[280px] leading-relaxed">
                  {t('footer.description')}
                </p>

                <div className="flex items-center gap-2" role="list">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      role="listitem"
                      className="relative min-w-[44px] min-h-[44px] rounded-xl bg-surface-tertiary/50 hover:bg-primary/10 border border-border-light hover:border-primary/30 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label={social.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.05 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {t(`footer.categories.${category}`)}
                </h3>
                <ul className="space-y-3" role="list">
                  {(t(`footer.links.${category}`) as readonly string[]).map(
                    (linkLabel, linkIndex) => (
                      <li key={linkLabel} role="listitem">
                        <motion.a
                          href="#"
                          className="group inline-flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-2 min-h-[32px]"
                          whileHover={{ x: 2 }}
                        >
                          {linkLabel}
                          <ArrowUpRight
                            className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                            aria-hidden="true"
                          />
                        </motion.a>
                      </li>
                    )
                  )}
                </ul>
              </motion.nav>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-border-light">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-secondary">{t('footer.copyright')}</p>
            </div>

            <div className="flex items-center gap-6" role="list">
              {(t('footer.links.legal') as readonly string[]).map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  role="listitem"
                  className="text-sm text-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-2 min-h-[32px] inline-flex items-center"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
