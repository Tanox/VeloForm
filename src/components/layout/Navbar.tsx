'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Bike, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation, useLanguage, useSetLanguage } from '@/lib/i18n';
import { OnboardingGuide } from '@/components/ui/OnboardingGuide';
import { SupportModal } from '@/components/ui/SupportModal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavbarNavLinks, type NavItem } from './NavbarNavLinks';
import { LanguageToggle } from './LanguageToggle';
import { NavbarMobileMenu } from './NavbarMobileMenu';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const t = useTranslation();
  const language = useLanguage();
  const setLanguage = useSetLanguage();

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
          behavior: 'smooth',
        });
      }

      onNavigate('home');
    },
    [onNavigate]
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

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: String(t('nav.home')), href: 'home' },
      { label: String(t('nav.library')), href: 'library' },
      { label: String(t('nav.support')), href: 'support', isSupport: true },
    ],
    [t]
  );

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavItemClick = useCallback(
    (item: NavItem) => {
      if (item.isSupport) {
        setIsSupportOpen(true);
      } else {
        handleNavigate(item.href);
      }
      setIsMobileMenuOpen(false);
    },
    [handleNavigate]
  );

  const handleToggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'zh-CN' : 'en');
  }, [setLanguage, language]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border-subtle'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1"
              aria-label="返回首页"
            >
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Bike className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground hidden sm:block">
                Veloform
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              <NavbarNavLinks items={navItems} onItemClick={handleNavItemClick} className="h-9 px-4" />
            </div>

            <div className="flex items-center gap-1">
              <LanguageToggle language={language} onToggle={handleToggleLanguage} />

              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
                  className="h-9 w-9"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              )}

              <NavbarMobileMenu
                open={isMobileMenuOpen}
                onOpenChange={setIsMobileMenuOpen}
                items={navItems}
                onItemClick={handleNavItemClick}
                language={language}
                onToggleLanguage={handleToggleLanguage}
                mounted={mounted}
                theme={theme}
                onToggleTheme={toggleTheme}
              />
            </div>
          </div>
        </div>
      </nav>

      <OnboardingGuide />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}
