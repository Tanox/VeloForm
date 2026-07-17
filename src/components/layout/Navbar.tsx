'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, Moon, Sun, Bike, HelpCircle, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation, useLanguage, useSetLanguage } from '@/lib/i18n';
import { OnboardingGuide } from '@/components/ui/OnboardingGuide';
import { SupportModal } from '@/components/ui/SupportModal';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { APP_CONSTANTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

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

  const navItems = [
    { label: String(t('nav.home')), href: 'home' },
    { label: String(t('nav.library')), href: 'library' },
    { label: String(t('nav.support')), href: 'support', isSupport: true },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavItemClick = (item: { href: string; isSupport?: boolean }) => {
    if (item.isSupport) {
      setIsSupportOpen(true);
    } else {
      handleNavigate(item.href);
    }
    setIsMobileMenuOpen(false);
  };

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
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (item.isSupport) {
                      setIsSupportOpen(true);
                    } else {
                      handleNavigate(item.href);
                    }
                  }}
                  aria-label={item.label}
                  className="h-9 px-4"
                >
                  {item.isSupport ? (
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === 'en' ? 'zh-CN' : 'en')}
                aria-label={String(t('nav.language'))}
                className="h-9 w-9"
              >
                <Globe className="w-4 h-4" />
              </Button>

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

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" className="md:hidden" aria-label="打开菜单">
                      <Menu className="w-4 h-4" />
                    </Button>
                  }
                />
                <SheetContent
                  side="right"
                  className="w-full sm:max-w-sm bg-card border-l border-border"
                >
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                        <Bike className="w-4 h-4 text-primary-foreground" />
                      </div>
                      Veloform
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 py-4">
                    {navItems.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className="justify-start h-10"
                        onClick={() => handleNavItemClick(item)}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1 py-4">
                    <Button
                      variant="ghost"
                      className="justify-start h-10"
                      onClick={() => setLanguage(language === 'en' ? 'zh-CN' : 'en')}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {t('nav.language')}
                      <span className="ml-auto text-muted-foreground text-sm">
                        {language === 'en' ? 'English' : '中文'}
                      </span>
                    </Button>
                    {mounted && (
                      <Button variant="ghost" className="justify-start h-10" onClick={toggleTheme}>
                        {theme === 'dark' ? (
                          <Sun className="w-4 h-4 mr-2" />
                        ) : (
                          <Moon className="w-4 h-4 mr-2" />
                        )}
                        {theme === 'dark' ? '浅色模式' : '深色模式'}
                      </Button>
                    )}
                  </div>
                  <div className="mt-auto pt-4">
                    <Separator className="mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                      Veloform v{APP_CONSTANTS.APP_INFO.version}
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <OnboardingGuide />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </>
  );
}
