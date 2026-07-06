'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Bike, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    [t('footer.categories.product.label')]: [
      { label: t('footer.categories.product.features'), href: '#' },
      { label: t('footer.categories.product.pricing'), href: '#' },
      { label: t('footer.categories.product.changelog'), href: '#' },
      { label: t('footer.categories.product.roadmap'), href: '#' },
    ],
    [t('footer.categories.company.label')]: [
      { label: t('footer.categories.company.about'), href: '#' },
      { label: t('footer.categories.company.blog'), href: '#' },
      { label: t('footer.categories.company.careers'), href: '#' },
      { label: t('footer.categories.company.contact'), href: '#' },
    ],
    [t('footer.categories.resources.label')]: [
      { label: t('footer.categories.resources.docs'), href: '#' },
      { label: t('footer.categories.resources.api'), href: '#' },
      { label: t('footer.categories.resources.community'), href: '#' },
      { label: t('footer.categories.resources.help'), href: '#' },
    ],
    [t('footer.categories.legal.label')]: [
      { label: t('footer.categories.legal.privacy'), href: '#' },
      { label: t('footer.categories.legal.terms'), href: '#' },
      { label: t('footer.categories.legal.security'), href: '#' },
      { label: t('footer.categories.legal.cookies'), href: '#' },
    ],
  };

  return (
    <footer className="bg-surface-secondary/50 border-t border-border-light relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
            {/* 品牌区域 */}
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

                {/* 社交链接 */}
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

            {/* 链接区域 */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.nav
                key={category}
                aria-label={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.05 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-4">{category}</h3>
                <ul className="space-y-3" role="list">
                  {links.map((link, linkIndex) => (
                    <li key={link.label} role="listitem">
                      <motion.a
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-2 min-h-[32px]"
                        whileHover={{ x: 2 }}
                      >
                        {link.label}
                        <ArrowUpRight
                          className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                          aria-hidden="true"
                        />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>
        </div>

        {/* 底部栏 */}
        <div className="py-6 border-t border-border-light">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-secondary">
                {t('footer.copyright', { year: currentYear })}
              </p>
            </div>

            <div className="flex items-center gap-6" role="list">
              {[
                { label: t('footer.categories.legal.privacy'), href: '#' },
                { label: t('footer.categories.legal.terms'), href: '#' },
                { label: t('footer.categories.legal.cookies'), href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  role="listitem"
                  className="text-sm text-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-2 min-h-[32px] inline-flex items-center"
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
