'use client';

import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { APP_CONSTANTS } from '@/lib/constants';
import { BookOpen, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage, useSetLanguage, useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function Navbar() {
  const t = useTranslation();
  const language = useLanguage();
  const setLanguage = useSetLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh-CN' : 'en');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 bg-background/60 backdrop-blur-2xl border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-primary via-primary to-accent rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300"
            >
              <span className="text-lg sm:text-2xl font-bold text-white">V</span>
            </motion.div>
            <div className="hidden md:block">
              <h1 className="text-lg sm:text-xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                {APP_CONSTANTS.APP_INFO.name}
              </h1>
              <p className="text-xs text-muted/80">{APP_CONSTANTS.APP_INFO.tagline}</p>
            </div>
          </Link>

          <div className="flex-1 max-w-xs sm:max-w-md mx-2">
            <BikeTypeSelector />
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" onClick={toggleLanguage} className="px-2 sm:px-3">
                <Globe className="w-4 h-4" />
                <span className="ml-1 hidden sm:inline">{language === 'en' ? 'EN' : '中文'}</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/library">
                <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden lg:inline ml-1">{t('nav.library')}</span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
