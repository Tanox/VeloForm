'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import { Menu, X, User, Moon, Sun, Bike, HelpCircle, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useTranslation, useLanguage, useSetLanguage } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';
import { OnboardingGuide } from '@/components/ui/OnboardingGuide';
import { SupportModal } from '@/components/ui/SupportModal';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const t = useTranslation();
  const language = useLanguage();
  const setLanguage = useSetLanguage();
  const shouldReduceMotion = useClientReducedMotion();

  const handleNavigate = useCallback(
    (target: string) => {
      if (target === 'library') {
        onNavigate('library');
        return;
      }

      const sectionId =
        target === 'home'
          ? 'hero'
          : target === 'features'
            ? 'features'
            : target === 'pricing'
              ? 'pricing'
              : target === 'cta'
                ? 'cta'
                : 'hero';

      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
      }

      onNavigate('home');
    },
    [onNavigate, shouldReduceMotion]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for mobile menu
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isMobileMenuOpen) return;

      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    },
    [isMobileMenuOpen]
  );

  // Focus trap in mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: String(t('nav.home')), href: 'home' },
    { label: String(t('nav.library')), href: 'library' },
    { label: String(t('nav.support')), href: 'support', isSupport: true },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <motion.nav
        initial={shouldReduceMotion ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : ANIMATION_DURATION }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          isScrolled
            ? 'bg-background/80 backdrop-blur-2xl border-b border-border-light shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo - 使用 shadcn Button 样式一致性 */}
            <motion.button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl px-2 py-1 min-h-[44px]"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              aria-label="返回首页"
            >
              <div
                className="relative w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300"
                aria-hidden="true"
              >
                <Bike className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-foreground hidden sm:block">
                Veloform
              </span>
            </motion.button>

            {/* Desktop Navigation - 统一导航链接样式 */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => {
                    if (item.isSupport) {
                      setIsSupportOpen(true);
                    } else {
                      handleNavigate(item.href);
                    }
                  }}
                  className={cn(
                    'relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] min-w-[44px]',
                    'text-secondary hover:text-foreground',
                    'hover:bg-surface-tertiary/50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                  )}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
                    delay: shouldReduceMotion ? 0 : index * ANIMATION_DELAY_STEP,
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  aria-label={item.label}
                >
                  {item.isSupport ? (
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </motion.button>
              ))}
            </div>

            {/* Actions - 右侧操作区 */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setLanguage(language === 'en' ? 'zh-CN' : 'en')}
                className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-surface-tertiary/50 transition-colors text-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={String(t('nav.language'))}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Globe className="w-5 h-5" aria-hidden="true" />
              </motion.button>

              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-surface-tertiary/50 transition-colors text-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <motion.div
                    key={theme}
                    initial={
                      shouldReduceMotion ? { rotate: 0, opacity: 1 } : { rotate: -90, opacity: 0 }
                    }
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={
                      shouldReduceMotion ? { rotate: 0, opacity: 0 } : { rotate: 90, opacity: 0 }
                    }
                    transition={{ duration: shouldReduceMotion ? 0 : ANIMATION_DURATION }}
                    aria-hidden="true"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </motion.button>
              )}

              <motion.button
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-surface-tertiary/50 hover:bg-surface-tertiary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="用户设置"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <User className="w-5 h-5 text-secondary" aria-hidden="true" />
              </motion.button>

              <motion.button
                ref={menuButtonRef}
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-surface-tertiary/50 transition-colors"
                aria-label="打开菜单"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Menu className="w-5 h-5 text-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Onboarding Guide - first visit walkthrough */}
      <OnboardingGuide />

      {/* Support Modal */}
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : ANIMATION_DURATION }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
              role="presentation"
            />
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0, x: 0 } : { opacity: 0, x: '100%' }}
              transition={{ duration: shouldReduceMotion ? 0 : ANIMATION_DURATION }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-50 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="导航菜单"
              onKeyDown={handleMenuKeyDown}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                    <Bike className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-display font-bold text-foreground">Veloform</span>
                </div>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-surface-tertiary transition-colors"
                  aria-label="关闭菜单"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="p-6 space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => {
                      if (item.isSupport) {
                        setIsSupportOpen(true);
                      } else {
                        handleNavigate(item.href);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-5 py-4 min-h-[56px] rounded-2xl text-left hover:bg-surface-tertiary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
                      delay: shouldReduceMotion ? 0 : index * ANIMATION_DELAY_STEP,
                    }}
                  >
                    <span className="text-foreground font-medium text-lg">{item.label}</span>
                    <motion.div
                      className="ml-auto"
                      animate={{ x: 0 }}
                      whileHover={shouldReduceMotion ? {} : { x: 4 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M7.5 5L12.5 10L7.5 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </motion.button>
                ))}

                {/* Divider */}
                <div className="h-px bg-border-light my-6" />

                {/* Language Toggle */}
                <motion.button
                  onClick={() => setLanguage(language === 'en' ? 'zh-CN' : 'en')}
                  className="w-full flex items-center gap-4 px-5 py-4 min-h-[56px] rounded-2xl hover:bg-surface-tertiary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
                    delay: shouldReduceMotion ? 0 : 0.2,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-tertiary/50 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="text-left">
                    <span className="text-foreground font-medium text-lg block">
                      {t('nav.language')}
                    </span>
                    <span className="text-sm text-muted">
                      {language === 'en' ? 'English' : '中文'}
                    </span>
                  </div>
                </motion.button>

                {/* Theme Toggle */}
                {mounted && (
                  <motion.button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-4 px-5 py-4 min-h-[56px] rounded-2xl hover:bg-surface-tertiary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
                      delay: shouldReduceMotion ? 0 : 0.3,
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface-tertiary/50 flex items-center justify-center">
                      {theme === 'dark' ? (
                        <Sun className="w-5 h-5 text-foreground" />
                      ) : (
                        <Moon className="w-5 h-5 text-foreground" />
                      )}
                    </div>
                    <div className="text-left">
                      <span className="text-foreground font-medium text-lg block">
                        {theme === 'dark' ? '浅色模式' : '深色模式'}
                      </span>
                      <span className="text-sm text-muted">点击切换主题</span>
                    </div>
                  </motion.button>
                )}
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border-light">
                <p className="text-sm text-muted text-center">Veloform v3.7.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
