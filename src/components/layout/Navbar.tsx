'use client';

import { useState } from 'react';
import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SupportModal } from '@/components/ui/SupportModal';
import { APP_CONSTANTS } from '@/lib/constants';
import { BookOpen, Globe, Headphones, Menu, X, User, HelpCircle, Sparkles } from 'lucide-react';
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
        transition={{ duration: 0.6, ease: 'easeOut', type: 'spring' }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-zinc-800/30"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-br from-primary via-blue-500 to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-500 group-hover:shadow-glow-primary"
              >
                <span className="text-xl font-bold text-white">V</span>
              </motion.div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg font-display font-bold text-gradient-primary">
                    {APP_CONSTANTS.APP_INFO.name}
                  </h1>
                  <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse-slow" />
                </div>
                <p className="text-xs text-muted">{APP_CONSTANTS.APP_INFO.tagline}</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 p-1 bg-zinc-900/50 backdrop-blur-sm rounded-full border border-zinc-800/30">
              <BikeTypeSelector />
            </div>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleLanguage}
                className="p-2 rounded-full text-muted hover:text-foreground hover:bg-zinc-800/50 transition-all"
              >
                <span className="text-sm font-medium">{language === 'en' ? 'EN' : '中文'}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowSupportModal(true)}
                className="p-2 rounded-full text-muted hover:text-foreground hover:bg-zinc-800/50 transition-all"
              >
                <HelpCircle className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-full text-muted hover:text-foreground hover:bg-zinc-800/50 transition-all"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {(showMobileMenu) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                className="lg:hidden pb-4"
              >
                <div className="flex items-center gap-1 p-1 bg-zinc-900/50 backdrop-blur-sm rounded-full border border-zinc-800/30">
                  <BikeTypeSelector />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <SupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} />
    </>
  );
}