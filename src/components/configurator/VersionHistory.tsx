'use client';

import { useState, useCallback, useMemo } from 'react';
import { useConfigStore } from '@/lib/stores';
import {
  listSnapshots,
  saveSnapshot,
  deleteSnapshot,
  type ConfigSnapshot,
} from '@/lib/config-history';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useManualConfigName } from '@/lib/stores';
import { toast } from '@/lib/toast';
import { History, Trash2, RotateCcw, Save } from 'lucide-react';

interface VersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VersionHistory({ isOpen, onClose }: VersionHistoryProps) {
  const t = useTranslation();
  const activeType = useConfigStore((s) => s.activeType);
  const components = useConfigStore((s) => s.components);
  const loadConfiguration = useConfigStore((s) => s.loadConfiguration);
  const manualConfigName = useManualConfigName();

  const [snapshots, setSnapshots] = useState<ConfigSnapshot[]>(() => listSnapshots());

  const refresh = useCallback(() => setSnapshots(listSnapshots()), []);

  const handleSave = useCallback(() => {
    saveSnapshot(manualConfigName || `${activeType} Build`, activeType, components);
    refresh();
    toast('success', String(t('configurator.versionHistory.save')));
  }, [manualConfigName, activeType, components, refresh, t]);

  const handleRestore = useCallback(
    (snap: ConfigSnapshot) => {
      loadConfiguration({
        bikeType: snap.activeType,
        components: snap.components,
        manualConfigName: snap.name,
      });
      toast('success', String(t('configurator.versionHistory.restored')));
      onClose();
    },
    [loadConfiguration, onClose, t]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteSnapshot(id);
      refresh();
    },
    [refresh]
  );

  const items = useMemo(
    () =>
      snapshots.map((s) => ({
        ...s,
        date: new Date(s.createdAt).toLocaleString(),
      })),
    [snapshots]
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        id="version-history-dialog"
        className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
      >
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <History className="w-5 h-5" aria-hidden="true" />
            {t('configurator.versionHistory.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-2 px-1">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              {t('configurator.versionHistory.empty')}
            </p>
          ) : (
            items.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border-light bg-surface-secondary px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.date}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(s)}
                    aria-label={`${t('configurator.versionHistory.restore')} ${s.name}`}
                  >
                    <RotateCcw className="w-4 h-4 mr-1" aria-hidden="true" />
                    {t('configurator.versionHistory.restore')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(s.id)}
                    aria-label={`删除 ${s.name}`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-border-light">
          <Button className="w-full" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" aria-hidden="true" />
            {t('configurator.versionHistory.save')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
