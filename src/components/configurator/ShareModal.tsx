'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/i18n';
import { Copy, Download, Check, Share2, Link2, FileJson, Sparkles } from 'lucide-react';
import { toast } from '@/lib/toast';
import { uiLogger } from '@/lib/logger';
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
      uiLogger.error('Failed to copy:', error);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">分享你的配置</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl p-5 bg-gradient-to-br from-primary/5 via-surface-secondary to-accent/5 border border-border-light overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground">分享链接</span>
              </div>

              <div className="flex gap-2">
                <Input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 font-mono text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  variant={copied ? "outline" : "default"}
                  className={copied ? "border-green-500/30 text-green-500 hover:bg-green-500/10" : ""}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      复制
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-surface-secondary/80 border border-border-light hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 overflow-hidden"
              onClick={handleCopyLink}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div className="relative text-center">
                <span className="block font-semibold text-foreground">分享链接</span>
                <span className="block text-xs text-muted mt-0.5">复制到剪贴板</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-surface-secondary/80 border border-border-light hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 overflow-hidden"
              onClick={handleExportJSON}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-emerald-400 flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-xl group-hover:shadow-accent/30 transition-shadow">
                <FileJson className="w-6 h-6 text-white" />
              </div>
              <div className="relative text-center">
                <span className="block font-semibold text-foreground">导出配置</span>
                <span className="block text-xs text-muted mt-0.5">下载 JSON 文件</span>
              </div>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-surface-tertiary/30 border border-border-light"
          >
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted leading-relaxed">
              <p>分享你的配置给朋友，或导出为 JSON 文件用于其他目的。</p>
              <p className="mt-1">链接有效期为 <span className="text-foreground font-medium">30 天</span>。</p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
