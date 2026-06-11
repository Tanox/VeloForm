'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { useTranslation } from '@/lib/i18n';
import { MessageCircle, Phone, Mail, HelpCircle, Send, Check } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('support.title')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t('support.submitted')}
              </h3>
              <p className="text-muted">{t('support.thankYou')}</p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <motion.a
                  href="mailto:support@veloform.com"
                  className="flex flex-col items-center p-4 bg-zinc-900/50 rounded-xl hover:bg-zinc-800/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs text-muted text-center">Email</span>
                </motion.a>
                <motion.a
                  href="tel:+8612345678900"
                  className="flex flex-col items-center p-4 bg-zinc-900/50 rounded-xl hover:bg-zinc-800/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-8 h-8 text-accent mb-2" />
                  <span className="text-xs text-muted text-center">Phone</span>
                </motion.a>
                <motion.button
                  className="flex flex-col items-center p-4 bg-zinc-900/50 rounded-xl hover:bg-zinc-800/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {}}
                >
                  <MessageCircle className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-xs text-muted text-center">Live Chat</span>
                </motion.button>
              </div>

              <div className="bg-zinc-900/50 rounded-xl p-4">
                <h4 className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  {t('support.faq')}
                </h4>
                <div className="space-y-3">
                  <details className="border-b border-zinc-800 pb-3 last:border-0">
                    <summary className="text-sm text-muted cursor-pointer hover:text-foreground">
                      {t('support.faq1')}
                    </summary>
                    <p className="text-sm text-muted mt-2 pl-4">
                      {t('support.faq1Answer')}
                    </p>
                  </details>
                  <details className="border-b border-zinc-800 pb-3 last:border-0">
                    <summary className="text-sm text-muted cursor-pointer hover:text-foreground">
                      {t('support.faq2')}
                    </summary>
                    <p className="text-sm text-muted mt-2 pl-4">
                      {t('support.faq2Answer')}
                    </p>
                  </details>
                  <details>
                    <summary className="text-sm text-muted cursor-pointer hover:text-foreground">
                      {t('support.faq3')}
                    </summary>
                    <p className="text-sm text-muted mt-2 pl-4">
                      {t('support.faq3Answer')}
                    </p>
                  </details>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">{t('support.contactForm')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder={t('support.name')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder={t('support.email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Textarea
                  name="message"
                  placeholder={t('support.message')}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  {t('support.send')}
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}