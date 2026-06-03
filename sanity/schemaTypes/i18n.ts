import { defineField } from 'sanity';

/**
 * Field-level i18n helpers.
 *
 * Both map to the array types registered by `sanity-plugin-internationalized-array`
 * (configured in `sanity.config.ts`). A value is stored as
 * `[{ _key: <locale>, value: <string | text> }]`, and the available locales come
 * from the active `language` documents — so adding a language in the Studio
 * automatically adds an input here, with zero code changes.
 */
type I18nOpts = {
  group?: string;
  fieldset?: string;
  description?: string;
};

export const i18nString = (name: string, title: string, opts: I18nOpts = {}) =>
  defineField({ name, title, type: 'internationalizedArrayString', ...opts });

export const i18nText = (name: string, title: string, opts: I18nOpts = {}) =>
  defineField({ name, title, type: 'internationalizedArrayText', ...opts });
