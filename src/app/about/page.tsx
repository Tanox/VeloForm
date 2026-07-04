'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation, useTranslationsObject } from '@/lib/i18n';
import { Heart, Lightbulb, Users, Shield, User } from 'lucide-react';
import { useCallback } from 'react';

const valueIcons = [Heart, Lightbulb, Users, Shield];
const valueGradients = [
  'from-rose-500 to-pink-400',
  'from-amber-500 to-orange-400',
  'from-emerald-500 to-teal-400',
  'from-blue-500 to-cyan-400',
];

const teamMembers = [
  { name: 'Alex Chen', role: 'Co-founder & CEO' },
  { name: 'Sarah Kim', role: 'Co-founder & CTO' },
  { name: 'Mike Johnson', role: 'Lead Designer' },
  { name: 'Emma Wilson', role: 'Head of Engineering' },
];

export default function AboutPage() {
  const t = useTranslation();
  const translations = useTranslationsObject();
  const router = useRouter();

  const handleNavigate = useCallback(
    (page: string) => {
      if (page === 'home') {
        router.push('/');
      } else if (page === 'library') {
        router.push('/library');
      } else if (page === 'about') {
        router.push('/about');
      } else if (page === 'faq') {
        router.push('/faq');
      }
    },
    [router]
  );

  const values = translations.about.values;

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="mb-12 sm:mb-16">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← {t('about.backToHome')}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mt-8 sm:mt-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
              {t('about.title')}
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">{t('about.subtitle')}</p>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 sm:mb-24"
          aria-labelledby="mission-title"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t('about.missionTitle')}
            </div>
            <h2 id="mission-title" className="sr-only">
              {t('about.missionTitle')}
            </h2>
            <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed">
              {t('about.missionText')}
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 sm:mb-24"
          aria-labelledby="story-title"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2
                id="story-title"
                className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6"
              >
                {t('about.storyTitle')}
              </h2>
              <p className="text-muted text-lg leading-relaxed">{t('about.storyText')}</p>
            </div>
            <div className="relative" aria-hidden="true">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center border border-border-light">
                <div className="w-3/4 h-3/4 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-xl bg-gradient-brand shadow-2xl" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400/30 to-orange-500/30 border border-amber-400/20 blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/20 blur-md" />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 sm:mb-24"
          aria-labelledby="values-title"
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2
              id="values-title"
              className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4"
            >
              {t('about.valuesTitle')}
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            role="list"
          >
            {values.map((value, index) => {
              const Icon = valueIcons[index] || Heart;
              const gradient = valueGradients[index] || 'from-blue-500 to-cyan-400';

              return (
                <motion.div
                  key={value.title}
                  role="listitem"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="h-full group hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6 sm:p-7">
                      <motion.div
                        className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                        aria-hidden="true"
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          aria-labelledby="team-title"
        >
          <div className="text-center mb-12 sm:mb-16">
            <h2
              id="team-title"
              className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4"
            >
              {t('about.teamTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                role="listitem"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <Card className="text-center group hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6 sm:p-7">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border-light group-hover:border-primary/30 transition-colors">
                      <User
                        className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
