'use client';

import { useState } from 'react';
import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SupportModal } from '@/components/ui/SupportModal';
import { APP_CONSTANTS } from '@/lib/constants';
import { BookOpen, Globe, Headphones, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage, useSetLanguage, useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { loginWithGoogle, logout } from '@/lib/auth';
import { useConfigStore } from '@/lib/store';

export function Navbar() {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const t = useTranslation();
  const language = useLanguage();
  const setLanguage = useSetLanguage();
  const userId = useConfigStore((state) => state.userId);
  const setUserId = useConfigStore((state) => state.setUserId);
  const isLoggedIn = userId !== null;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh-CN' : 'en');
  };

  const handleAuth = async () => {
    if (isLoggedIn) {
      await logout();
      setUserId(null);
    } else {
      try {
        const user = await loginWithGoogle();
        setUserId(user.uid);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-zinc-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary via-primary to-accent rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300"
              >
                <span className="text-xl sm:text-2xl font-bold text-white">V</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                  {APP_CONSTANTS.APP_INFO.name}
                </h1>
                <p className="text-xs text-muted/80">{APP_CONSTANTS.APP_INFO.tagline}</p>
              </div>
            </Link>

            <div className="flex-1 max-w-md hidden md:block">
              <BikeTypeSelector />
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button variant="ghost" onClick={toggleLanguage} size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'EN' : '中文'}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Link href="/library">
                  <Button variant="ghost" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{t('nav.library')}</span>
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button variant="ghost" onClick={() => setShowSupportModal(true)} size="sm">
                  <Headphones className="w-4 h-4 mr-2" />
                  <span>{t('support.title')}</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Button variant={isLoggedIn ? 'outline' : 'primary'} onClick={handleAuth} size="sm">
                  <User className="w-4 h-4 mr-2" />
                  <span>{isLoggedIn ? t('nav.logout') : t('nav.login')}</span>
                </Button>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="sm:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden bg-background/95 backdrop-blur-xl border-b border-zinc-800/50"
            >
              <div className="px-4 py-4 space-y-3">
                <BikeTypeSelector />
                <div className="pt-3 border-t border-zinc-800/50 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={toggleLanguage}>
                    <Globe className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'English' : '中文'}
                  </Button>
                  <Link href="/library">
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {t('nav.library')}
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setShowSupportModal(true)}>
                    <Headphones className="w-4 h-4 mr-2" />
                    {t('support.title')}
                  </Button>
                  <Button variant={isLoggedIn ? 'outline' : 'primary'} className="w-full" onClick={handleAuth}>
                    <User className="w-4 h-4 mr-2" />
                    {isLoggedIn ? t('nav.logout') : t('nav.login')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <SupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} />
    </>
  );
}
