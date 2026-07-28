'use client';

/**
 * Whimsy copy — playful, bike-themed microcopy for delightful moments.
 *
 * Kept intentionally OUTSIDE the strict `Translations` schema so we can inject
 * personality without risking `satisfies Translations` compile breaks.
 * Reads the active language via `useLanguage()` so it stays in sync with the
 * rest of the app's i18n.
 */

import { useCallback } from 'react';
import { useLanguage } from './i18n';

export interface WhimsyDict {
  loading: {
    title: string;
    phrases: string[];
  };
  notFound: {
    eyebrow: string;
    title: string;
    hint: string;
  };
  build: {
    emptyTitle: string;
    emptyDesc: string;
    emptyCta: string;
    completeTitle: string;
    completeMsg: string;
    firstTitle: string;
    firstMsg: string;
  };
  save: {
    label: string;
    savedTitle: string;
    savedMsg: string;
  };
  konami: {
    title: string;
    message: string;
  };
}

const zhCN: WhimsyDict = {
  loading: {
    title: '正在为你组装座驾',
    phrases: [
      '拧紧每一颗螺丝…',
      '给链条抹上一点油…',
      '校准变速系统…',
      '给轮胎打足气…',
      '把坐垫调到最舒服的角度…',
      '擦拭车架，让它闪闪发亮…',
      '检查刹车，安全第一…',
    ],
  },
  notFound: {
    eyebrow: '迷路了？',
    title: '这辆车拐错弯了',
    hint: '别担心，最精彩的路线往往从一次岔路开始。回到起点，重新出发吧。',
  },
  build: {
    emptyTitle: '你的车库还空着',
    emptyDesc: '准备好打造第一台 dream machine 了吗？每加一个部件，离完美座驾就更近一步。',
    emptyCta: '挑第一个部件',
    completeTitle: '组装完成 🎉',
    completeMsg: '你的梦想座驾已经就绪，随时可以出发！',
    firstTitle: '第一笔落下 ✨',
    firstMsg: '好开端，继续把剩下的部件补齐吧。',
  },
  save: {
    label: '锁定配置',
    savedTitle: '已锁定配置 🚀',
    savedMsg: '配置已安全收好，随时回来继续折腾。',
  },
  konami: {
    title: '涡轮模式启动 🌟',
    message: '你找到了隐藏彩蛋，享受这阵顺风吧！',
  },
};

const en: WhimsyDict = {
  loading: {
    title: 'Assembling your ride',
    phrases: [
      'Tightening every bolt…',
      'Oiling the chain…',
      'Calibrating the gears…',
      'Pumping up the tires…',
      'Dialing in your saddle…',
      'Polishing the frame to a shine…',
      'Checking the brakes — safety first…',
    ],
  },
  notFound: {
    eyebrow: 'Lost?',
    title: 'This bike took a wrong turn',
    hint: "Don't worry — the best routes often start with a wrong turn. Head home and start over.",
  },
  build: {
    emptyTitle: 'Your garage is empty',
    emptyDesc: 'Ready to build your first dream machine? Every part gets you one step closer to the perfect ride.',
    emptyCta: 'Pick your first part',
    completeTitle: 'Build complete 🎉',
    completeMsg: 'Your dream ride is ready to roll!',
    firstTitle: 'First stroke ✨',
    firstMsg: 'Great start — now fill in the rest of the parts.',
  },
  save: {
    label: 'Lock it in',
    savedTitle: 'Build locked in 🚀',
    savedMsg: 'Saved safe and sound — come back anytime to tinker.',
  },
  konami: {
    title: 'Turbo mode engaged 🌟',
    message: 'You found the hidden easter egg. Enjoy the tailwind!',
  },
};

export const whimsyCopy: Record<'zh-CN' | 'en', WhimsyDict> = {
  'zh-CN': zhCN,
  en,
};

type Lang = keyof typeof whimsyCopy;

function getNested(dict: WhimsyDict, path: string): string | undefined {
  const result = path.split('.').reduce<unknown>((acc, part) => {
    if (typeof acc === 'object' && acc !== null) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
  return typeof result === 'string' ? result : undefined;
}

/**
 * Returns a `w(key)` resolver scoped to the active language.
 * Key format mirrors the dict: e.g. `w('build.completeTitle')`.
 */
export function useWhimsy() {
  const language = useLanguage();
  const lang: Lang = language === 'zh-CN' ? 'zh-CN' : 'en';
  const dict = whimsyCopy[lang];
  return useCallback((key: string) => getNested(dict, key) ?? key, [dict]);
}

/** Returns the rotating loading phrases for the active language. */
export function useWhimsyPhrases(): string[] {
  const language = useLanguage();
  const lang: Lang = language === 'zh-CN' ? 'zh-CN' : 'en';
  return whimsyCopy[lang].loading.phrases;
}
