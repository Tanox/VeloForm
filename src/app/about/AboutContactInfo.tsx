'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { Mail, Phone, MapPin } from 'lucide-react';

function AboutContactInfoBase() {
  const t = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
      <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border-light">
        <Mail className="w-6 h-6 text-primary" />
        <a
          href={`mailto:${t('about.contact.email')}`}
          className="text-foreground hover:text-primary transition-colors"
        >
          {t('about.contact.email')}
        </a>
      </div>
      <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border-light">
        <Phone className="w-6 h-6 text-primary" />
        <span className="text-foreground">{t('about.contact.phone')}</span>
      </div>
      <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border-light">
        <MapPin className="w-6 h-6 text-primary" />
        <span className="text-foreground">{t('about.contact.address')}</span>
      </div>
    </div>
  );
}

export const AboutContactInfo = React.memo(AboutContactInfoBase);
