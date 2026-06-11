'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n';
import { Copy, Download, Check, Share2 } from 'lucide-react';
import { toast } from '@/lib/toast';
// generateShareableLink / exportConfiguration are in the legacy store
// as they depend on internal store state
import { useConfigStore as useLegacyStore } from '@/lib/store';

export function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslation();
  const generateShareableLink = useLegacyStore((s) => s.generateShareableLink);
  const exportConfiguration = useLegacyStore((s) => s.exportConfiguration);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const link = generateShareableLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast('success', t('share.copied'));
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast('error', t('share.copyFailed'));
    }
  };

  const handleExportJSON = () => {
    const data = exportConfiguration();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bike-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('success', t('share.exported'));
  };

  const shareLink = generateShareableLink();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('share.title')}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/60 rounded-xl p-4"
        >
          <label className="block text-sm font-medium text-muted mb-2">
            {t('share.link')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm font-mono"
            />
            <Button onClick={handleCopyLink} size="sm">
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </motion.div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl py-4 transition-colors"
            onClick={handleCopyLink}
          >
            <Share2 className="w-5 h-5" />
            <span className="font-medium">{t('share.copyLink')}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded-xl py-4 transition-colors"
            onClick={handleExportJSON}
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">{t('share.exportJSON')}</span>
          </motion.button>
        </div>

        <p className="text-sm text-muted text-center">
          {t('share.hint')}
        </p>
      </div>
    </Modal>
  );
}