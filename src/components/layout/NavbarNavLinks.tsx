'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  isSupport?: boolean;
}

interface NavbarNavLinksProps {
  items: NavItem[];
  onItemClick: (item: NavItem) => void;
  className?: string;
}

function NavbarNavLinksBase({ items, onItemClick, className }: NavbarNavLinksProps) {
  return (
    <>
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          size="sm"
          onClick={() => onItemClick(item)}
          aria-label={item.label}
          className={cn(className)}
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
    </>
  );
}

export const NavbarNavLinks = React.memo(NavbarNavLinksBase);
