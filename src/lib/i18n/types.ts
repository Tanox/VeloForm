/**
 * i18n schema definition (single source of truth).
 * Imported by en.ts / zh-CN.ts to assemble `translations` with `satisfies Translations`.
 *
 * The `Translations` interface is composed from per-area schema modules in
 * `./schema/*` so no single file exceeds the 200-line guideline while the
 * published shape stays identical (structural typing keeps `satisfies`
 * validation intact).
 */

import { CoreTranslations } from './schema/core';
import { ConfiguratorTranslations } from './schema/configurator';
import { CompareShareTranslations } from './schema/compare-share';
import { MarketingTranslations } from './schema/marketing';
import { SupportTranslations } from './schema/support';
import { AboutTranslations } from './schema/about';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface Translations
  extends CoreTranslations,
    ConfiguratorTranslations,
    CompareShareTranslations,
    MarketingTranslations,
    SupportTranslations,
    AboutTranslations {}
