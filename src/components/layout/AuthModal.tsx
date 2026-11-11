// 文件路径: src/components/layout/AuthModal.tsx v4.4.9
'use client';

import { useEffect, useState } from 'react';
import { X, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useUserStore } from '@/lib/stores';
import { loginWithEmail, signUpWithEmail, logout } from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase';
import { authLogger } from '@/lib/logger';

type AuthMode = 'signin' | 'signup';

/** 最小认证入口：补齐云端同步所需的登录/注册/登出链路。 */
export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslation();
  const userId = useUserStore((s) => s.userId);
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const configured = isSupabaseConfigured();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!configured || busy) return;
    setBusy(true);
    setError('');
    try {
      if (mode === 'signin') {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      onClose();
    } catch (submitError) {
      authLogger.error('Authentication failed:', submitError);
      setError(submitError instanceof Error ? submitError.message : String(t('auth.invalidInput')));
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      onClose();
    } catch (signOutError) {
      authLogger.error('Sign out failed:', signOutError);
      setError(String(t('auth.invalidInput')));
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <section
        id="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-label={String(t('auth.title'))}
        className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header id="auth-modal-header" className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{t('auth.title')}</h2>
          <button
            id="auth-modal-close"
            type="button"
            onClick={onClose}
            aria-label={String(t('common.close'))}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        {!configured && (
          <p id="auth-modal-config-warning" className="mb-4 text-sm text-warning">
            {t('auth.notConfigured')}
          </p>
        )}

        {userId ? (
          <div id="auth-modal-account" className="space-y-4">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              {t('auth.signedInAs')}
            </p>
            <Button
              id="auth-signout-button"
              variant="outline"
              className="w-full"
              onClick={handleSignOut}
            >
              {t('auth.signOut')}
            </Button>
          </div>
        ) : (
          <form id="auth-form" className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm text-muted-foreground" htmlFor="auth-email-input">
              {t('auth.email')}
              <input
                id="auth-email-input"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
              />
            </label>
            <label className="block text-sm text-muted-foreground" htmlFor="auth-password-input">
              {t('auth.password')}
              <input
                id="auth-password-input"
                type="password"
                required
                minLength={6}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
              />
            </label>
            {error && (
              <p id="auth-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button
              id="auth-submit-button"
              type="submit"
              className="w-full"
              disabled={busy || !configured}
              aria-busy={busy}
            >
              {mode === 'signin' ? t('auth.submitSignIn') : t('auth.submitSignUp')}
            </Button>
            <button
              id="auth-switch-mode"
              type="button"
              className="w-full text-center text-sm text-muted-foreground hover:text-primary"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            >
              {mode === 'signin' ? t('auth.switchToSignUp') : t('auth.switchToSignIn')}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
