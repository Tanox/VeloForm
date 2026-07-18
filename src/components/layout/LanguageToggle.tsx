'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface LanguageToggleProps {
  language: string;
  onToggle: () => void;
  variant?: 'icon' | 'full';
}

function LanguageToggleBase({ language, onToggle, variant = 'icon' }: LanguageToggleProps) {
  const t = useTranslation();

  if (variant === 'full') {
    return (
      <Button variant="ghost" className="justify-start h-10" onClick={onToggle}>
        <Globe className="w-4 h-4 mr-2" />
        {t('nav.language')}
        <span className="ml-auto text-muted-foreground text-sm">
          {language === 'en' ? 'English' : '中文'}
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      aria-label={String(t('nav.language'))}
      className="h-9 w-9"
    >
      <Globe className="w-4 h-4" />
    </Button>
  );
}

export const LanguageToggle = React.memo(LanguageToggleBase);
