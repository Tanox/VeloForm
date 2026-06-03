'use client';

import { APP_CONSTANTS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <span className="text-lg font-bold text-white font-display">V</span>
            </div>
            <div>
              <p className="font-display font-semibold text-foreground">{APP_CONSTANTS.APP_INFO.name}</p>
              <p className="text-xs text-muted">Advanced Bike Configurator</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Support</a>
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Terms</a>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted">v{APP_CONSTANTS.APP_INFO.version}</p>
            <p className="text-sm text-muted">© 2026 {APP_CONSTANTS.APP_INFO.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
