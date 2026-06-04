'use client';

import { APP_CONSTANTS } from '@/lib/constants';
import { Github, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary via-primary to-accent rounded-xl sm:rounded-2xl flex items-center justify-center">
              <span className="text-sm sm:text-lg font-bold text-white">V</span>
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-sm sm:text-base">
                {APP_CONSTANTS.APP_INFO.name}
              </p>
              <p className="text-xs text-muted hidden sm:block">
                {APP_CONSTANTS.APP_INFO.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="https://github.com/sutchan/Veloform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <span className="text-sm text-muted">|</span>
            <Link
              href="#"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Support
            </Link>
            <Link
              href="#"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-muted flex items-center gap-1">
            © {currentYear} {APP_CONSTANTS.APP_INFO.name}. Built with{' '}
            <Heart className="w-3 h-3 text-primary inline" />.
            <span className="hidden sm:inline ml-2">v{APP_CONSTANTS.APP_INFO.version}</span>
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50 text-center">
          <p className="text-xs text-muted">
            Version {APP_CONSTANTS.APP_INFO.version}
          </p>
        </div>
      </div>
    </footer>
  );
}
