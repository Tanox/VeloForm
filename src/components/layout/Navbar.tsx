'use client';

import { useState } from 'react';
import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SupportModal } from '@/components/ui/SupportModal';
import { APP_CONSTANTS } from '@/lib/constants';
import { BookOpen, Globe, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage, useSetLanguage, useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function Navbar() {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const t = useTranslation();
  const language = useLanguage();
  const setLanguage = useSetLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh-CN' : 'en');
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-40 bg-background/60 backdrop-blur-2xl border-b border-zinc-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-primary via-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300"
              >
                <span className="text-2xl font-bold text-white">V</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                  {APP_CONSTANTS.APP_INFO.name}
                </h1>
                <p className="text-xs text-muted/80">{APP_CONSTANTS.APP_INFO.tagline}</p>
              </div>
            </Link>

            <div className="flex-1 max-w-md hidden sm:block">
              <BikeTypeSelector />
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" onClick={toggleLanguage}>
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'EN' : '中文'}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/library">
                  <Button variant="ghost">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{t('nav.library')}</span>
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" onClick={() => setShowSupportModal(true)}>
                  <Headphones className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{t('support.title')}</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <SupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} />
    </>
  );
}
