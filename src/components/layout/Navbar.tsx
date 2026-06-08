'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings, User, Moon, Sun, Search, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { label: '产品', href: 'products', icon: null },
    { label: '功能', href: 'features', icon: null },
    { label: '设计', href: 'design', icon: null },
    { label: '开发者', href: 'developers', icon: null },
    { label: '定价', href: 'pricing', icon: null },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border-light shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg font-semibold text-foreground hidden sm:block">
                DesignHub
              </span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => onNavigate(item.href)}
                  className="text-secondary hover:text-foreground transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-full hover:bg-surface-tertiary transition-colors text-secondary hover:text-foreground"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-surface-tertiary transition-colors text-secondary hover:text-foreground"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-surface-tertiary transition-colors text-secondary hover:text-foreground"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                className="p-2 rounded-full hover:bg-surface-tertiary transition-colors text-secondary hover:text-foreground"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                className="ml-2 p-2 rounded-full bg-surface-tertiary hover:bg-border transition-colors"
                aria-label="User profile"
              >
                <User className="w-5 h-5 text-secondary" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-full hover:bg-surface-tertiary transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-50 shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border-light">
                <span className="text-lg font-semibold text-foreground">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-tertiary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      onNavigate(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-surface-tertiary transition-colors"
                  >
                    <span className="text-foreground font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}