'use client';

import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { APP_CONSTANTS } from '@/lib/constants';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">V</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">
                {APP_CONSTANTS.APP_INFO.name}
              </h1>
              <p className="text-xs text-muted">{APP_CONSTANTS.APP_INFO.tagline}</p>
            </div>
          </div>

          <BikeTypeSelector />

          <div className="flex items-center gap-3">
            <Link href="/library">
              <Button variant="ghost">
                <BookOpen className="w-4 h-4 mr-2" />
                Library
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
