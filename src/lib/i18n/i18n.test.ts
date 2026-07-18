import { renderHook, act } from '@testing-library/react';
import { useTranslation, useI18nStore } from '@/lib/i18n';

describe('i18n runtime behavior', () => {
  beforeEach(() => {
    window.localStorage.clear();
    act(() => useI18nStore.getState().setLanguage('en'));
  });

  it('re-renders consumers when the language is switched', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current('nav.home')).toBe('Home');

    act(() => useI18nStore.getState().setLanguage('zh-CN'));

    // The hook must re-subscribe to the language so the same t() call
    // now returns the translated string (regression for the broken switch).
    expect(result.current('nav.home')).toBe('首页');
  });

  it('persists the selected language to localStorage', () => {
    act(() => useI18nStore.getState().setLanguage('zh-CN'));
    expect(window.localStorage.getItem('veloform-language')).toBe('zh-CN');
  });

  it('returns the key path for a missing translation', () => {
    const value = useI18nStore.getState().t('this.key.does.not.exist');
    expect(value).toBe('this.key.does.not.exist');
  });

  it('toggles language via setLanguage across multiple keys', () => {
    act(() => useI18nStore.getState().setLanguage('zh-CN'));
    const t = useI18nStore.getState().t;
    expect(t('nav.library')).toBeTruthy();
    expect(t('nav.support')).toBeTruthy();
    act(() => useI18nStore.getState().setLanguage('en'));
    expect(useI18nStore.getState().t('nav.home')).toBe('Home');
  });
});
