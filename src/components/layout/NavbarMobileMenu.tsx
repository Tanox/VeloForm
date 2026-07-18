'use client';

import { Menu, Moon, Sun, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { APP_CONSTANTS } from '@/lib/constants';
import { NavbarNavLinks, type NavItem } from './NavbarNavLinks';
import { LanguageToggle } from './LanguageToggle';

interface NavbarMobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavItem[];
  onItemClick: (item: NavItem) => void;
  language: string;
  onToggleLanguage: () => void;
  mounted: boolean;
  theme: string | undefined;
  onToggleTheme: () => void;
}

export function NavbarMobileMenu({
  open,
  onOpenChange,
  items,
  onItemClick,
  language,
  onToggleLanguage,
  mounted,
  theme,
  onToggleTheme,
}: NavbarMobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
          <NavbarNavLinks items={items} onItemClick={onItemClick} className="justify-start h-10" />
        </div>
        <Separator />
        <div className="flex flex-col gap-1 py-4">
          <LanguageToggle language={language} onToggle={onToggleLanguage} variant="full" />
          {mounted && (
            <Button variant="ghost" className="justify-start h-10" onClick={onToggleTheme}>
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
  );
}
