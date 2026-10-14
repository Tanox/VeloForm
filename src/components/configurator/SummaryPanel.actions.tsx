'use client';

import { useTranslation } from '@/lib/i18n';
import { useWhimsy } from '@/lib/whimsy-copy';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw, Loader2, Share2, History, User } from 'lucide-react';

// 保存 / 分享 / 版本历史 / 重置 操作区
export function ActionButtons({
  onSave,
  isSaving,
  onShare,
  onVersionHistory,
  onReset,
}: {
  onSave: () => void;
  isSaving: boolean;
  onShare: () => void;
  onVersionHistory: () => void;
  onReset: () => void;
}) {
  const t = useTranslation();
  const w = useWhimsy();
  return (
    <div className="space-y-3 pt-2">
      <Button
        size="lg"
        className="w-full btn-shine"
        onClick={onSave}
        disabled={isSaving}
        aria-label={isSaving ? (t('configurator.saving') as string) : w('save.label')}
        aria-busy={isSaving}
      >
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
            {t('configurator.saving')}
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" aria-hidden="true" />
            {w('save.label')}
          </>
        )}
      </Button>

      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onShare}
          aria-label={t('share.title') as string}
        >
          <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
          {t('share.title')}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onVersionHistory}
          aria-label={t('configurator.versionHistory.title') as string}
        >
          <History className="w-4 h-4 mr-2" aria-hidden="true" />
          {t('configurator.versionHistory.title')}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onReset}
          aria-label={t('configurator.reset') as string}
        >
          <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
          {t('configurator.reset')}
        </Button>
      </div>
    </div>
  );
}

// 未登录提示
export function LoginPrompt() {
  const t = useTranslation();
  return (
    <div className="p-4 bg-primary/5 border border-primary/15 rounded-lg">
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <User className="w-4 h-4 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{t('configurator.loginToSave')}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('configurator.loginToSaveHint')}</p>
        </div>
      </div>
    </div>
  );
}
